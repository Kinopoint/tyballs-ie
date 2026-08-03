import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Planning for School Committees",
  description: "A practical TY Ball planning checklist for school committees: the date, county, guest estimate, priorities and contact needed to start an enquiry.",
  path: "/for-committees",
  image: "/images/planning-session.jpg",
  imageAlt: "Event coordinators reviewing a TY Ball plan",
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
      <section className="page-hero page-hero-with-media shell">
        <div className="page-hero-title"><p className="eyebrow">For TY committees</p><h1>Start with the basics</h1></div>
        <p className="page-hero-description">You do not need every answer. Five useful details give DebsGuru enough to start shaping the event.</p>
        <figure className="page-hero-media"><EditorialImage alt="Adult event coordinators reviewing a venue plan" height={768} name="planning-session" width={1376} /></figure>
      </section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Committee checklist</p><h2>Five things to share</h2><p>These basics keep the first conversation focused. DebsGuru can then check the venue, event arrangements and pricing that fit your group.</p></div>
        <div className="editorial-list">{checklist.map(([title, text]) => <article key={title}><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Ready to begin</p><h2>Booking Enquiry Form</h2></div><Link className="button button-dark" href="/enquire">Open the form</Link></section>
    </main>
  );
}
