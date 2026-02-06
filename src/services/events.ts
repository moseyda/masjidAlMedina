import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Event = Database['public']['Tables']['events']['Row']
type EventInsert = Database['public']['Tables']['events']['Insert']
type EventUpdate = Database['public']['Tables']['events']['Update']

export type { Event, EventInsert, EventUpdate }

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) throw error
  return data
}

export async function getEventById(id: string): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createEvent(event: EventInsert): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateEvent(id: string, event: EventUpdate): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Real-time subscription
export function subscribeToEvents(callback: (events: Event[]) => void) {
  const subscription = supabase
    .channel('events-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'events' },
      async () => {
        const events = await getEvents()
        callback(events)
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}