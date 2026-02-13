import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      amount,
      fundType,
      isRecurring,
      giftAid,
      donor,
      campaignId,
      successUrl,
      cancelUrl,
    } = await req.json()

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create or get donor
    let donorRecord = null
    const { data: existingDonor } = await supabase
      .from('donors')
      .select('*')
      .eq('email', donor.email)
      .single()

    if (existingDonor) {
      donorRecord = existingDonor
      // Update donor info if needed
      await supabase
        .from('donors')
        .update({
          full_name: donor.fullName,
          phone: donor.phone,
          address_line1: donor.addressLine1,
          address_line2: donor.addressLine2,
          city: donor.city,
          postcode: donor.postcode,
          gift_aid_eligible: giftAid,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingDonor.id)
    } else {
      const { data: newDonor, error } = await supabase
        .from('donors')
        .insert({
          email: donor.email,
          full_name: donor.fullName,
          phone: donor.phone,
          address_line1: donor.addressLine1,
          address_line2: donor.addressLine2,
          city: donor.city,
          postcode: donor.postcode,
          gift_aid_eligible: giftAid,
        })
        .select()
        .single()

      if (error) throw error
      donorRecord = newDonor
    }

    // Store Gift Aid declaration if applicable
    if (giftAid) {
      await supabase.from('gift_aid_declarations').insert({
        donor_id: donorRecord.id,
        declaration_text: `I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid claimed on all my donations it is my responsibility to pay any difference. I want Masjid Al-Madina to reclaim 25p of tax on every £1 that I have given.`,
        declaration_version: '2024-01',
        full_name: donor.fullName,
        address_line1: donor.addressLine1,
        address_line2: donor.addressLine2 || null,
        city: donor.city,
        postcode: donor.postcode,
      })
    }

    // Create or get Stripe customer
    let stripeCustomerId = donorRecord.stripe_customer_id

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: donor.email,
        name: donor.fullName,
        phone: donor.phone,
        address: giftAid ? {
          line1: donor.addressLine1,
          line2: donor.addressLine2,
          city: donor.city,
          postal_code: donor.postcode,
          country: 'GB',
        } : undefined,
        metadata: {
          donor_id: donorRecord.id,
        },
      })

      stripeCustomerId = customer.id

      await supabase
        .from('donors')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', donorRecord.id)
    }

    // Calculate Gift Aid amount
    const giftAidAmount = giftAid ? Math.round(amount * 0.25) : 0

    // Metadata for webhook processing
    const metadata = {
      donor_id: donorRecord.id,
      fund_type: fundType,
      campaign_id: campaignId || '',
      is_recurring: isRecurring.toString(),
      gift_aid: giftAid.toString(),
      gift_aid_amount: giftAidAmount.toString(),
    }

    let session: Stripe.Checkout.Session

    if (isRecurring) {
      // Create a price for the subscription
      const price = await stripe.prices.create({
        unit_amount: amount,
        currency: 'gbp',
        recurring: { interval: 'month' },
        product_data: {
          name: `Monthly Donation - ${fundType}`,
          metadata: {
            fund_type: fundType,
          },
        },
      })

      session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        metadata,
        subscription_data: {
          metadata,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
        billing_address_collection: giftAid ? 'required' : 'auto',
      })
    } else {
      session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              unit_amount: amount,
              product_data: {
                name: `Donation - ${fundType}`,
                description: giftAid 
                  ? `Your donation of £${(amount/100).toFixed(2)} + £${(giftAidAmount/100).toFixed(2)} Gift Aid`
                  : `One-time donation to ${fundType}`,
              },
            },
            quantity: 1,
          },
        ],
        metadata,
        payment_intent_data: {
          metadata,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
        billing_address_collection: giftAid ? 'required' : 'auto',
      })
    }

    // Create pending donation record
    await supabase.from('donations').insert({
      donor_id: donorRecord.id,
      stripe_checkout_session_id: session.id,
      amount,
      currency: 'gbp',
      fund_type: fundType,
      campaign_id: campaignId,
      is_recurring: isRecurring,
      recurring_interval: isRecurring ? 'month' : null,
      gift_aid_claimed: giftAid,
      gift_aid_amount: giftAidAmount,
      status: 'pending',
      metadata,
    })

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})