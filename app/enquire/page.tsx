import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { EnquiryForm } from "./enquiry-form";

export const metadata = createPageMetadata({
  title: "Plan Your TY Ball in Ireland",
  description: "Start a TY Ball enquiry with your school, county, preferred date and guest estimate. DebsGuru will check the venue and event options that fit.",
  path: "/enquire",
  image: "/images/production-check.jpg",
  imageAlt: "An event coordinator preparing a TY Ball venue",
});

const enquirySchema = [
  breadcrumbSchema("Enquire", "/enquire"),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a TY Ball enquiry",
    url: "https://tyballs.ie/enquire",
    description: "Contact DebsGuru to start planning a TY Ball in Ireland.",
    isPartOf: { "@id": "https://tyballs.ie/#website" },
  },
];

export default function EnquirePage() {
  return (
    <main id="main-content">
      <StructuredData data={enquirySchema} />
      <section className="page-hero page-hero-with-media shell form-page-hero">
        <div className="page-hero-title"><p className="eyebrow">Start your enquiry</p><h1>Plan your TY Ball</h1></div>
        <p className="page-hero-description">Share the basics. DebsGuru will check what fits your date, location and guest estimate, then continue the conversation with you.</p>
        <figure className="page-hero-media"><EditorialImage alt="An event team managing a formal evening" height={768} name="production-check" width={1376} /></figure>
      </section>
      <div className="form-shell shell">
        <aside className="form-guide">
          <p className="eyebrow">Before you start</p>
          <h2>Have these ready</h2>
          <ul>
            <li><span aria-hidden="true">•</span><p><strong>School and county</strong>So the venue search starts in the right area.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Guest estimate</strong>A realistic rough number is enough for now.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Preferred date</strong>Include any flexibility the committee has.</p></li>
          </ul>
          <p className="form-guide-note">This starts a conversation. It does not reserve a date or create a booking.</p>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
