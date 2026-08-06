import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "TY Ball Information for Parents & Schools",
  description: "How TYBalls.ie and DebsGuru work directly with student committees, including ticket sales, guest lists, event information and enquiries.",
  path: "/parents-schools",
  image: "/images/drive-arrival.jpg",
  imageAlt: "Students attending a real DebsGuru event in Ireland",
});

const committeeInformation = [
  ["Direct committee contact", "The student committee works directly with our team."],
  ["Tickets and guest list", "The student committee manages ticket sales and sends us the guest list for entry."],
  ["Event information", "We provide the committee with the event timings and all other necessary information, which they share with everyone attending."],
  ["Security and staffing", "Security is included in every booking. DebsGuru staff and hotel staff run the event."],
  ["Transport guidance", "Students book their own local transport suppliers. We guide the committee on timings and locations."],
  ["Parents are welcome", "Parents are welcome to attend the event."],
  ["New enquiries", "Please complete the Booking Enquiry Form on this website."],
  ["Other enquiries", "Please email info@debsguru.ie."],
] as const;

const parentsSchema = [
  breadcrumbSchema("Parents and schools", "/parents-schools"),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TY Ball event coordination",
    description: "TYBalls.ie and DebsGuru work directly with student committees to coordinate ticketing information, guest lists, timings, security, staffing and event communications.",
    provider: { "@id": "https://tyballs.ie/#organisation" },
    areaServed: { "@type": "Country", name: "Ireland" },
  },
];

export default function ParentsSchoolsPage() {
  return (
    <main id="main-content">
      <StructuredData data={parentsSchema} />
      <section className="zip-inner-hero zip-shell zip-media-hero zip-parent-hero">
        <div className="zip-inner-copy">
          <p className="zip-eyebrow">For parents and schools</p>
          <h1>Trusted experience</h1>
          <p>TYBalls.ie is from the team at DebsGuru.ie. Over 10 years of experience and thousands of students impressed.</p>
          <Link className="zip-button-accent" href="/enquire">Booking Enquiry Form</Link>
        </div>
        <EditorialImage alt="Students attending a real DebsGuru event" className="zip-parent-placeholder" height={1367} name="drive-arrival" priority width={1000} />
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-section-heading">
          <div><p className="zip-eyebrow">How communication works</p><h2>Committee-led</h2></div>
          <p>DebsGuru works directly with Debs and TY Ball committees and provides them with all the information required for each event.</p>
        </div>
        <div className="zip-factor-grid zip-parent-information-grid">
          {committeeInformation.map(([title, text]) => (
            <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="zip-section zip-shell zip-parent-contact-guidance">
        <div>
          <p className="zip-eyebrow">Questions about an existing event</p>
          <h2>Your committee contact</h2>
        </div>
        <div className="zip-parent-guidance-copy">
          <p>For any questions relating to your specific event, please contact your committee representative.</p>
          <p>In line with GDPR (General Data Protection Regulation), we can only discuss individual event details with the account holder, which is the committee.</p>
          <div className="zip-parent-guidance-actions">
            <Link className="zip-button-fill" href="/enquire">New booking enquiry</Link>
            <a className="zip-button-outline" href="mailto:info@debsguru.ie">Email info@debsguru.ie</a>
          </div>
        </div>
      </section>
    </main>
  );
}
