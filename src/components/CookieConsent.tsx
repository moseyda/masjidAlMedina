import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";

const COOKIE_CONSENT_KEY = "masjid_cookie_consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set(COOKIE_CONSENT_KEY, "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const declineCookies = () => {
    Cookies.set(COOKIE_CONSENT_KEY, "declined", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          We use cookies to enhance your experience on our website. By continuing
          to browse, you agree to our use of cookies.{" "}
          <a
            href="/privacy-policy"
            className="underline text-primary hover:text-primary/80"
          >
            Learn more
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={declineCookies}>
            Decline
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}