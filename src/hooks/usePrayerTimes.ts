import { useEffect, useState, useRef } from 'react';

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
}

function getNextPrayer(prayers: PrayerTime[]) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  let nextPrayer: PrayerTime | null = prayers[0];
  let nextPrayerIn = '';
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    if (currentTime < prayerTime) {
      nextPrayer = prayer;
      const target = new Date(now);
      target.setHours(hours, minutes, 0, 0);
      const diffMs = target.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      nextPrayerIn =
        h > 0
          ? `in ${h} hour${h > 1 ? 's' : ''}${m > 0 ? ` ${m} min` : ''}${s > 0 ? ` ${s} sec` : ''}`
          : m > 0
            ? `in ${m} min${s > 0 ? ` ${s} sec` : ''}`
            : `in ${s} sec`;
      break;
    }
  }
  return { nextPrayer, nextPrayerIn };
}

export function usePrayerTimes() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const prayersRef = useRef<PrayerTime[] | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const lat = 51.8993;
        const lng = -2.0783;
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
        );
        if (!response.ok) throw new Error('Failed to fetch prayer times');
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

        const { nextPrayer, nextPrayerIn } = getNextPrayer(prayers);

        setPrayerData({
          date: date.readable,
          hijriDate: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`,
          prayers,
          location: 'Cheltenham, UK',
          nextPrayer,
          nextPrayerIn,
        });
      } catch (error) {
        const fallbackPrayers = [
          { name: 'Fajr', time: '05:30', arabic: 'الفجر' },
          { name: 'Dhuhr', time: '12:30', arabic: 'الظهر' },
          { name: 'Asr', time: '15:45', arabic: 'العصر' },
          { name: 'Maghrib', time: '18:20', arabic: 'المغرب' },
          { name: 'Isha', time: '19:45', arabic: 'العشاء' },
        ];
        prayersRef.current = fallbackPrayers;
        const { nextPrayer, nextPrayerIn } = getNextPrayer(fallbackPrayers);
        setPrayerData({
          date: new Date().toLocaleDateString(),
          hijriDate: 'Loading...',
          prayers: fallbackPrayers,
          location: 'Cheltenham, UK',
          nextPrayer,
          nextPrayerIn,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPrayerTimes();
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (!prayersRef.current) return;
    const interval = setInterval(() => {
      if (prayersRef.current && prayerData) {
        const { nextPrayer, nextPrayerIn } = getNextPrayer(prayersRef.current);
        setPrayerData((prev) =>
          prev
            ? { ...prev, nextPrayer, nextPrayerIn }
            : prev
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerData]);

  return { prayerData, loading };
}