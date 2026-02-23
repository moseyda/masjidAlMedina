import { useState } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { Button } from './ui/button';
import MonthlyPrayerTimesModal from './MonthlyPrayerTimesModal';


const PrayerTimes = () => {
  const { prayerData, loading } = usePrayerTimes();
  const [showMonthly, setShowMonthly] = useState(false);
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
    <section id="prayer-times" className="py-12 bg-muted/30 select-none">
      <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Prayer Times
                </h2>
            </div>
        <Card className="prayer-time-card max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{prayerData.date}</span>
                  <div className="text-xs text-gold font-arabic mt-1 md:mt-0 md:ml-0">
                    {prayerData.hijriDate}
                  </div>
                  <span className="mx-2">|</span>
                  <MapPin className="w-4 h-4" />
                  <span>{prayerData.location}</span>
                </div>

              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {prayerData.prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`text-center p-4 rounded-lg transition-all duration-300 ${
                    prayerData.nextPrayer?.name === prayer.name
                      ? 'bg-gradient-primary text-primary-foreground shadow-elegant scale-105'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  <p className="font-arabic text-lg mb-1 opacity-80">{prayer.arabic}</p>
                  <p className="font-semibold text-sm mb-2">{prayer.name}</p>
                  <p className="text-xl font-bold font-mono">{prayer.time}</p>
                  {prayerData.nextPrayer?.name === prayer.name && (
                    <p className="text-xs mt-2 opacity-90">Next Prayer</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Jummah (Friday Prayer):</strong> 1st congregation at 1:15 PM, 2nd at 2:15 PM
              </p>
              <Button 
                variant="outline" 
                onClick={() => setShowMonthly(true)}
                className="mt-2"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Monthly Prayer Times
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <MonthlyPrayerTimesModal 
        isOpen={showMonthly} 
        onClose={() => setShowMonthly(false)} 
      />
    </section>
  );
};

export default PrayerTimes;