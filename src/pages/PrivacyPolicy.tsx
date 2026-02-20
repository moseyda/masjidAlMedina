import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <section id="privacy-policy" className="container mx-auto px-4 py-12 max-w-3xl">
    <div className="mb-8">
      <a
        href="/"
        aria-label="Back to Home"
        className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 hover:bg-muted/70 transition group"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 transition-transform group-hover:-translate-x-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </span>
        <span className="text-sm text-muted-foreground font-medium">Back to Home</span>
      </a>
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm text-foreground">
        <p>
          <strong>Masjid Al-Madina</strong> is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our website or interact with our services.
        </p>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Personal information you provide (such as name, email, phone) when contacting us or subscribing to our newsletter.</li>
            <li>Information submitted through forms (event proposals, donations, contact messages).</li>
            <li>Technical information (IP address, browser type) for security and analytics.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">How We Use Your Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to your inquiries and provide requested services.</li>
            <li>To send updates about events, prayer times, and community news (if subscribed).</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations and ensure site security.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Data Sharing</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>We do not sell or share your personal information with third parties except as required by law or to provide essential services (e.g., donation processing).</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Cookies</h3>
          <p>
            Our website uses cookies to enhance your experience and analyze site usage. You can manage your cookie preferences at any time.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Your Rights</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:info@masjidalmadina.org.uk" className="text-gold underline">info@masjidalmadina.org.uk</a>.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gold">Contact</h3>
          <p>
            For questions about this policy or your data, please contact us at <a href="mailto:info@masjidalmadina.org.uk" className="text-gold underline">info@masjidalmadina.org.uk</a>.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Last updated: February 2026
        </p>
      </CardContent>
    </Card>
  </section>
);

export default PrivacyPolicy;