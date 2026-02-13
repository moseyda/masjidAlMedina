import type { Database } from './database'

// Derived types from database
export type Donor = Database['public']['Tables']['donors']['Row']
export type DonorInsert = Database['public']['Tables']['donors']['Insert']
export type Donation = Database['public']['Tables']['donations']['Row']
export type DonationInsert = Database['public']['Tables']['donations']['Insert']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type GiftAidDeclaration = Database['public']['Tables']['gift_aid_declarations']['Row']
export type DonationReceipt = Database['public']['Tables']['donation_receipts']['Row']

// Custom types
export type FundType = 
  | 'general' 
  | 'zakat' 
  | 'sadaqah' 
  | 'building_fund' 
  | 'ramadan_campaign' 
  | 'education' 
  | 'emergency'

export interface DonationFormData {
  amount: number
  customAmount?: number
  fundType: FundType
  isRecurring: boolean
  giftAid: boolean
  fullName: string
  email: string
  phone?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  postcode?: string
}

export interface CreateCheckoutSessionRequest {
  amount: number
  fundType: FundType
  isRecurring: boolean
  giftAid: boolean
  donor: {
    fullName: string
    email: string
    phone?: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    postcode?: string
  }
  campaignId?: string
  successUrl: string
  cancelUrl: string
}

export interface CreateCheckoutSessionResponse {
  sessionId: string
  url: string
}