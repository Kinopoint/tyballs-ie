import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPage } from "@/cms/frontend";
import { ParentHeroMedia } from "@/components/parent-hero-media";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage("parents-schools");
  return createPageMetadata({
    title: content?.seo.title ?? "TY Ball Information for Parents and Schools",
    description: content?.seo.description ?? "How TYBalls.ie and DebsGuru work with student committees on ticket sales, guest lists, event information, security, staffing and transport guidance.",
    path: content?.seo.canonicalPath ?? "/parents-schools",
    image: typeof content?.seo.image === "object" && content.seo.image?.url ? content.seo.image.url : "/og/parents-schools.jpg",
    imageAlt: "TY Ball information for parents and schools in Ireland",
    noIndex: content?.seo.noIndex ?? false,
  });
}

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
    url: "https://tyballs.ie/parents-schools",
    mainEntityOfPage: "https://tyballs.ie/parents-schools",
  },
];

export default async function ParentsSchoolsPage() {
  const content = await getPublishedPage("parents-schools");
  const communication = content?.sections.find((section) => section.key === "communication");
  const guidance = content?.sections.find((section) => section.key === "existing-event");
  const displayInformation = communication?.items?.length ? communication.items.map((item) => [item.title, item.text] as const) : committeeInformation;
  const guidanceItems = guidance?.items?.map((item) => item.text) ?? [
    "For any questions relating to your specific event, please contact your committee representative.",
    "In line with GDPR (General Data Protection Regulation), we can only discuss individual event details with the account holder, which is the committee.",
  ];

  return (
    <main id="main-content">
      <StructuredData data={parentsSchema} />
      <section className="zip-inner-hero zip-shell zip-media-hero zip-parent-hero">
        <div className="zip-inner-copy">
          <p className="zip-eyebrow">{content?.hero.eyebrow ?? "For parents and schools"}</p>
          <h1>{content?.hero.title ?? "Trusted experience"}</h1>
          <p>{content?.hero.intro ?? "TYBalls.ie is from the team at DebsGuru.ie. Over 10 years of experience and thousands of students impressed."}</p>
          <Link className="zip-button-accent" href="/enquire">Booking Enquiry Form</Link>
        </div>
        <ParentHeroMedia />
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-section-heading">
          <div><p className="zip-eyebrow">{communication?.eyebrow ?? "How communication works"}</p><h2>{communication?.title ?? "Committee-led"}</h2></div>
          <p>{communication?.text ?? "DebsGuru works directly with Debs and TY Ball committees and provides them with all the information required for each event."}</p>
        </div>
        <div className="zip-factor-grid zip-parent-information-grid">
          {displayInformation.map(([title, text]) => (
            <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="zip-section zip-shell zip-parent-contact-guidance">
        <div>
          <p className="zip-eyebrow">{guidance?.eyebrow ?? "Questions about an existing event"}</p>
          <h2>{guidance?.title ?? "Your committee contact"}</h2>
        </div>
        <div className="zip-parent-guidance-copy">
          {guidanceItems.map((item) => <p key={item}>{item}</p>)}
          <div className="zip-parent-guidance-actions">
            <Link className="zip-button-fill" href={content?.callToAction.buttonLink ?? "/enquire"}>{content?.callToAction.buttonLabel ?? "New booking enquiry"}</Link>
            <a className="zip-button-outline" href="mailto:info@debsguru.ie">Email info@debsguru.ie</a>
          </div>
        </div>
      </section>
    </main>
  );
}
