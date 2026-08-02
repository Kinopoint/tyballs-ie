import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";

export const metadata: Metadata = {
  title: "TY Ball Information for Parents and Schools",
  description: "Understand what should be confirmed before a TY Ball booking, including venue rules, timings, transport, accessibility and event terms.",
  alternates: { canonical: "/parents-schools" },
};

const topics = [
  ["Event format", "Whether the event is private to one school or involves other groups, and which spaces are shared."],
  ["Venue rules and timings", "Arrival, finish time, entry requirements and the venue’s policy on leaving or re-entering."],
  ["Supervision and support", "The responsible event contacts and the security, first-aid or medical arrangements applicable to that venue."],
  ["Transport", "Whether transport is included, optional or organised separately, with collection points and responsible contacts confirmed in writing."],
  ["Food and accessibility", "How dietary needs, allergies and accessibility requirements should be communicated before the event."],
  ["Booking conditions", "What happens if the date, venue or attendance changes, and which cancellation terms apply to the confirmed proposal."],
] as const;

export default function ParentsSchoolsPage() {
  return (
    <main id="main-content">
      <section className="page-hero shell"><p className="eyebrow">For parents and schools</p><h1>Questions to ask before a TY Ball is booked</h1><p>Arrangements vary by venue and proposal. Parents, schools and committees should confirm the relevant details in writing.</p></section>
      <figure className="editorial-visual shell">
        <EditorialImage
          alt="A calm venue entrance prepared before an event"
          height={768}
          name="venue-arrival"
          width={1376}
        />
      </figure>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Before confirmation</p><h2>Check the arrangements for the actual venue</h2><p>Final arrangements and booking terms are supplied when the date, venue and proposal are confirmed. These are the main subjects to check.</p></div>
        <div className="topic-grid">{topics.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Questions about an event</p><h2>Contact DebsGuru through the enquiry form</h2></div><Link className="button button-dark" href="/enquire">Open the enquiry form</Link></section>
    </main>
  );
}
