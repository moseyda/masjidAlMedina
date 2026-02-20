import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => (
  <section id="terms-of-service" className="container mx-auto px-4 py-12 max-w-3xl">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Terms of Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm text-foreground">
        <p>
          Welcome to <strong>Masjid Al-Madina</strong>'s website. By accessing or using our site, you agree to the following terms and conditions.
        </p>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Use of Website</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>This website is provided for community information, event updates, and religious services.</li>
            <li>You agree not to misuse the site or attempt to disrupt its operation.</li>
            <li>Content may not be copied, distributed, or modified without permission.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">User Submissions</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any information submitted (contact forms, event proposals) must be accurate and respectful.</li>
            <li>We reserve the right to remove inappropriate or offensive content.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Links & Third Parties</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Our site may link to external platforms (e.g., donation partners). We are not responsible for their content or privacy practices.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Disclaimer</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>We strive for accuracy but cannot guarantee all information is up-to-date or error-free.</li>
            <li>Use of the site is at your own risk.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Changes to Terms</h3>
          <p>
            We may update these terms at any time. Continued use of the site means you accept any changes.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Contact</h3>
          <p>
            For questions about these terms, please contact us at <a href="mailto:info@masjidalmadina.org.uk" className="text-gold underline">info@masjidalmadina.org.uk</a>.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Last updated: February 2026
        </p>
      </CardContent>
    </Card>
  </section>
);

export default TermsOfService;