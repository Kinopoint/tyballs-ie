import { CostGuideMotion } from "@/components/cost-guide-motion";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Cost Guide Ireland",
  description: "Understand what affects TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, security and event staffing.",
  path: "/cost-guide",
  image: "/images/drive-garden.jpg",
  imageAlt: "Guests together at a real DebsGuru event venue",
});

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

export default function CostGuidePage() {
  return (
    <main className="cost-landing" id="main-content">
      <StructuredData data={costGuideSchema} />
      <CostGuideMotion />
    </main>
  );
}
