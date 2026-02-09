import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMonthlyPrayerTimes } from '@/services/prayerTimes';

interface MonthlyPrayerTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DayTiming {
  date: {
    readable: string;
    gregorian: { day: string; weekday: { en: string } };
    hijri: { day: string; month: { en: string }; year: string };
  };
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
}

const MonthlyPrayerTimesModal = ({ isOpen, onClose }: MonthlyPrayerTimesModalProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState<DayTiming[]>([]);
  const [loading, setLoading] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const times = await getMonthlyPrayerTimes(year, month);
        setData(times);
      } catch (error) {
        console.error('Failed to fetch monthly times:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, year, month]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const formatTime = (time: string) => time.split(' ')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground">
          <h2 className="text-xl font-bold">Monthly Prayer Times</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between p-4 border-b">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="text-lg font-semibold">
            {monthNames[month - 1]} {year}
          </h3>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-center font-semibold">Day</th>
                  <th className="p-3 text-center font-semibold">Fajr</th>
                  <th className="p-3 text-center font-semibold">Sunrise</th>
                  <th className="p-3 text-center font-semibold">Dhuhr</th>
                  <th className="p-3 text-center font-semibold">Asr</th>
                  <th className="p-3 text-center font-semibold">Maghrib</th>
                  <th className="p-3 text-center font-semibold">Isha</th>
                </tr>
              </thead>
              <tbody>
                {data.map((day, index) => {
                  const isToday = day.date.gregorian.day === String(new Date().getDate()) &&
                    month === new Date().getMonth() + 1 &&
                    year === new Date().getFullYear();

                  return (
                    <tr
                      key={index}
                      className={`border-b hover:bg-muted/50 ${isToday ? 'bg-primary/10 font-semibold' : ''}`}
                    >
                      <td className="p-3">{day.date.gregorian.day}</td>
                      <td className="p-3 text-center">{day.date.gregorian.weekday.en.slice(0, 3)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Fajr)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Sunrise)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Dhuhr)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Asr)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Maghrib)}</td>
                      <td className="p-3 text-center font-mono">{formatTime(day.timings.Isha)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Cheltenham, UK • Islamic Society of North America (ISNA) Method</p>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPrayerTimesModal;