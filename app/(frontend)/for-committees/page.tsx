import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPage } from "@/cms/frontend";
import { CommitteeVisual } from "@/components/committee-visual";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata, socialImageOrFallback } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage("for-committees");
  return createPageMetadata({
    title: content?.seo.title ?? "TY Ball Planning for Student Committees",
    description: content?.seo.description ?? "A practical TY Ball planning checklist for student committees: the preferred date, county, guest estimate, priorities and committee contact needed to begin.",
    path: content?.seo.canonicalPath ?? "/for-committees",
    image: socialImageOrFallback(content?.seo.image, "/og/for-committees.jpg"),
    imageAlt: "TY Ball planning information for student committees",
    noIndex: content?.seo.noIndex ?? false,
  });
}

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

export default async function CommitteesPage() {
  const content = await getPublishedPage("for-committees");
  const checklistSection = content?.sections.find((section) => section.key === "checklist");
  const displayChecklist = checklistSection?.items?.length ? checklistSection.items.map((item) => [item.title, item.text] as const) : checklist;

  return (
    <main id="main-content">
      <StructuredData data={committeesSchema} />
      <section className="zip-section zip-shell zip-committee-layout">
        <div className="zip-committee-start">
          <p className="zip-eyebrow">{content?.hero.eyebrow ?? "For TY committees"}</p>
          <h1>{content?.hero.title ?? "Start with the basics"}</h1>
          <p>{content?.hero.intro ?? "You do not need every answer. Five useful details give DebsGuru enough to start shaping the event."}</p>
        </div>
        <div className="zip-committee-intro">
          <p className="zip-eyebrow">{checklistSection?.eyebrow ?? "Committee checklist"}</p>
          <h2>{checklistSection?.title ?? "Five things to share"}</h2>
          <p>{checklistSection?.text ?? "These basics keep the first conversation focused. DebsGuru can then check the venue, event arrangements and pricing that fit your group. Students book their own local transport suppliers; our team guides the committee on timings and locations."}</p>
        </div>
        <div className="zip-committee-media"><CommitteeVisual /></div>
        <div className="zip-numberless-list" id="committee-checklist">{displayChecklist.map(([title, text], index) => <article key={title}><span className={index === displayChecklist.length - 1 ? "is-active" : ""} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="zip-section zip-shell"><div className="zip-split-cta"><div><p className="zip-eyebrow">{content?.callToAction.eyebrow ?? "Ready to begin"}</p><h2>{content?.callToAction.title ?? "Booking Enquiry Form"}</h2></div><Link className="zip-button-fill" href={content?.callToAction.buttonLink ?? "/enquire"}>{content?.callToAction.buttonLabel ?? "Open the form"}</Link></div></section>
    </main>
  );
}
