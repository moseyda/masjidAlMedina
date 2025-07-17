import { Users, BookOpen, Heart, Award, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutSection = () => {
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
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About Masjid Al-Medina
          </h2>
          <p className="font-arabic text-lg text-gold mb-4">عن مسجد المدينة</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Established in 1995, Masjid Al-Medina has been serving the Muslim community of Cheltenham 
            and surrounding areas for over 25 years. We are committed to providing a welcoming space for 
            worship, education, and community building.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="shadow-elegant mb-12 max-w-4xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To create a unified Muslim community that practices Islam according to the Quran and Sunnah, 
              while promoting understanding, tolerance, and positive engagement with the wider community of Cheltenham.
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="font-arabic text-primary text-lg">
                "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"
              </p>
              <p className="text-sm text-muted-foreground mt-2 italic">
                "And hold firmly to the rope of Allah all together and do not become divided" - Quran 3:103
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="prayer-time-card group hover:scale-105">
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

        {/* Community Stats */}
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

export default AboutSection;