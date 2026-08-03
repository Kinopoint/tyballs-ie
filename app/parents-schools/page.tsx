import Link from "next/link";
import { EventIcon } from "@/components/event-icon";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Guidance for Parents & Schools",
  description: "Clear TY Ball guidance for parents and schools covering venue entry, timings, named contacts, transport, dietary needs and accessibility.",
  path: "/parents-schools",
  image: "/images/tyballs-real-event-poster.jpg",
  imageAlt: "Guests arriving at a real DebsGuru event",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const confirmations = [
  ["shield", "Guest list and entry", "How check-in, venue rules and re-entry will work."],
  ["guests", "Event format", "Who attends, what is included and how spaces are used."],
  ["calendar", "Venue timings", "The agreed arrival, finish and collection windows."],
  ["contact", "Named contacts", "The DebsGuru coordinator, venue contact and responsible adults."],
  ["route", "Transport home", "Travel arrangements, collection points and contact details."],
  ["dining", "Food and access", "Dietary, allergy, mobility and accessibility requirements."],
] as const;

const beforeEvent = [
  ["contact", "Save the contacts", "Keep the coordinator, venue and responsible adult details close."],
  ["route", "Share the journey", "Send the confirmed arrival and collection plan to guests."],
  ["dining", "Confirm requirements", "Submit dietary, allergy and access needs by the stated date."],
  ["camera", "Check photography", "Understand the photography arrangements for the selected event."],
] as const;

const parentsSchema = [
  breadcrumbSchema("Parents and schools", "/parents-schools"),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TY Ball event coordination",
    description: "Coordinated venue entry, timings, contacts, transport information and event requirements for TY Balls in Ireland.",
    provider: { "@id": "https://tyballs.ie/#organisation" },
    areaServed: { "@type": "Country", name: "Ireland" },
  },
];

export default function ParentsSchoolsPage() {
  return (
    <main id="main-content">
      <StructuredData data={parentsSchema} />
      <section className="guidance-hero shell">
        <div className="guidance-hero-copy">
          <p className="eyebrow">For parents and schools</p>
          <h1>Know the plan</h1>
          <p>See what should be clear before the event, then follow the confirmed information for the selected venue.</p>
          <Link className="button button-dark" href="/enquire">Ask a question</Link>
        </div>
        <figure>
          <video aria-label="Guests arriving at a real DebsGuru event" autoPlay loop muted playsInline poster={`${basePath}/images/tyballs-real-event-poster.jpg`} preload="metadata">
            <source src={`${basePath}/video/tyballs-real-event-vertical.mp4`} type="video/mp4" />
          </video>
        </figure>
      </section>

      <section className="guidance-confirm shell">
        <div className="guidance-heading"><p className="eyebrow">For the selected venue</p><h2>What to confirm</h2></div>
        <div className="guidance-card-grid">
          {confirmations.map(([icon, title, text]) => (
            <article key={title}><EventIcon name={icon} /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="guidance-before">
        <div className="shell guidance-before-grid">
          <div className="guidance-before-copy"><p className="eyebrow light">Before the event</p><h2>Keep it close</h2><p>Share the confirmed venue information with guests and responsible contacts before the night.</p></div>
          <div className="guidance-action-grid">
            {beforeEvent.map(([icon, title, text]) => (
              <article key={title}><EventIcon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta shell"><div><p className="eyebrow">Need something clarified</p><h2>Ask DebsGuru</h2></div><Link className="button button-dark" href="/enquire">Send your question</Link></section>
    </main>
  );
}
