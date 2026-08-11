import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPage } from "@/cms/frontend";
import { HowItWorksHero } from "@/components/how-it-works-hero";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata, socialImageOrFallback } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage("how-it-works");
  return createPageMetadata({
    title: content?.seo.title ?? "How to Plan a TY Ball in Ireland",
    description: content?.seo.description ?? "See the four steps from a TY Ball enquiry to a confirmed event: share your school and date, review suitable arrangements, check the proposal and confirm.",
    path: content?.seo.canonicalPath ?? "/how-it-works",
    image: socialImageOrFallback(content?.seo.image, "/og/how-it-works.jpg"),
    imageAlt: "How TY Ball planning works with TYBalls.ie and DebsGuru",
    noIndex: content?.seo.noIndex ?? false,
  });
}

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

export default async function HowItWorksPage() {
  const content = await getPublishedPage("how-it-works");
  const stagesSection = content?.sections.find((section) => section.key === "stages");
  const displayStages = stagesSection?.items?.length ? stagesSection.items : stages;
  const schema = [
    breadcrumbSchema("How it works", "/how-it-works"),
    {
      ...howItWorksSchema[1],
      step: displayStages.map((stage, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: stage.title,
        text: stage.text,
        url: `https://tyballs.ie/how-it-works#step-${index + 1}`,
      })),
    },
  ];

  return (
    <main id="main-content">
      <StructuredData data={schema} />
      <HowItWorksHero content={content?.hero} />
      <section className="zip-section zip-shell zip-stage-list">
        {displayStages.map((stage, index) => (
          <article id={`step-${index + 1}`} key={stage.title}>
            <div><h2>{stage.title}</h2></div>
            <p>{stage.text}</p>
          </article>
        ))}
      </section>
      <section className="zip-section zip-shell"><div className="zip-split-cta"><div><p className="zip-eyebrow">{content?.callToAction.eyebrow ?? "Ready to begin"}</p><h2>{content?.callToAction.title ?? "Booking Enquiry Form"}</h2></div><Link className="zip-button-fill" href={content?.callToAction.buttonLink ?? "/enquire"}>{content?.callToAction.buttonLabel ?? "Open the form"}</Link></div></section>
    </main>
  );
}
