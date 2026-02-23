import { useState, useEffect } from 'react';
import { Menu, X, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

import MosqueIcon from '@/components/ui/MosqueIcon';
import SalahIcon from '@/components/ui/salah-stroke-rounded';
import Mosque02Icon from './ui/mosque-02-stroke-rounded';
import Calendar01Icon from './ui/calendar-01-stroke-rounded';
import InformationCircleIcon from './ui/information-circle-stroke-rounded';
import UserMultiple02Icon from './ui/user-multiple-02-stroke-rounded';
import Call02Icon from './ui/contact';

const ZEFFY_URL = 'https://www.zeffy.com/en-GB/donation-form/give-charity-without-delay-for-it-stands-in-the-way-of-calamity';

const navItems = [
  { name: 'Home', href: '#home', icon: <Mosque02Icon className="w-5 h-5" />, section: 'home' },
  { name: 'Prayer Times', href: '#prayer-times', icon: <SalahIcon className="w-5 h-5" />, section: 'prayer-times' },
  { name: 'Events', href: '#events', icon: <Calendar01Icon className="w-5 h-5" />, section: 'events' },
  { name: 'About', href: '#about', icon: <InformationCircleIcon className="w-5 h-5" />, section: 'about' },
  { name: 'Services', href: '#services', icon: <UserMultiple02Icon className="w-5 h-5" />, section: 'services' },
  { name: 'Contact', href: '#contact', icon: <Call02Icon className="w-5 h-5" />, section: 'contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const openDonationPage = () => {
    window.open(ZEFFY_URL, '_blank');
    setShowDonateDialog(false);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      for (const item of navItems) {
        const sectionId = item.href.replace('#', '');
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = item.section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center">
                  <MosqueIcon size={18} color="hsl(var(--primary-foreground))" strokeWidth={0} />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg text-primary">Masjid Al-Madina</h1>
                <p className="text-xs text-muted-foreground">Cheltenham</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200
                    ${activeSection === item.section
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'}
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            {/* Donate Button & Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <Button 
                className="mosque-button hidden sm:flex items-center space-x-2"
                onClick={() => setShowDonateDialog(true)}
              >
                <Heart className="w-4 h-4" />
                <span>Donate</span>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${activeSection === item.section
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'}
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
              <Button 
                className="mosque-button w-full flex items-center justify-center space-x-2 mt-4"
                onClick={() => {
                  setIsOpen(false);
                  setShowDonateDialog(true);
                }}
              >
                <Heart className="w-4 h-4" />
                <span>Donate</span>
              </Button>
            </div>
          )}
        </div>
      </nav>

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

export default Navigation;