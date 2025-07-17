import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      details: ["+44 1242 123456", "Emergency: +44 7700 900123"],
      action: "Call Us"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: ["info@masjidalmedina.org.uk", "imam@masjidalmedina.org.uk"],
      action: "Email Us"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Address",
      details: ["123 Bath Road", "Cheltenham GL50 1AB", "Gloucestershire, UK"],
      action: "Get Directions"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Opening Hours",
      details: ["Daily: 30 min before Fajr - 30 min after Isha", "Office: Mon-Fri 9:00 AM - 5:00 PM"],
      action: "View Schedule"
    }
  ];

  const openingHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM (Office)", prayer: "30 min before Fajr - 30 min after Isha" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM (Office)", prayer: "30 min before Fajr - 30 min after Isha" },
    { day: "Sunday", hours: "Closed (Office)", prayer: "30 min before Fajr - 30 min after Isha" },
    { day: "Friday (Jummah)", hours: "9:00 AM - 5:00 PM (Office)", prayer: "Extended hours for Jummah prayers" }
  ];

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Contact Us
          </h2>
          <p className="font-arabic text-lg text-gold mb-4">اتصل بنا</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help and answer any questions you may have. Reach out to us for information 
            about prayers, events, or community services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-6">Get in Touch</h3>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="prayer-time-card group hover:scale-105">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                        <Button variant="outline" size="sm" className="mt-2 text-xs">
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Opening Hours */}
            <Card className="prayer-time-card">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openingHours.map((schedule, index) => (
                    <div key={index} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{schedule.day}</p>
                          <p className="text-xs text-muted-foreground">Office: {schedule.hours}</p>
                        </div>
                      </div>
                      <p className="text-xs text-primary mt-1">Prayer Hall: {schedule.prayer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card className="prayer-time-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name *
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name *
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject *
                    </label>
                    <Input placeholder="What is your message about?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Please share your message, questions, or feedback..."
                      rows={5}
                    />
                  </div>
                  
                  <Button className="mosque-button w-full">
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="prayer-time-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">
                      123 Bath Road, Cheltenham GL50 1AB
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="mosque-button flex-1">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View on Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;