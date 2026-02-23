import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PrayerTimes from '@/components/PrayerTimes';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PrayerTimes />
        <AboutSection />
        <ServicesSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
