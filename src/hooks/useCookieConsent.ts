import Cookies from "js-cookie";

const COOKIE_CONSENT_KEY = "masjid_cookie_consent";

export function useCookieConsent() {
  const hasConsented = () => Cookies.get(COOKIE_CONSENT_KEY) === "accepted";
  const hasDeclined = () => Cookies.get(COOKIE_CONSENT_KEY) === "declined";
  const hasResponded = () => !!Cookies.get(COOKIE_CONSENT_KEY);

  const resetConsent = () => {
    Cookies.remove(COOKIE_CONSENT_KEY);
  };

  return { hasConsented, hasDeclined, hasResponded, resetConsent };
}

// Example usage in a component to conditionally load analytics or other tracking scripts based on user consent:

/////////////////////////////////////////////////

// const { hasConsented } = useCookieConsent();

// if (hasConsented()) {
  // Load analytics, etc.
//}