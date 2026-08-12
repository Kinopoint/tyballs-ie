export type AnalyticsEvent = "form_start" | "generate_lead" | "whatsapp_click";
export const analyticsConsentStorageKey = "tyballs-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(analyticsConsentStorageKey) !== "accepted") return;
  if (window.gtag) {
    window.gtag("event", event, parameters);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
