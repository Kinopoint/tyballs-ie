import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description: "How TYBalls.ie and DebsGuru collect, use, retain and protect information submitted through the TY Ball booking enquiry form.",
  path: "/privacy",
  imageAlt: "TYBalls.ie privacy information",
});

export default function PrivacyPage() {
  return (
    <main className="legal-page shell" id="main-content">
      <header><p className="eyebrow">Legal</p><h1>Privacy Notice</h1><p>Last updated 9 August 2026</p></header>
      <article>
        <h2>1. Who controls your information</h2>
        <p>DebsGuru Ltd, trading through TYBalls.ie, is the controller of personal information submitted through this website.</p>
        <p>Contact: <a href={`mailto:${site.email}`}>{site.email}</a></p>
        <h2>2. Information we collect</h2>
        <p>When you make an enquiry, we collect the committee contact name, email address, phone number, school and location, optional joining-school names, school-year size, enquiry type, preferred date and location, estimated attendance, referral source and any message you choose to provide.</p>
        <p>We may also receive technical information such as the page visited, referrer, campaign parameters, consent choices and a privacy-protected identifier used to prevent repeated spam submissions. We do not ask for student lists, dates of birth or payment-card information through this form.</p>
        <h2>3. Why we use it</h2>
        <ul><li>To respond to your request and discuss suitable TY Ball options.</li><li>To keep a record of the enquiry and manage related follow-up.</li><li>To protect the form and website from misuse.</li><li>To measure website performance where you have allowed analytics cookies.</li></ul>
        <p>These uses rely on steps requested before entering a contract, legitimate interests in operating and securing the service, legal obligations, or consent where applicable.</p>
        <h2>4. Who receives it</h2>
        <p>Authorised DebsGuru personnel and contracted providers supporting hosting, email delivery, form security and consented analytics may process information only for the relevant service. Personal enquiry details are not sent to advertising analytics.</p>
        <h2>5. How long it is kept</h2>
        <p>Enquiries that do not become bookings are scheduled for deletion or anonymisation 18 months after the last recorded activity. Short-lived form-security records are removed sooner. If an enquiry becomes a booking, only the relevant business and transaction records may be retained for up to six years or longer where required by law or an active dispute.</p>
        <h2>6. Your rights</h2>
        <p>Subject to applicable law, you may ask for access, correction, deletion, restriction, objection or a portable copy of your information. You may withdraw analytics consent at any time without affecting earlier processing.</p>
        <p>You may also make a complaint to the Irish Data Protection Commission at <a href="https://www.dataprotection.ie/" rel="noreferrer" target="_blank">dataprotection.ie</a>.</p>
        <h2>7. Contact</h2>
        <p>Send privacy requests to <a href={`mailto:${site.email}`}>{site.email}</a>. We may need to verify that a request relates to you before acting on it.</p>
      </article>
    </main>
  );
}
