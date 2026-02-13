import { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Heart } from 'lucide-react';
import MosqueIcon from '@/components/ui/MosqueIcon';
import { Button } from '@/components/ui/button';
import SalahIcon from '@/components/ui/salah-stroke-rounded';
import Mosque02Icon from './ui/mosque-02-stroke-rounded';
import Calendar01Icon from './ui/calendar-01-stroke-rounded';
import InformationCircleIcon from './ui/information-circle-stroke-rounded';
import UserMultiple02Icon from './ui/user-multiple-02-stroke-rounded';
import Call02Icon from './ui/contact';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: <Mosque02Icon className="w-5 h-5" /> },
    { name: 'Prayer Times', href: '#prayer-times', icon: <SalahIcon className="w-5 h-5" /> },
    { name: 'Events', href: '#events', icon: <Calendar01Icon className="w-5 h-5" /> },
    { name: 'About', href: '#about', icon: <InformationCircleIcon className="w-5 h-5" /> },
    { name: 'Services', href: '#services', icon: <UserMultiple02Icon className="w-5 h-5" /> },
    { name: 'Contact', href: '#contact', icon: <Call02Icon className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center">
                <MosqueIcon
                  size={18}
                  color="hsl(var(--primary-foreground))"
                  strokeWidth={0}
                />
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
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Donate Button & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <Button className="mosque-button hidden sm:flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Donate</span>
            </Button>

            {/* Mobile menu button */}
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
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
            <Button className="mosque-button w-full flex items-center justify-center space-x-2 mt-4">
              <Heart className="w-4 h-4" />
              <span>Donate</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;