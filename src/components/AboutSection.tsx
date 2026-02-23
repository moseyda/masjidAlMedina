import {Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {

  return (
    <section id="about" className="py-16 bg-background select-none">
      <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              About Masjid Al-Madina
            </h2>
            <p className="font-arabic text-lg text-gold mb-4">عن مسجد المدينة</p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Established in 1995, Masjid Al-Madina has been serving the Muslim community of Cheltenham 
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
        </div>

    </section>
  );
};

export default AboutSection;