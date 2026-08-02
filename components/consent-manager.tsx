"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected" | null;
const storageKey = "tyballs-analytics-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendConsent(value: Exclude<Consent, null>) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
  window.gtag("consent", "update", {
    analytics_storage: value === "accepted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function ConsentManager() {
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  useEffect(() => {
    const initialise = () => {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
        sendConsent(stored);
      } else {
        setOpen(true);
      }
    };
    const initialiseTimer = window.setTimeout(initialise, 0);

    const show = () => setOpen(true);
    window.addEventListener("tyballs:cookie-settings", show);
    return () => {
      window.clearTimeout(initialiseTimer);
      window.removeEventListener("tyballs:cookie-settings", show);
    };
  }, []);

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(storageKey, value);
    setConsent(value);
    setOpen(false);
    sendConsent(value);
  }

  return (
    <>
      {consent === "accepted" && gtmId ? (
        <Script id="google-tag-manager" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}
      {open ? (
        <section className="consent-panel" aria-label="Cookie choices" role="dialog" aria-live="polite">
          <div><strong>Your privacy, your choice</strong><p>Necessary security is always active. With your permission, anonymous analytics helps us understand which pages and enquiry steps are useful. Form details are never sent to analytics. <Link href="/cookies">Cookie Policy</Link></p></div>
          <div className="consent-actions"><button type="button" className="consent-reject" onClick={() => choose("rejected")}>Necessary only</button><button type="button" className="button" onClick={() => choose("accepted")}>Allow analytics</button></div>
        </section>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  return <button className="footer-cookie-button" type="button" onClick={() => window.dispatchEvent(new Event("tyballs:cookie-settings"))}>Cookie settings</button>;
}
