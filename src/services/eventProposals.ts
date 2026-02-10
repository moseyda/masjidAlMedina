import { supabase } from '@/lib/supabase'

export interface EventProposal {
  id: string
  title: string
  description: string | null
  date: string
  time: string
  location: string | null
  category: string | null
  arabic: string | null
  proposer_name: string
  proposer_email: string
  proposer_phone: string | null
  status: 'pending' | 'approved' | 'declined'
  created_at: string
}

export interface EventProposalInsert {
  title: string
  description?: string
  date: string
  time: string
  location?: string
  category?: string
  arabic?: string
  proposer_name: string
  proposer_email: string
  proposer_phone?: string
}

export async function createEventProposal(proposal: EventProposalInsert): Promise<EventProposal> {
  const { data, error } = await supabase
    .from('event_proposals')
    .insert({ ...proposal, status: 'pending' })
    .select()
    .single()

  if (error) throw error
  return data as EventProposal
}

export async function getEventProposals(): Promise<EventProposal[]> {
  const { data, error } = await supabase
    .from('event_proposals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []) as EventProposal[]
}

export async function updateProposalStatus(id: string, status: 'approved' | 'declined'): Promise<void> {
  const { error } = await supabase
    .from('event_proposals')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}

export async function deleteEventProposal(id: string): Promise<void> {
  const { error } = await supabase
    .from('event_proposals')
    .delete()
    .eq('id', id)

  if (error) throw error
}