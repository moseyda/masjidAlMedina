import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Announcement = Database['public']['Tables']['announcements']['Row']
type AnnouncementInsert = Database['public']['Tables']['announcements']['Insert']
type AnnouncementUpdate = Database['public']['Tables']['announcements']['Update']

export type { Announcement, AnnouncementInsert, AnnouncementUpdate }

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createAnnouncement(announcement: AnnouncementInsert): Promise<Announcement> {
  const { data, error } = await supabase
    .from('announcements')
    .insert(announcement)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateAnnouncement(id: string, announcement: AnnouncementUpdate): Promise<Announcement> {
  const { data, error } = await supabase
    .from('announcements')
    .update(announcement)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export function subscribeToAnnouncements(callback: (announcements: Announcement[]) => void) {
  const subscription = supabase
    .channel('announcements-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'announcements' },
      async () => {
        const announcements = await getAnnouncements()
        callback(announcements)
      }
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}