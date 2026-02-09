import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import {
  CookieCategory,
  CookiePreferences,
  DEFAULT_PREFERENCES,
} from "@/types/CookieCategory";

const COOKIE_CONSENT_KEY = "masjid_cookie_consent";
const COOKIE_PREFERENCES_KEY = "masjid_cookie_preferences";

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasResponded, setHasResponded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    const savedPrefs = Cookies.get(COOKIE_PREFERENCES_KEY);

    if (consent && savedPrefs) {
      try {
        const parsed: CookiePreferences = JSON.parse(savedPrefs);
        parsed.essential = true; 
        setPreferences(parsed);
        setHasResponded(true);
      } catch {
        setHasResponded(false);
      }
    }
    setIsLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    Cookies.set(COOKIE_CONSENT_KEY, "accepted", { expires: 365 });
    Cookies.set(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted), {
      expires: 365,
    });
    setPreferences(allAccepted);
    setHasResponded(true);
  }, []);

  const declineAll = useCallback(() => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    Cookies.set(COOKIE_CONSENT_KEY, "declined", { expires: 365 });
    Cookies.set(COOKIE_PREFERENCES_KEY, JSON.stringify(essentialOnly), {
      expires: 365,
    });
    setPreferences(essentialOnly);
    setHasResponded(true);
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    const safePrefs = { ...prefs, essential: true };
    Cookies.set(COOKIE_CONSENT_KEY, "custom", { expires: 365 });
    Cookies.set(COOKIE_PREFERENCES_KEY, JSON.stringify(safePrefs), {
      expires: 365,
    });
    setPreferences(safePrefs);
    setHasResponded(true);
  }, []);

  const resetConsent = useCallback(() => {
    Cookies.remove(COOKIE_CONSENT_KEY);
    Cookies.remove(COOKIE_PREFERENCES_KEY);
    setPreferences(DEFAULT_PREFERENCES);
    setHasResponded(false);
  }, []);

  const hasCategory = useCallback(
    (category: CookieCategory): boolean => {
      return preferences[category] ?? false;
    },
    [preferences]
  );

  return {
    preferences,
    hasResponded,
    isLoaded,
    acceptAll,
    declineAll,
    savePreferences,
    resetConsent,
    hasCategory,
  };
}