import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { EnquiryForm } from "./enquiry-form";

export const metadata = createPageMetadata({
  title: "Booking Enquiry Form",
  description: "Send a TY Ball booking enquiry with your school, year size, preferred date, location and estimated attendance. The DebsGuru team will review the details.",
  path: "/enquire",
  image: "/images/real-friends.jpg",
  imageAlt: "Friends together at a DebsGuru formal event",
});

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

export default function EnquirePage() {
  return (
    <main id="main-content">
      <StructuredData data={enquirySchema} />
      <section className="page-hero page-hero-with-media shell form-page-hero">
        <div className="page-hero-title"><p className="eyebrow">Your event starts here</p><h1>Booking Enquiry Form</h1></div>
        <p className="page-hero-description">Share the details your coordinator needs to review the date, venue area and likely attendance.</p>
        <figure className="page-hero-media"><EditorialImage alt="Friends together at a DebsGuru formal event" height={1000} name="real-friends" width={667} /></figure>
      </section>
      <div className="form-shell shell">
        <aside className="form-guide">
          <p className="eyebrow">Before you start</p>
          <h2>Have these ready</h2>
          <ul>
            <li><span aria-hidden="true">•</span><p><strong>School and location</strong>Include another school if you are joining together.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Year size</strong>This helps estimate likely attendance more accurately.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Date and venue area</strong>Your preferences give the team a clear starting point.</p></li>
          </ul>
          <p className="form-guide-note">This starts a conversation. It does not reserve a date or create a booking.</p>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
