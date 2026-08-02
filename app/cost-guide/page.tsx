import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";

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
      <section className="page-hero page-hero-with-media shell">
        <div className="page-hero-title"><p className="eyebrow">TY Ball cost guide</p><h1>What affects the price of a TY Ball?</h1></div>
        <p className="page-hero-description">The venue, date, attendance and requested services determine the cost. DebsGuru prepares a proposal after reviewing those details.</p>
        <figure className="page-hero-media"><EditorialImage alt="An adult venue coordinator preparing a place setting" height={896} name="table-service" width={1200} /></figure>
      </section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Pricing factors</p><h2>Six details used to prepare a proposal</h2><p>DebsGuru does not publish a fixed TY Ball price because venue and supplier costs change. The committee receives relevant pricing after the main event details are known.</p></div>
        <div className="topic-grid cost-topics">{factors.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="clarity-note"><strong>What to send for an accurate starting conversation</strong><p>School, county, preferred date or date flexibility, realistic estimated attendance and the parts of the night that matter most to your committee.</p></aside>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Request pricing</p><h2>Send your date and attendance estimate</h2></div><Link className="button button-dark" href="/enquire">Open the enquiry form</Link></section>
    </main>
  );
}
