import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']

export type { ContactMessage }

export async function submitContactMessage(contactData: ContactMessageInsert): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(contactData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}