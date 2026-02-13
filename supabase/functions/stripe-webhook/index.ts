import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Idempotency check
        const { data: existingDonation } = await supabase
          .from('donations')
          .select('*')
          .eq('stripe_checkout_session_id', session.id)
          .eq('status', 'completed')
          .single()

        if (existingDonation) {
          console.log('Donation already processed:', session.id)
          break
        }

        // Update donation status
        const { data: donation, error } = await supabase
          .from('donations')
          .update({
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_subscription_id: session.subscription as string,
            completed_at: new Date().toISOString(),
          })
          .eq('stripe_checkout_session_id', session.id)
          .select()
          .single()

        if (error) throw error

        // Generate receipt number
        const receiptNumber = `MAM-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`

        // Create receipt record
        await supabase.from('donation_receipts').insert({
          donation_id: donation.id,
          receipt_number: receiptNumber,
        })

        // Create subscription record if recurring
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          
          await supabase.from('subscriptions').insert({
            donor_id: session.metadata?.donor_id,
            stripe_subscription_id: subscription.id,
            stripe_price_id: subscription.items.data[0]?.price.id,
            amount: donation.amount,
            currency: 'gbp',
            fund_type: session.metadata?.fund_type,
            interval: 'month',
            status: 'active',
            gift_aid_eligible: session.metadata?.gift_aid === 'true',
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
        }

        // TODO: Send confirmation email with receipt
        console.log('Donation completed:', donation.id, receiptNumber)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription && invoice.billing_reason === 'subscription_cycle') {
          // Recurring payment - create new donation record
          const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*, donors(*)')
            .eq('stripe_subscription_id', invoice.subscription)
            .single()

          if (subscription) {
            const giftAidAmount = subscription.gift_aid_eligible 
              ? Math.round(invoice.amount_paid * 0.25) 
              : 0

            await supabase.from('donations').insert({
              donor_id: subscription.donor_id,
              stripe_payment_intent_id: invoice.payment_intent as string,
              stripe_subscription_id: invoice.subscription as string,
              amount: invoice.amount_paid,
              currency: 'gbp',
              fund_type: subscription.fund_type,
              is_recurring: true,
              recurring_interval: 'month',
              gift_aid_claimed: subscription.gift_aid_eligible,
              gift_aid_amount: giftAidAmount,
              status: 'completed',
              completed_at: new Date().toISOString(),
            })
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status as any,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        await supabase
          .from('donations')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        
        await supabase
          .from('donations')
          .update({ status: 'refunded' })
          .eq('stripe_payment_intent_id', charge.payment_intent)
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})