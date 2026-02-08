import { ArrowRight, MapPin, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrayerTimes } from '@/hooks/usePrayerTimes'; 

const HeroSection = () => {

    const { prayerData, loading } = usePrayerTimes(); 
    
    console.log('Prayer Data:', prayerData, 'Loading:', loading);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
              Masjid Al-Medina
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
              aria-label="Open Masjid Al-Medina location on Google Maps"
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
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-elegant transition-all duration-300 hover:scale-105 font-semibold px-8 py-3"
            >
              View Prayer Times
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-elegant transition-all duration-300 hover:scale-105 font-semibold px-8 py-3 mt-2 sm:mt-0"
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
    </section>
  );
};

export default HeroSection;