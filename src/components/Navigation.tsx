import { useState } from 'react';
import { Menu, X, Heart, Clock, Calendar, Phone, Info, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: <div className="w-4 h-4 rounded-full bg-primary" /> },
    { name: 'Prayer Times', href: '#prayer-times', icon: <Clock className="w-4 h-4" /> },
    { name: 'Events', href: '#events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Info className="w-4 h-4" /> },
    { name: 'Services', href: '#services', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gold rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg text-primary">Masjid Al-Medina</h1>
              <p className="text-xs text-muted-foreground">Cheltenham</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
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
                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
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