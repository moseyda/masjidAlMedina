import { useState, useEffect } from 'react';
import { getUser } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

const NewsletterAdminDashboard = () => {
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(user => {
        // ***** Check for a custom claim or role later *****
        if (!user || user.role !== 'admin') {
          navigate('/admin/login');
        }
      })
      .catch(() => navigate('/admin/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSend = async () => {
    setStatus('loading');
    try {
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

  if (loading) {
    return <div className="text-center py-8">Checking authentication...</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Compose Newsletter</h2>
      <input
        type="text"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject"
        className="input input-bordered w-full"
      />
      <textarea
        value={html}
        onChange={e => setHtml(e.target.value)}
        placeholder="Newsletter content (HTML allowed)"
        className="textarea textarea-bordered w-full h-40"
      />
      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={status === 'loading'}
      >
        Send Newsletter
      </button>
      {message && (
        <div className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterAdminDashboard;