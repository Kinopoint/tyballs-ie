import Link from "next/link";
import type { Metadata } from "next";
import { EditorialImage } from "@/components/editorial-image";
import { EventIcon } from "@/components/event-icon";
import { ExperienceCategories } from "@/components/experience-categories";
import { HomeHero } from "@/components/home-hero";
import { StructuredData } from "@/components/structured-data";
import { getHomePageContent, getPublishedFaqs } from "@/cms/frontend";
import { createPageMetadata } from "@/lib/seo";
import { CmsMedia } from "@/components/cms-media";

const highlights = [
  ["venue", "Venue search", "Matched to your county, date and guest estimate"],
  ["contact", "One coordinator", "One contact from first conversation to the night"],
  ["shield", "A managed event", "Security, DebsGuru staff and hotel staff included"],
] as const;

const steps = [
  ["Share the basics", "School, county, date and estimated attendance."],
  ["Review the plan", "See the venue, inclusions and pricing together."],
  ["Enjoy the night", "Your coordinator keeps the agreed plan moving."],
] as const;

const safety = ["Security is included in every booking", "DebsGuru and hotel staff run the event", "Parents are welcome to attend"] as const;

const questions = [
  ["Do we need final guest numbers?", "No. Start with a realistic estimate and confirm the final number later."],
  ["Who coordinates the event?", "A named DebsGuru coordinator works with the committee, venue and event team."],
  ["Is security included?", "Yes. Security is included in every event booking, with DebsGuru staff and hotel staff running the event."],
  ["Does DebsGuru arrange transport?", "No. Students book their own local transport suppliers. DebsGuru guides the committee on timings, locations and the practical arrangements to share with those suppliers."],
  ["Can dietary and access needs be planned?", "Yes. Share them early so the selected venue can confirm the arrangements."],
  ["Does an enquiry reserve the date?", "No. A date is secured only after availability, pricing and booking terms are agreed."],
] as const;

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TY Ball planning in Ireland",
    description: "Venue, food, entertainment, security and staffed event coordination for Transition Year balls across Ireland.",
    provider: { "@id": "https://tyballs.ie/#organisation" },
    areaServed: { "@type": "Country", name: "Ireland" },
    serviceType: "TY Ball event planning",
    url: "https://tyballs.ie/",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomePageContent();
  return createPageMetadata({
    title: content?.seo.title ?? "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru",
    description: content?.seo.description ?? "Plan a TY Ball in Ireland with venue sourcing, food, entertainment, security and staffed event coordination from the team behind DebsGuru.ie.",
    path: content?.seo.canonicalPath ?? "/",
    image: typeof content?.seo.image === "object" && content.seo.image?.url ? content.seo.image.url : "/og/home.jpg",
    imageAlt: "TYBalls.ie event planning by the DebsGuru team",
    noIndex: content?.seo.noIndex ?? false,
  });
}

export default async function Home() {
  const [content, cmsFaqs] = await Promise.all([getHomePageContent(), getPublishedFaqs("home")]);
  const displayHighlights = content?.highlights?.length
    ? content.highlights.map((item) => [item.icon, item.title, item.text] as const)
    : highlights;
  const displaySteps = content?.steps?.length
    ? content.steps.map((item) => [item.title, item.text] as const)
    : steps;
  const displaySafety = content?.parentGuidance.points?.length
    ? content.parentGuidance.points.map((item) => item.text)
    : safety;
  const displayQuestions = cmsFaqs.length
    ? cmsFaqs.map((item) => [item.question, item.answer] as const)
    : questions;
  const schema = [
    homeSchema[0],
    {
      ...homeSchema[1],
      mainEntity: displayQuestions.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <main id="main-content">
      <StructuredData data={schema} />
      <HomeHero content={content?.hero} />

      <section className="zip-section zip-highlights zip-shell" aria-label="Why plan with DebsGuru">
        {displayHighlights.map(([icon, title, text]) => (
          <article key={title}><span className="zip-highlight-mark" aria-hidden="true"><EventIcon name={icon} /></span><h2>{title}</h2><p>{text}</p></article>
        ))}
      </section>

      <ExperienceCategories content={content?.experience} />

      <section className="zip-section zip-shell">
        <div className="zip-coordinator zip-coordinator-banner">
          <div className="zip-coordinator-copy">
            <p className="zip-eyebrow">{content?.proof.eyebrow ?? "Proven experience"}</p>
            <h2>{content?.proof.title ?? "Over 10 years."}</h2>
            <p>{content?.proof.text ?? "TYBalls.ie is brought to you by the team behind DebsGuru.ie, with thousands of students enjoying our events across Ireland."}</p>
            <div className="zip-tags"><span>10+ years</span><span>Thousands of students</span></div>
            <Link className="zip-button-accent" href="/how-it-works">How it works</Link>
          </div>
          <div className="zip-coordinator-gallery" aria-label="Real DebsGuru event moments">
            {typeof content?.proof.gallery === "object" && content.proof.gallery?.items?.length
              ? content.proof.gallery.items.map((item) => <picture key={typeof item.media === "object" ? item.media.id : item.media}><CmsMedia media={item.media} /></picture>)
              : <>
                  <EditorialImage alt="Friends arriving together at a DebsGuru event" height={1367} name="drive-arrival" width={1000} />
                  <EditorialImage alt="Students enjoying dinner at a DebsGuru event" height={1500} name="drive-dinner" width={1000} />
                  <EditorialImage alt="Students using the photo booth" height={1500} name="drive-photobooth" width={1000} />
                  <EditorialImage alt="Friends dancing together at a DebsGuru event" height={1500} name="drive-dance" width={1000} />
                  <EditorialImage alt="Friends posing together at the photo booth" height={1500} name="drive-group" width={1000} />
                  <EditorialImage alt="Students gathering at an event venue" height={1500} name="drive-garden" width={1000} />
                </>}
          </div>
        </div>
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-section-heading"><div><p className="zip-eyebrow">A simple start</p><h2>Three steps. One plan.</h2></div></div>
        <div className="zip-step-grid">
          {displaySteps.map(([title, text]) => <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <Link className="zip-button-outline zip-section-button" href="/enquire">Booking Enquiry Form</Link>
      </section>

      <section className="zip-section zip-shell zip-parent-teaser">
        <div><p className="zip-eyebrow">{content?.parentGuidance.eyebrow ?? "For parents and schools"}</p><h2>{content?.parentGuidance.title ?? "Clear for everyone."}</h2><Link className="zip-button-accent" href="/parents-schools">See the event guidance</Link></div>
        <div className="zip-simple-list">{displaySafety.map((item) => <p key={item}><span aria-hidden="true" />{item}</p>)}</div>
      </section>

      <section className="zip-section zip-shell zip-faq">
        <div><p className="zip-eyebrow">Quick answers</p><h2>Good to know.</h2></div>
        <div className="zip-faq-list">{displayQuestions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-final-cta">
          <p className="zip-eyebrow">{content?.finalCallToAction.eyebrow ?? "Start with the basics"}</p>
          <h2>{content?.finalCallToAction.title ?? "Booking Enquiry Form"}</h2>
          <p>{content?.finalCallToAction.text ?? "Sending an enquiry does not reserve a date or create a booking."}</p>
          <Link className="zip-button-fill" href={content?.finalCallToAction.buttonLink ?? "/enquire"}>{content?.finalCallToAction.buttonLabel ?? "Open the form"}</Link>
        </div>
      </section>
    </main>
  );
}
