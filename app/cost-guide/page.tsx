import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Cost Guide Ireland",
  description: "Understand what affects TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, transport and event requirements.",
  path: "/cost-guide",
  image: "/images/table-service.jpg",
  imageAlt: "A venue coordinator preparing dinner tables for a TY Ball",
});

const factors = [
  ["Venue and date", "Location, availability, day of the week and time of year all influence the venue cost."],
  ["Guest estimate", "A realistic number helps the venue and suppliers calculate the right capacity and per-person cost."],
  ["Dinner and service", "The menu, service style and dietary arrangements form part of the proposal."],
  ["Entertainment", "DJ, lighting, photography, photobooth and other additions are shaped around the committee’s priorities."],
  ["Transport", "Routes, collection points and passenger numbers determine any transport included in the plan."],
  ["Event requirements", "Staffing, access, timings and venue procedures differ from one location to another."],
] as const;

const costGuideSchema = [
  breadcrumbSchema("Cost guide", "/cost-guide"),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TY Ball Cost Guide Ireland",
    url: "https://tyballs.ie/cost-guide",
    description: "The main factors that shape a TY Ball proposal in Ireland.",
    about: { "@type": "Service", name: "TY Ball event planning" },
    isPartOf: { "@id": "https://tyballs.ie/#website" },
  },
];

export default function CostGuidePage() {
  return (
    <main id="main-content">
      <StructuredData data={costGuideSchema} />
      <section className="page-hero page-hero-with-media shell">
        <div className="page-hero-title"><p className="eyebrow">TY Ball cost guide</p><h1>What shapes the cost?</h1></div>
        <p className="page-hero-description">Every proposal is built around the actual event: its venue, date, guest estimate and chosen inclusions.</p>
        <figure className="page-hero-media"><EditorialImage alt="An adult venue coordinator preparing a place setting" height={896} name="table-service" width={1200} /></figure>
      </section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Pricing factors</p><h2>How pricing comes together</h2><p>DebsGuru checks current venue and supplier costs against the committee’s priorities, then presents the relevant inclusions and pricing in one proposal.</p></div>
        <div className="topic-grid cost-topics">{factors.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="clarity-note"><strong>Send five useful details</strong><p>The school, county, preferred date or flexibility, realistic guest estimate and the parts of the night that matter most to the committee.</p></aside>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Pricing for your event</p><h2>Request a proposal</h2></div><Link className="button button-dark" href="/enquire">Start your enquiry</Link></section>
    </main>
  );
}
