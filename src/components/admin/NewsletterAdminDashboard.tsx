import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const demoTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8f7;padding:0;margin:0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin:32px 0;">
        <tr>
          <td style="padding:32px 32px 16px 32px;text-align:center;">
            <img src="./public/logo.png" alt="Masjid Al-Madina" width="200" height="45" style="vertical-align:middle;" />
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <h2 style="color:#1B5E20;font-family:sans-serif;font-size:1.25rem;margin:24px 0 12px 0;">Assalamu Alaikum!</h2>
            <p style="font-family:sans-serif;font-size:1rem;color:#222;margin:0 0 16px 0;">
              We pray this message finds you in the best of health and Imaan. Here are this month's updates from Masjid Al-Madina:
            </p>
            <ul style="font-family:sans-serif;font-size:1rem;color:#222;margin:0 0 16px 20px;padding:0;">
              <li style="margin-bottom:8px;"><strong>Upcoming Event:</strong> Community Iftar – Friday, 7pm</li>
              <li style="margin-bottom:8px;"><strong>Prayer Times:</strong> Updated on our website</li>
              <li style="margin-bottom:8px;"><strong>Volunteer Opportunities:</strong> Contact us to join</li>
            </ul>
            <p style="font-family:sans-serif;font-size:1rem;color:#222;margin:0 0 16px 0;">
              For more details, visit <a href="https://masjidalmadina.org.uk" style="color:#D4AF37;text-decoration:underline;">our website</a>.
            </p>
            <p style="font-family:sans-serif;font-size:1rem;color:#222;margin:0 0 24px 0;">
              JazakAllah Khair,<br/>
              <span style="color:#1B5E20;font-weight:600;">Masjid Al-Madina Team</span>
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <p style="font-size:0.9rem;color:#888;font-family:sans-serif;text-align:center;">
              You are receiving this email because you subscribed to updates from Masjid Al-Madina.<br>
              <a href="{{unsubscribe_url}}" style="color:#D4AF37;text-decoration:underline;">Unsubscribe</a> at any time.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

const NewsletterAdminDashboard = () => {
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login')
    }
  }, [user, loading, navigate])

  const handleSend = async () => {
    setStatus('loading');
    try {
      const html = editor?.getHTML() || '';
      const res = await fetch('/functions/v1/sendNewsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, html }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Newsletter sent!');
      } else {
        setStatus('error');
        setMessage('Failed to send newsletter.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error.');
    }
  };

  const handleUseTemplate = () => {
    editor?.commands.setContent(demoTemplate);
    setSubject('Masjid Al-Madina Monthly Newsletter');
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-2xl">Newsletter Admin</CardTitle>
          <Badge variant="secondary" className="mt-2">Admin Only</Badge>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="subject" className="block font-medium mb-1 text-primary">Subject</label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Newsletter subject"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-primary">Content</label>
              <div className="bg-white border border-input rounded-md min-h-[200px] p-2">
                <EditorContent editor={editor} />
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={handleUseTemplate}
              >
                Use Template
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Newsletter'}
            </Button>
            {message && (
              <div className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsletterAdminDashboard;