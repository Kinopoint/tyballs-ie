import Link from "next/link";
import { DesignPlaceholder } from "@/components/design-placeholder";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Guidance for Parents & Schools",
  description: "Clear TY Ball guidance for parents and schools covering venue entry, timings, named contacts, transport, dietary needs and accessibility.",
  path: "/parents-schools",
  image: "/images/tyballs-real-event-poster.jpg",
  imageAlt: "Guests arriving at a real DebsGuru event",
});

const confirmations = [
  ["Guest list and entry", "How check-in, venue rules and re-entry will work."],
  ["Event format", "Who attends, what is included and how spaces are used."],
  ["Venue timings", "The agreed arrival, finish and collection windows."],
  ["Named contacts", "The DebsGuru coordinator, venue contact and responsible adults."],
  ["Transport home", "Travel arrangements, collection points and contact details."],
  ["Food and access", "Dietary, allergy, mobility and accessibility requirements."],
] as const;

const beforeEvent = [
  ["Save the contacts", "Keep the coordinator, venue and responsible adult details close."],
  ["Share the journey", "Send the confirmed arrival and collection plan to guests."],
  ["Confirm requirements", "Submit dietary, allergy and access needs by the stated date."],
  ["Check photography", "Understand the photography arrangements for the selected event."],
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
      <section className="zip-inner-hero zip-shell zip-media-hero zip-parent-hero">
        <div className="zip-inner-copy">
          <p className="zip-eyebrow">For parents and schools</p>
          <h1>Know the plan</h1>
          <p>See what should be clear before the event, then follow the confirmed information for the selected venue.</p>
          <Link className="zip-button-accent" href="/enquire">Ask a question</Link>
        </div>
        <div className="zip-parent-placeholder"><DesignPlaceholder label="Arrival · portrait 9:16" /></div>
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-section-heading"><div><p className="zip-eyebrow">For the selected venue</p><h2>What to confirm</h2></div></div>
        <div className="zip-factor-grid">
          {confirmations.map(([title, text]) => (
            <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="zip-section zip-shell zip-before-grid">
          <div><p className="zip-eyebrow">Before the event</p><h2>Keep it close</h2><p>Share the confirmed venue information with guests and responsible contacts before the night.</p></div>
          <div className="zip-action-list">
            {beforeEvent.map(([title, text]) => (
              <article key={title}><span aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
      </section>

      <section className="zip-section zip-shell"><div className="zip-soft-cta"><div><p className="zip-eyebrow">Need something clarified</p><h2>Ask DebsGuru</h2></div><Link className="zip-button-fill" href="/enquire">Send your question</Link></div></section>
    </main>
  );
}
