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

export async function getMonthlyPrayerTimes(year: number, month: number) {
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Cheltenham&country=UK&method=15`
  );
  
  if (!response.ok) throw new Error('Failed to fetch monthly prayer times');
  
  const data = await response.json();
  return data.data;
}