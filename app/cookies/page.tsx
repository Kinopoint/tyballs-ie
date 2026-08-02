import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return (
    <main className="legal-page shell" id="main-content">
      <header><p className="eyebrow">Legal</p><h1>Cookie Policy</h1><p>Draft for client review · Last updated 2 August 2026</p></header>
      <article>
        <h2>What cookies are</h2><p>Cookies and similar browser storage help a website remember information or perform a requested function. Some are necessary for the site to work; others require your permission.</p>
        <h2>Necessary technologies</h2><p>The website may use a consent preference and Cloudflare Turnstile security data to protect the enquiry form from automated abuse. These functions are necessary for security and form operation and are not used to build an advertising profile.</p>
        <h2>Analytics</h2><p>If you choose analytics, Google Analytics 4 may receive non-identifying website usage events such as page views, form start, successful enquiry and WhatsApp click. Names, email addresses, phone numbers and form messages are not sent to analytics.</p>
        <h2>Your choice</h2><p>Optional analytics remains disabled until you consent. You can change or withdraw your choice through the cookie settings control available on the website. Browser controls can also remove stored cookies, although blocking necessary functions may prevent the form from working correctly.</p>
        <h2>Changes</h2><p>This policy will be updated if the website’s measurement or service providers change.</p>
      </article>
    </main>
  );
}
