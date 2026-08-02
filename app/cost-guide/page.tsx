import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Much Does a TY Ball Cost in Ireland?",
  description: "Understand the main factors that affect TY Ball pricing in Ireland and why an accurate proposal depends on date, venue, attendance and inclusions.",
  alternates: { canonical: "/cost-guide" },
};

const factors = [
  ["Venue and date", "Availability and venue rates vary by location, day of the week and time of year."],
  ["Attendance", "An honest estimate helps venues and suppliers calculate the practical per-person cost."],
  ["Food and service", "The menu, service format and dietary arrangements affect the proposal."],
  ["Entertainment", "DJ, production, photography, photobooths and optional extras are selected around the committee’s priorities."],
  ["Transport", "Transport may depend on routes, collection points and passenger numbers and should be shown clearly when included."],
  ["Venue-specific requirements", "Staffing, access, timing and event requirements can differ between venues."],
] as const;

export default function CostGuidePage() {
  return (
    <main id="main-content">
      <section className="page-hero shell"><p className="eyebrow">TY Ball cost guide</p><h1>Why there is no honest one-price answer.</h1><p>A useful price is one that reflects the actual venue, date, attendance and experience — not a headline figure that changes after you enquire.</p></section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">What shapes the proposal</p><h2>Six variables that make the biggest difference.</h2><p>DebsGuru does not publish a fixed TY Ball price because venue and supplier costs can change. The committee receives a tailored discussion once the essentials are known.</p></div>
        <div className="topic-grid cost-topics">{factors.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="clarity-note"><strong>What to send for an accurate starting conversation</strong><p>School, county, preferred date or date flexibility, realistic estimated attendance and the parts of the night that matter most to your committee.</p></aside>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Get a relevant answer</p><h2>Start with your date and numbers.</h2></div><Link className="button button-dark" href="/enquire">Request a conversation <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
