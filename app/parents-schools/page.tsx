import type { Metadata } from "next";
import Link from "next/link";

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
      <section className="page-hero shell"><p className="eyebrow">For parents and schools</p><h1>Clear information before commitment.</h1><p>Every venue and event is different. The important details should be confirmed for the actual proposal rather than assumed from a generic package.</p></section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">What should be clarified</p><h2>Practical questions deserve specific answers.</h2><p>The final arrangements and booking terms are supplied when the date, venue and proposal are confirmed. These are the areas a committee, parent or school should expect to understand.</p></div>
        <div className="topic-grid">{topics.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Planning a TY Ball?</p><h2>Ask the team directly.</h2></div><Link className="button button-dark" href="/enquire">Make an enquiry <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
