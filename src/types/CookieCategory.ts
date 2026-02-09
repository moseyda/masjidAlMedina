export type CookieCategory = "essential" | "analytics" | "marketing";

export interface CookiePreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const COOKIE_DESCRIPTIONS: Record<CookieCategory, { title: string; description: string; required: boolean }> = {
  essential: {
    title: "Essential Cookies",
    description:
      "Required for the website to function properly. These include authentication, security, and basic functionality cookies.",
    required: true,
  },
  analytics: {
    title: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting anonymous usage data. This helps us improve the site experience.",
    required: false,
  },
  marketing: {
    title: "Marketing Cookies",
    description:
      "Used to deliver relevant announcements and event promotions. These may track your activity across our site.",
    required: false,
  },
};