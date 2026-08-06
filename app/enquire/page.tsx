import { EnquiryHero } from "@/components/enquiry-hero";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { EnquiryForm } from "./enquiry-form";

export const metadata = createPageMetadata({
  title: "Booking Enquiry Form",
  description: "Send a TY Ball booking enquiry with your school, year size, preferred date, location and estimated attendance. The DebsGuru team will review the details.",
  path: "/enquire",
  image: "/images/drive-arrival.jpg",
  imageAlt: "Guests together at a real DebsGuru event",
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
    <main className="enquire-landing" id="main-content">
      <StructuredData data={enquirySchema} />
      <EnquiryHero />
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
              <p className="eyebrow">Before you start</p>
              <h2>Have these ready</h2>
            </div>
            <ul>
              <li><span aria-hidden="true" /><p><strong>School and location</strong>Include another school if you are joining together.</p></li>
              <li><span aria-hidden="true" /><p><strong>Year size</strong>This gives the team a better attendance estimate.</p></li>
              <li><span aria-hidden="true" /><p><strong>Date and venue area</strong>Your preferences give the team a clear starting point.</p></li>
            </ul>
            <p className="form-guide-note"><strong>No commitment yet.</strong> This enquiry starts a conversation and does not reserve a date.</p>
          </div>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
