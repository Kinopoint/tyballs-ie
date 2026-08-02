import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "How TY Ball Planning Works",
  description: "See how DebsGuru turns a date, location and guest estimate into a coordinated TY Ball plan, from the first enquiry to the confirmed event.",
  path: "/how-it-works",
  image: "/images/planning-session.jpg",
  imageAlt: "Event coordinators reviewing a TY Ball venue plan",
});

const stages = [
  {
    title: "Share the starting point",
    text: "Send the school, county, preferred date and a realistic guest estimate. You do not need a final list to begin.",
  },
  {
    title: "We check what fits",
    text: "DebsGuru reviews suitable venues and event arrangements for the date, location and expected attendance.",
  },
  {
    title: "Review one clear proposal",
    text: "The committee sees the available venue, inclusions, practical requirements and pricing together before deciding.",
  },
  {
    title: "Confirm the event",
    text: "The date is secured only after availability, pricing and the booking terms have been agreed with DebsGuru.",
  },
] as const;

const howItWorksSchema = [
  breadcrumbSchema("How it works", "/how-it-works"),
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to plan a TY Ball with DebsGuru",
    description: "The four stages from a TY Ball enquiry to a confirmed event.",
    step: stages.map((stage, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: stage.title,
      text: stage.text,
      url: `https://tyballs.ie/how-it-works#step-${index + 1}`,
    })),
  },
];

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <StructuredData data={howItWorksSchema} />
      <section className="page-hero page-hero-with-media shell">
        <div className="page-hero-title"><p className="eyebrow">How it works</p><h1>From enquiry to event</h1></div>
        <p className="page-hero-description">Start with a date, location and guest estimate. DebsGuru turns them into a plan the committee can review with confidence.</p>
        <figure className="page-hero-media"><EditorialImage alt="Adult event coordinators reviewing a venue plan" height={768} name="planning-session" width={1376} /></figure>
      </section>
      <section className="stage-list shell">
        {stages.map((stage, index) => (
          <article id={`step-${index + 1}`} key={stage.title}>
            <h2>{stage.title}</h2>
            <p>{stage.text}</p>
          </article>
        ))}
      </section>
      <section className="page-cta shell">
        <div><p className="eyebrow">Ready to begin</p><h2>Check your date</h2></div>
        <Link className="button button-dark" href="/enquire">Start your enquiry</Link>
      </section>
    </main>
  );
}
