import Cookies from "js-cookie";
import type { CookieCategory } from "@/types/CookieCategory";

const COOKIE_PREFERENCES_KEY = "masjid_cookie_preferences";

/**
 * Check if a specific cookie category has been accepted.
 * Use this before loading any third-party scripts.
 *
 * Example:
 *   if (isCategoryAllowed("analytics")) {
 *     // Load Google Analytics
 *   }
 */
export function isCategoryAllowed(category: CookieCategory): boolean {
  if (category === "essential") return true;

  const raw = Cookies.get(COOKIE_PREFERENCES_KEY);
  if (!raw) return false;

  try {
    const prefs = JSON.parse(raw);
    return prefs[category] === true;
  } catch {
    return false;
  }
}

/**
 * Set a cookie only if the required category has been accepted.
 */
export function setConditionalCookie(
  name: string,
  value: string,
  category: CookieCategory,
  options?: Cookies.CookieAttributes
): boolean {
  if (!isCategoryAllowed(category)) return false;
  Cookies.set(name, value, options);
  return true;
}

/**
 * Store a user preference (uses essential category).
 */
export function setPreferenceCookie(
  name: string,
  value: string,
  expiresInDays = 365
) {
  Cookies.set(name, value, { expires: expiresInDays });
}

/**
 * Get any cookie value.
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

/**
 * Remove a cookie.
 */
export function removeCookie(name: string) {
  Cookies.remove(name);
}