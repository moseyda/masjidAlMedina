import { supabase } from '@/lib/supabase'
import type { 
  Donation, 
  Donor, 
  Subscription, 
  FundType,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse 
} from '@/types/donations'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create Stripe Checkout Session
export async function createCheckoutSession(
  data: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
  const response = await fetch(`${API_BASE_URL}/donations/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create checkout session')
  }

  return response.json()
}

// Get donation by ID
export async function getDonation(id: string): Promise<Donation | null> {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Get donations with filters (admin)
export async function getDonations(filters?: {
  fundType?: FundType
  status?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}): Promise<{ donations: Donation[]; total: number }> {
  let query = supabase
    .from('donations')
    .select('*, donors(*)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.fundType) {
    query = query.eq('fund_type', filters.fundType)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate)
  }
  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { donations: data || [], total: count || 0 }
}

// Get subscriptions (admin)
export async function getSubscriptions(status?: string): Promise<Subscription[]> {
  let query = supabase
    .from('subscriptions')
    .select('*, donors(*)')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Get donation statistics
export async function getDonationStats(period?: 'week' | 'month' | 'year'): Promise<{
  totalAmount: number
  totalDonations: number
  averageDonation: number
  recurringAmount: number
  giftAidAmount: number
  byFundType: Record<FundType, number>
}> {
  let startDate = new Date()
  
  if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7)
  } else if (period === 'month') {
    startDate.setMonth(startDate.getMonth() - 1)
  } else if (period === 'year') {
    startDate.setFullYear(startDate.getFullYear() - 1)
  } else {
    startDate = new Date(0) // All time
  }

  const { data, error } = await supabase
    .from('donations')
    .select('amount, fund_type, is_recurring, gift_aid_amount')
    .eq('status', 'completed')
    .gte('created_at', startDate.toISOString())

  if (error) throw error

  const donations = data || []
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
  const recurringAmount = donations.filter(d => d.is_recurring).reduce((sum, d) => sum + d.amount, 0)
  const giftAidAmount = donations.reduce((sum, d) => sum + (d.gift_aid_amount || 0), 0)

  const byFundType = donations.reduce((acc, d) => {
    acc[d.fund_type as FundType] = (acc[d.fund_type as FundType] || 0) + d.amount
    return acc
  }, {} as Record<FundType, number>)

  return {
    totalAmount,
    totalDonations: donations.length,
    averageDonation: donations.length > 0 ? Math.round(totalAmount / donations.length) : 0,
    recurringAmount,
    giftAidAmount,
    byFundType,
  }
}

// Export donations to CSV
export async function exportDonationsCSV(filters?: {
  fundType?: FundType
  startDate?: string
  endDate?: string
}): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/donations/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  })

  if (!response.ok) {
    throw new Error('Failed to export donations')
  }

  return response.text()
}

// Fund type labels
export const FUND_TYPE_LABELS: Record<FundType, { label: string; arabic: string; description: string }> = {
  general: {
    label: 'General Fund',
    arabic: 'صندوق عام',
    description: 'Support the day-to-day operations of the mosque',
  },
  zakat: {
    label: 'Zakat',
    arabic: 'الزكاة',
    description: 'Obligatory charity for eligible recipients',
  },
  sadaqah: {
    label: 'Sadaqah',
    arabic: 'صدقة',
    description: 'Voluntary charity for any good cause',
  },
  building_fund: {
    label: 'Building Fund',
    arabic: 'صندوق البناء',
    description: 'Contribute to mosque maintenance and expansion',
  },
  ramadan_campaign: {
    label: 'Ramadan Campaign',
    arabic: 'حملة رمضان',
    description: 'Special Ramadan programmes and iftar',
  },
  education: {
    label: 'Education',
    arabic: 'التعليم',
    description: 'Support Islamic education and classes',
  },
  emergency: {
    label: 'Emergency Relief',
    arabic: 'إغاثة طارئة',
    description: 'Help those in urgent need',
  },
}