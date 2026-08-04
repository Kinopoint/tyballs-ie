import Link from "next/link";
import { DesignPlaceholder } from "@/components/design-placeholder";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Planning for School Committees",
  description: "A practical TY Ball planning checklist for school committees: the date, county, guest estimate, priorities and contact needed to start an enquiry.",
  path: "/for-committees",
  image: "/images/drive-garden.jpg",
  imageAlt: "Guests talking together at a real DebsGuru event",
});

const checklist = [
  ["A preferred date", "Share your first choice and any flexibility. Nearby dates can open more suitable venue options."],
  ["A realistic guest estimate", "A rough number is enough to begin. The final guest list can follow later."],
  ["The school and county", "Location helps DebsGuru focus on venues and travel arrangements that make practical sense."],
  ["The committee’s priorities", "Tell us what matters most, whether that is the venue, dinner, music, photography or something else."],
  ["One committee contact", "One named contact keeps decisions, questions and updates clear for everyone involved."],
] as const;

const committeesSchema = breadcrumbSchema("For committees", "/for-committees");

export default function CommitteesPage() {
  return (
    <main id="main-content">
      <StructuredData data={committeesSchema} />
      <section className="zip-plain-hero zip-shell">
        <p className="zip-eyebrow">For TY committees</p>
        <h1>Start with the basics</h1>
        <p>You do not need every answer. Five useful details give DebsGuru enough to start shaping the event.</p>
      </section>
      <section className="zip-section zip-shell zip-committee-grid">
        <div className="zip-committee-intro"><p className="zip-eyebrow">Committee checklist</p><h2>Five things to share</h2><p>These basics keep the first conversation focused. DebsGuru can then check the venue, event arrangements and pricing that fit your group.</p><div className="zip-committee-media"><DesignPlaceholder label="Venue garden · wide crop" /></div></div>
        <div className="zip-numberless-list">{checklist.map(([title, text], index) => <article key={title}><span className={index === checklist.length - 1 ? "is-active" : ""} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="zip-section zip-shell"><div className="zip-split-cta"><div><p className="zip-eyebrow">Ready to begin</p><h2>Booking Enquiry Form</h2></div><Link className="zip-button-fill" href="/enquire">Open the form</Link></div></section>
    </main>
  );
}
