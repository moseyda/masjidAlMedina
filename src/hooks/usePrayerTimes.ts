import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

interface PrayerData {
  date: string;
  hijriDate: string;
  prayers: PrayerTime[];
  location: string;
  nextPrayer: PrayerTime | null;
  nextPrayerIn: string;
  source: 'mosque' | 'api';
}

export const usePrayerTimes = () => {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const prayersRef = useRef<PrayerTime[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Check Supabase first (mosque custom times)
        const { data: customTimes, error } = await supabase
          .from('prayer_times')
          .select('*')
          .eq('date', today)
          .single();

        if (customTimes && !error) {
          // Use mosque-set times
          const prayers: PrayerTime[] = [
            { name: 'Fajr', time: customTimes.fajr, arabic: 'الفجر' },
            { name: 'Dhuhr', time: customTimes.dhuhr, arabic: 'الظهر' },
            { name: 'Asr', time: customTimes.asr, arabic: 'العصر' },
            { name: 'Maghrib', time: customTimes.maghrib, arabic: 'المغرب' },
            { name: 'Isha', time: customTimes.isha, arabic: 'العشاء' },
          ];

          prayersRef.current = prayers;

          // Get Hijri date from API
          let hijriDate = '';
          try {
            const res = await fetch('https://api.aladhan.com/v1/gToH?date=' + today.split('-').reverse().join('-'));
            const data = await res.json();
            const h = data.data.hijri;
            hijriDate = `${h.day} ${h.month.en} ${h.year}`;
          } catch { hijriDate = ''; }

          setPrayerData({
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            hijriDate,
            prayers,
            location: 'Cheltenham, UK',
            nextPrayer: null,
            nextPrayerIn: '',
            source: 'mosque',
          });

          setLoading(false);
          return;
        }

        // Fallback to AlAdhan API
        const lat = 51.8993;
        const lng = -2.0783;

        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        const timings = data.data.timings;
        const date = data.data.date;

        const prayers: PrayerTime[] = [
          { name: 'Fajr', time: timings.Fajr, arabic: 'الفجر' },
          { name: 'Dhuhr', time: timings.Dhuhr, arabic: 'الظهر' },
          { name: 'Asr', time: timings.Asr, arabic: 'العصر' },
          { name: 'Maghrib', time: timings.Maghrib, arabic: 'المغرب' },
          { name: 'Isha', time: timings.Isha, arabic: 'العشاء' },
        ];

        prayersRef.current = prayers;

        setPrayerData({
          date: date.readable,
          hijriDate: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`,
          prayers,
          location: 'Cheltenham, UK',
          nextPrayer: null,
          nextPrayerIn: '',
          source: 'api',
        });
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        const fallbackPrayers = [
          { name: 'Fajr', time: '05:30', arabic: 'الفجر' },
          { name: 'Dhuhr', time: '12:30', arabic: 'الظهر' },
          { name: 'Asr', time: '15:45', arabic: 'العصر' },
          { name: 'Maghrib', time: '18:20', arabic: 'المغرب' },
          { name: 'Isha', time: '19:45', arabic: 'العشاء' },
        ];

        prayersRef.current = fallbackPrayers;

        setPrayerData({
          date: new Date().toLocaleDateString('en-GB'),
          hijriDate: '',
          prayers: fallbackPrayers,
          location: 'Cheltenham, UK',
          nextPrayer: null,
          nextPrayerIn: '',
          source: 'api',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  // Countdown timer for next prayer
  useEffect(() => {
    if (loading || prayersRef.current.length === 0) return;

    const calculateNextPrayer = () => {
      const prayers = prayersRef.current;
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const currentSeconds = now.getSeconds();

      let nextPrayer: PrayerTime | null = null;
      let minutesUntilNext = 0;

      for (const prayer of prayers) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;

        if (prayerMinutes > currentMinutes) {
          nextPrayer = prayer;
          minutesUntilNext = prayerMinutes - currentMinutes;
          break;
        }
      }

      if (!nextPrayer) {
        nextPrayer = prayers[0];
        const [hours, minutes] = nextPrayer.time.split(':').map(Number);
        minutesUntilNext = 24 * 60 - currentMinutes + hours * 60 + minutes;
      }

      const totalSeconds = minutesUntilNext * 60 - currentSeconds;
      const hoursLeft = Math.floor(totalSeconds / 3600);
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const secondsLeft = totalSeconds % 60;

      const countdown = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
        .toString()
        .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

      setPrayerData((prev) =>
        prev ? { ...prev, nextPrayer, nextPrayerIn: countdown } : null
      );
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  return { prayerData, loading };
};