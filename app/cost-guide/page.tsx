import Link from "next/link";
import Image from "next/image";
import { CostFactorRotator } from "@/components/cost-factor-rotator";
import { EventIcon } from "@/components/event-icon";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Cost Guide Ireland",
  description: "Understand what affects TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, transport and event requirements.",
  path: "/cost-guide",
  image: "/images/cost-guide-hero.webp",
  imageAlt: "A TY Ball committee reviewing a prepared venue with an event coordinator",
});

const factors = [
  ["venue", "Venue and date", "Location, availability and time of year influence the starting cost."],
  ["guests", "Guest estimate", "A realistic number sets the capacity and helps suppliers price accurately."],
  ["dining", "Dinner and service", "Menu, service style and dietary needs become part of the proposal."],
  ["music", "Entertainment", "DJ, lighting, photography and extras follow the committee’s priorities."],
  ["route", "Transport", "Routes, collection points and passenger numbers shape any travel included."],
  ["contact", "Event requirements", "Staffing, access, timings and procedures differ between venues."],
] as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
    <main className="cost-landing" id="main-content">
      <StructuredData data={costGuideSchema} />
      <section className="cost-cinematic-hero" aria-labelledby="cost-hero-title">
        <Image alt="A TY Ball committee taking part in a venue walkthrough with an adult event coordinator" className="cost-hero-image" fill priority sizes="100vw" src={`${basePath}/images/cost-guide-hero.webp`} unoptimized />
        <div className="cost-hero-scrim" aria-hidden="true" />
        <div className="cost-hero-content shell">
          <p className="eyebrow light">TY Ball cost guide</p>
          <h1 id="cost-hero-title">
            {"What shapes the cost?".split(" ").map((word, index) => <span className="cost-word" key={word}><span style={{ animationDelay: `${300 + index * 110}ms` }}>{word}&nbsp;</span></span>)}
          </h1>
          <div className="cost-hero-action">
            <Link className="button" href="/enquire">Start your enquiry <span aria-hidden="true">↗</span></Link>
            <p>Your proposal follows the venue, date, guest estimate and the parts of the night your committee chooses.</p>
          </div>
        </div>
        <div className="cost-hero-panels">
          <article className="cost-panel cost-panel-intro">
            <div><p className="eyebrow">Built for your event</p><h2>Built around your night.</h2></div>
            <a href="#cost-factors">See the factors</a>
          </article>
          <article className="cost-panel cost-panel-rotator"><CostFactorRotator /></article>
          <article className="cost-panel cost-panel-proof">
            <EventIcon name="calendar" />
            <div><strong>10+ years</strong><p>DebsGuru event experience across Ireland.</p></div>
          </article>
        </div>
      </section>

      <section className="cost-factor-section shell" id="cost-factors">
        <div className="cost-factor-heading"><div><p className="eyebrow">Pricing factors</p><h2>Every part counts.</h2></div><p>DebsGuru checks current venue and supplier costs, then brings the relevant inclusions and pricing into one proposal.</p></div>
        <div className="cost-factor-grid">
          {factors.map(([icon, title, text]) => <article key={title}><EventIcon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="cost-request-band shell">
        <div><p className="eyebrow light">Send the starting point</p><h2>Ready for a real proposal?</h2></div>
        <p>Share the school, county, date or flexibility, guest estimate and the parts of the night that matter most.</p>
        <Link className="button" href="/enquire">Check your date</Link>
      </section>
    </main>
  );
}
