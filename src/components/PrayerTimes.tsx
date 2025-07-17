import { useEffect, useState } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
}

const PrayerTimes = () => {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPrayer, setCurrentPrayer] = useState<string>('');

  // Fetch prayer times from AlAdhan API
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Cheltenham coordinates
        const lat = 51.8993;
        const lng = -2.0783;
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

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

        setPrayerData({
          date: date.readable,
          hijriDate: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`,
          prayers,
          location: 'Cheltenham, UK',
        });

        // Determine current/next prayer
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        let nextPrayer = 'Fajr';
        for (const prayer of prayers) {
          const [hours, minutes] = prayer.time.split(':').map(Number);
          const prayerTime = hours * 60 + minutes;
          
          if (currentTime < prayerTime) {
            nextPrayer = prayer.name;
            break;
          }
        }
        setCurrentPrayer(nextPrayer);
        
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        // Fallback data
        setPrayerData({
          date: new Date().toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          hijriDate: 'Loading...',
          prayers: [
            { name: 'Fajr', time: '05:30', arabic: 'الفجر' },
            { name: 'Dhuhr', time: '12:30', arabic: 'الظهر' },
            { name: 'Asr', time: '15:45', arabic: 'العصر' },
            { name: 'Maghrib', time: '18:20', arabic: 'المغرب' },
            { name: 'Isha', time: '19:45', arabic: 'العشاء' },
          ],
          location: 'Cheltenham, UK',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <Card className="prayer-time-card">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!prayerData) return null;

  return (
    <section id="prayer-times" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="prayer-time-card max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Prayer Times</h2>
                  <p className="text-sm text-muted-foreground font-arabic">أوقات الصلاة</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{prayerData.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{prayerData.location}</span>
                </div>
                <p className="text-xs text-gold font-arabic mt-1">{prayerData.hijriDate}</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {prayerData.prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`text-center p-4 rounded-lg transition-all duration-300 ${
                    currentPrayer === prayer.name
                      ? 'bg-gradient-primary text-primary-foreground shadow-elegant scale-105'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  <p className="font-arabic text-lg mb-1 opacity-80">{prayer.arabic}</p>
                  <p className="font-semibold text-sm mb-2">{prayer.name}</p>
                  <p className="text-xl font-bold font-mono">{prayer.time}</p>
                  {currentPrayer === prayer.name && (
                    <p className="text-xs mt-2 opacity-90">Next Prayer</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Jummah (Friday Prayer):</strong> 1st congregation at 1:15 PM, 2nd at 2:15 PM
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PrayerTimes;