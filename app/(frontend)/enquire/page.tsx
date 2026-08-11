import { EnquiryHero } from "@/components/enquiry-hero";
import type { Metadata } from "next";
import { getPublishedPage } from "@/cms/frontend";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata, socialImageOrFallback } from "@/lib/seo";
import { EnquiryForm } from "./enquiry-form";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage("enquire");
  return createPageMetadata({
    title: content?.seo.title ?? "TY Ball Booking Enquiry Form",
    description: content?.seo.description ?? "Send a TY Ball booking enquiry with your school, year size, preferred date, county and estimated attendance. The DebsGuru team will review the details.",
    path: content?.seo.canonicalPath ?? "/enquire",
    image: socialImageOrFallback(content?.seo.image, "/og/enquire.jpg"),
    imageAlt: "Start a TY Ball booking enquiry with TYBalls.ie",
    noIndex: content?.seo.noIndex ?? false,
  });
}

const enquirySchema = [
  breadcrumbSchema("Enquire", "/enquire"),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "TY Ball Booking Enquiry Form",
    url: "https://tyballs.ie/enquire",
    description: "Contact DebsGuru to start planning a TY Ball in Ireland.",
    isPartOf: { "@id": "https://tyballs.ie/#website" },
  },
];

export default async function EnquirePage() {
  const content = await getPublishedPage("enquire");
  const guide = content?.sections.find((section) => section.key === "before-you-start");
  const guideItems = guide?.items?.length
    ? guide.items
    : [
        { title: "School and location", text: "Include another school if you are joining together." },
        { title: "Year size", text: "This gives the team a better attendance estimate." },
        { title: "Date and venue area", text: "Your preferences give the team a clear starting point." },
      ];

  return (
    <main className="enquire-landing" id="main-content">
      <StructuredData data={enquirySchema} />
      <EnquiryHero content={content?.hero} />
      <div className="form-shell shell">
        <aside className="form-sidebar">
          <nav className="form-section-nav" aria-label="Enquiry form sections">
            <p>Form navigation</p>
            <a href="#contact-details">Contact</a>
            <a href="#school-details">School</a>
            <a href="#event-details">Event</a>
            <a href="#final-details">Final details</a>
          </nav>
          <div className="form-guide">
            <div className="form-guide-heading">
              <p className="eyebrow">{guide?.eyebrow ?? "Before you start"}</p>
              <h2>{guide?.title ?? "Have these ready"}</h2>
            </div>
            <ul>
              {guideItems.map((item) => <li key={item.title}><span aria-hidden="true" /><p><strong>{item.title}</strong>{item.text}</p></li>)}
            </ul>
            <p className="form-guide-note"><strong>{content?.callToAction.eyebrow ?? "No commitment yet."}</strong> {content?.callToAction.text ?? "This enquiry starts a conversation and does not reserve a date."}</p>
          </div>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
