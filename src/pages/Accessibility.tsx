import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Accessibility = () => (
  <section id="accessibility" className="container mx-auto px-4 py-12 max-w-3xl">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Accessibility Statement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm text-foreground">
        <p>
          <strong>Masjid Al-Madina</strong> is committed to making our website accessible to all members of the community, including those with disabilities.
        </p>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Our Commitment</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>We strive to follow best practices for accessibility and usability.</li>
            <li>Our website is designed to be compatible with screen readers and assistive technologies.</li>
            <li>We use clear language, high-contrast colors, and scalable fonts for readability.</li>
            <li>Navigation is keyboard-friendly and forms are accessible.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Continuous Improvement</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>We regularly review and update our website to improve accessibility.</li>
            <li>If you encounter any barriers or have suggestions, please let us know.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Contact</h3>
          <p>
            For accessibility support or feedback, email us at <a href="mailto:info@masjidalmadina.org.uk" className="text-gold underline">info@masjidalmadina.org.uk</a>.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Last updated: February 2026
        </p>
      </CardContent>
    </Card>
  </section>
);

export default Accessibility;