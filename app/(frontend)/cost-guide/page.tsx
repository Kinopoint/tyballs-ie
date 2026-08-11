import { CostGuideMotion } from "@/components/cost-guide-motion";
import type { Metadata } from "next";
import { getPublishedPage } from "@/cms/frontend";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata, socialImageOrFallback } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage("cost-guide");
  return createPageMetadata({
    title: content?.seo.title ?? "TY Ball Cost Guide Ireland",
    description: content?.seo.description ?? "Understand what shapes TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, security and event staffing.",
    path: content?.seo.canonicalPath ?? "/cost-guide",
    image: socialImageOrFallback(content?.seo.image, "/og/cost-guide.jpg"),
    imageAlt: "TY Ball cost guide for events in Ireland",
    noIndex: content?.seo.noIndex ?? false,
  });
}

const costGuideSchema = [
  breadcrumbSchema("Cost guide", "/cost-guide"),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TY Ball Cost Guide Ireland",
    url: "https://tyballs.ie/cost-guide",
    description: "The main factors that shape a TY Ball proposal in Ireland.",
    about: { "@type": "Service", name: "TY Ball event planning" },
    isPartOf: { "@id": "https://tyballs.ie/#website" },
  },
];

export default async function CostGuidePage() {
  const content = await getPublishedPage("cost-guide");
  return (
    <main className="cost-landing" id="main-content">
      <StructuredData data={costGuideSchema} />
      <CostGuideMotion content={content ?? undefined} />
    </main>
  );
}
