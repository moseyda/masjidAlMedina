import { useState } from 'react';
import { ArrowRight, MapPin, Users, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import MonthlyPrayerTimesModal from './MonthlyPrayerTimesModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ZEFFY_URL = 'https://www.zeffy.com/en-GB/donation-form/give-charity-without-delay-for-it-stands-in-the-way-of-calamity';

const HeroSection = () => {
  const { prayerData, loading } = usePrayerTimes(); 
  const [showMonthly, setShowMonthly] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);

  const openDonationPage = () => {
    window.open(ZEFFY_URL, '_blank');
    setShowDonateDialog(false);
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
      >
        {/* Background with Islamic pattern */}
        <div className="absolute inset-0 bg-gradient-hero islamic-pattern">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-2 sm:px-4 text-center text-white">
          <div className="max-w-4xl mx-auto pt-24 sm:pt-20">
            <p dir="rtl" lang="ar" className="font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 opacity-90 leading-none">
              ﷽
            </p>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Masjid Al-Madina
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
              A place of worship, community, and spiritual growth in the heart of Cheltenham.
              Join us for prayers, events, and fellowship.
            </p>

            {/* Location and Community Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <a
                href="https://maps.app.goo.gl/C1fZbZW7s8k266Bg9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 hover:bg-white/20 transition"
                aria-label="Open Masjid Al-Madina location on Google Maps"
              >
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-xs sm:text-sm font-medium">
                  Cheltenham, Gloucestershire
                </span>
              </a>

              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 mt-2 sm:mt-0">
                <Users className="w-5 h-5 text-gold" />
                <span className="text-xs sm:text-sm font-medium">
                  Serving 500+ Families
                </span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => setShowMonthly(true)}
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-elegant transition-all duration-300 hover:scale-105 font-semibold px-8 py-3"
              >
                View Prayer Times
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowDonateDialog(true)}
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-elegant transition-all duration-300 hover:scale-105 font-semibold px-8 py-3 mt-2 sm:mt-0"
              >
                <Heart className="w-5 h-5 mr-2" />
                Support Our Community
              </Button>
            </div>

            {/* Next Prayer Indicator */}
            <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 max-w-xs sm:max-w-sm mx-auto flex items-center justify-between shadow-elegant border border-white/20">
              <span className="text-xs sm:text-sm opacity-80 mr-2 sm:mr-3 whitespace-nowrap">Next Prayer</span>
              {loading || !prayerData?.nextPrayer ? (
                <div className="animate-pulse h-6 flex-1 flex items-center justify-center">
                  <span className="bg-white/20 rounded w-2/3 h-4"></span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-start mr-2 sm:mr-3">
                    <span className="font-arabic text-sm sm:text-base leading-none">{prayerData.nextPrayer.arabic}</span>
                    <span className="font-semibold text-xs leading-none">{prayerData.nextPrayer.name}</span>
                  </div>
                  <div className="text-right ml-2 sm:ml-3 flex flex-col items-end">
                    <span className="text-base sm:text-lg font-bold font-mono leading-none">{prayerData.nextPrayer.time}</span>
                    <span className="text-xs opacity-80 block leading-none">{prayerData.nextPrayerIn}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <MonthlyPrayerTimesModal 
          isOpen={showMonthly} 
          onClose={() => setShowMonthly(false)} 
        />
      </section>

      {/* Donation Redirect Dialog */}
      <AlertDialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Leaving Masjid Al-Madina
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to <strong>Zeffy</strong>, our secure donation partner. 
              Zeffy is a 100% free platform. Your entire donation goes to the masjid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={openDonationPage} className="mosque-button">
              <ExternalLink className="w-4 h-4 mr-2" />
              Continue to Zeffy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HeroSection;