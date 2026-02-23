import { Users, BookOpen, Heart, Award, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Five Daily Prayers",
      description: "Join us for all five daily prayers in congregation with our welcoming community.",
      arabic: "الصلوات الخمس"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Friday Prayers (Jummah)",
      description: "Weekly Friday prayers with inspiring khutbahs in English and Arabic.",
      arabic: "صلاة الجمعة"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Islamic Education",
      description: "Quran classes, Islamic studies, and Arabic language courses for all ages.",
      arabic: "التعليم الإسلامي"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Events",
      description: "Regular community gatherings, celebrations, and interfaith activities.",
      arabic: "الأنشطة المجتمعية"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Social Services",
      description: "Support for families in need, food banks, and community assistance programs.",
      arabic: "الخدمات الاجتماعية"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Youth Programs",
      description: "Engaging activities and mentorship programs for children and young adults.",
      arabic: "برامج الشباب"
    }
  ];

  return (
    <section
      id="services"
      className="py-16 bg-background select-none"
      aria-label="Masjid Services"
    >
        <div className="container mx-auto px-4">   
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Masjid Services
            </h2>
        </div>
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
        >
            {services.map((service, index) => (
            <Card
                key={index}
                className="prayer-time-card group hover:scale-105"
                role="listitem"
                style={{ willChange: 'transform' }}
            >
                <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                    </div>
                    <div>
                    <CardTitle className="text-lg text-primary">{service.title}</CardTitle>
                    <p className="text-sm font-arabic text-gold">{service.arabic}</p>
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
                <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Our Growing Community</h3>
                    <p className="opacity-90">Bringing together Muslims from diverse backgrounds</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm opacity-90">Families Served</div>
                    </div>
                    <div>
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-sm opacity-90">Years of Service</div>
                    </div>
                    <div>
                    <div className="text-3xl font-bold mb-2">100+</div>
                    <div className="text-sm opacity-90">Children in Programs</div>
                    </div>
                    <div>
                    <div className="text-3xl font-bold mb-2">12</div>
                    <div className="text-sm opacity-90">Community Events/Month</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ServicesSection;