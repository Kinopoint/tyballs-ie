import Link from "next/link";
import { DesignPlaceholder } from "@/components/design-placeholder";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Planning for Student Committees",
  description: "A practical TY Ball planning checklist for student committees: the preferred date, county, guest estimate, priorities and committee contact needed to begin.",
  path: "/for-committees",
  image: "/og/for-committees.jpg",
  imageAlt: "TY Ball planning information for student committees",
});

const checklist = [
  ["A preferred date", "Share your first choice and any flexibility. Nearby dates can open more suitable venue options."],
  ["A realistic guest estimate", "A rough number is enough to begin. The final guest list can follow later."],
  ["The school and county", "Location helps DebsGuru focus on suitable venues and practical event timings."],
  ["The committee’s priorities", "Tell us what matters most, whether that is the venue, dinner, music, photography or something else."],
  ["One committee contact", "One named contact keeps decisions, questions and updates clear for everyone involved."],
] as const;

const committeesSchema = [
  breadcrumbSchema("For committees", "/for-committees"),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TY Ball Planning for Student Committees",
    url: "https://tyballs.ie/for-committees",
    description: "The details a student committee needs to share when starting a TY Ball enquiry in Ireland.",
    isPartOf: { "@id": "https://tyballs.ie/#website" },
    about: { "@type": "Service", name: "TY Ball event planning" },
  },
];

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
        <div className="zip-committee-intro"><p className="zip-eyebrow">Committee checklist</p><h2>Five things to share</h2><p>These basics keep the first conversation focused. DebsGuru can then check the venue, event arrangements and pricing that fit your group. Students book their own local transport suppliers; our team guides the committee on timings and locations.</p><div className="zip-committee-media"><DesignPlaceholder label="Venue garden · wide crop" /></div></div>
        <div className="zip-numberless-list">{checklist.map(([title, text], index) => <article key={title}><span className={index === checklist.length - 1 ? "is-active" : ""} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="zip-section zip-shell"><div className="zip-split-cta"><div><p className="zip-eyebrow">Ready to begin</p><h2>Booking Enquiry Form</h2></div><Link className="zip-button-fill" href="/enquire">Open the form</Link></div></section>
    </main>
  );
}
