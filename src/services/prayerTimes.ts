import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type PrayerTime = Database['public']['Tables']['prayer_times']['Row']

export type { PrayerTime }

export async function getTodaysPrayerTimes(): Promise<PrayerTime | null> {
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('prayer_times')
    .select('*')
    .eq('date', today)
    .single()

  if (error && error.code !== 'PGRST116') throw error 
  return data
}

export async function getPrayerTimesForDate(date: string): Promise<PrayerTime | null> {
  const { data, error } = await supabase
    .from('prayer_times')
    .select('*')
    .eq('date', date)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}