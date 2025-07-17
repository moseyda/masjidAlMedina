import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Prayer Times', href: '#prayer-times' },
    { name: 'Events', href: '#events' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Donate', href: '#donate' }
  ];

  const services = [
    'Daily Prayers',
    'Friday Prayers (Jummah)',
    'Islamic Education',
    'Youth Programs',
    'Community Events',
    'Marriage Services',
    'Funeral Services',
    'Counseling'
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mosque Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Masjid Al-Medina</h3>
                <p className="text-sm opacity-80">Cheltenham</p>
              </div>
            </div>
            
            <p className="text-sm opacity-90 leading-relaxed">
              Serving the Muslim community of Cheltenham and surrounding areas since 1995. 
              A place of worship, learning, and community building.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 opacity-80" />
                <span>123 Bath Road, Cheltenham GL50 1AB</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 opacity-80" />
                <span>+44 1242 123456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 opacity-80" />
                <span>info@masjidalmedina.org.uk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm opacity-90 hover:opacity-100 hover:text-gold transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm opacity-90">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Connected</h4>
            <p className="text-sm opacity-90 mb-4">
              Subscribe to our newsletter for updates on events, prayer times, and community news.
            </p>
            
            <div className="space-y-3 mb-6">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="w-full bg-gold hover:bg-gold-light text-primary font-medium">
                Subscribe
              </Button>
            </div>

            <div>
              <h5 className="font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Times Strip */}
      <div className="border-t border-white/10 bg-primary-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="opacity-80">Next Prayer:</span>
              <span className="font-semibold text-gold">Maghrib at 6:45 PM</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <span className="opacity-80">Jummah:</span>
              <span className="font-semibold">1:15 PM & 2:15 PM</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <span className="opacity-80">Emergency:</span>
              <span className="font-semibold">+44 7700 900123</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm opacity-80">
              © {currentYear} Masjid Al-Medina. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="opacity-80">Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span className="opacity-80">for our community</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;