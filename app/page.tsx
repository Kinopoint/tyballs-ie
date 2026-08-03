import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { EventIcon } from "@/components/event-icon";
import { HomeHero } from "@/components/home-hero";
import { StructuredData } from "@/components/structured-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const highlights = [
  ["venue", "Venue search", "Matched to your county, date and guest estimate"],
  ["contact", "One coordinator", "One contact from first conversation to the night"],
  ["shield", "A managed event", "Arrival, timings and key contacts clearly planned"],
] as const;

const experiences = [
  ["real-couple", "venue", "A venue that fits", "Date, location, capacity and travel considered together."],
  ["real-dresses", "dining", "A proper occasion", "Dinner, service and dietary requirements coordinated."],
  ["real-dancefloor", "music", "A dancefloor ready", "DJ, lighting and the running order brought together."],
  ["real-friends", "camera", "Moments to keep", "Photography, photobooth and awards can be included."],
] as const;

const steps = [
  ["calendar", "Share the basics", "School, county, date and estimated attendance."],
  ["venue", "Review the plan", "See the venue, inclusions and pricing together."],
  ["spark", "Enjoy the night", "Your coordinator keeps the agreed plan moving."],
] as const;

const safety = [
  ["shield", "Guest list and venue entry plan"],
  ["contact", "Named adult contacts"],
  ["route", "Clear arrival and collection"],
] as const;

const questions = [
  ["Do we need final guest numbers?", "No. Start with a realistic estimate and confirm the final number later."],
  ["Who coordinates the event?", "A named DebsGuru coordinator works with the committee, venue and event team."],
  ["Can dietary and access needs be planned?", "Yes. Share them early so the selected venue can confirm the arrangements."],
  ["Does an enquiry reserve the date?", "No. A date is secured only after availability, pricing and booking terms are agreed."],
] as const;

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TY Ball planning in Ireland",
    description: "Venue, food, entertainment and event coordination for Transition Year balls across Ireland.",
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

export default function Home() {
  return (
    <main id="main-content">
      <StructuredData data={homeSchema} />
      <HomeHero />

      <section className="visual-highlights shell" aria-label="Why plan with DebsGuru">
        {highlights.map(([icon, title, text]) => <article key={title}><EventIcon name={icon} /><div><h2>{title}</h2><p>{text}</p></div></article>)}
      </section>

      <section className="visual-experience shell" id="experience">
        <div className="visual-section-heading">
          <div><p className="eyebrow">Your night</p><h2>Everything in its place.</h2></div>
          <Link className="button button-dark" href="/enquire">Booking Enquiry Form</Link>
        </div>
        <div className="experience-gallery">
          {experiences.map(([image, icon, title, text]) => (
            <article key={title}>
              <EditorialImage alt={`Guests at a DebsGuru formal event: ${title.toLowerCase()}`} height={1000} name={image} width={667} />
              <div className="experience-caption"><EventIcon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-story">
        <div className="shell visual-story-grid">
          <figure><EditorialImage alt="An adult event coordinator guiding committee representatives through a venue" height={768} name="planning-session" width={1376} /></figure>
          <div className="visual-story-copy">
            <p className="eyebrow light">DebsGuru</p>
            <h2>One coordinator.</h2>
            <p>Your coordinator connects the committee, venue and event team, so decisions and updates stay in one place.</p>
            <div className="visual-facts"><strong>10+ years</strong><span>Across Ireland</span></div>
            <Link className="button" href="/how-it-works">How it works</Link>
          </div>
        </div>
      </section>

      <section className="visual-process shell">
        <div className="visual-section-heading"><div><p className="eyebrow">A simple start</p><h2>Three steps. One plan.</h2></div></div>
        <div className="visual-step-grid">
          {steps.map(([icon, title, text]) => <article key={title}><EventIcon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <Link className="button button-dark" href="/enquire">Booking Enquiry Form</Link>
      </section>

      <section className="visual-safety shell">
        <div className="visual-safety-copy">
          <p className="eyebrow">For parents and schools</p>
          <h2>Clear for everyone.</h2>
          <div className="safety-icon-list">{safety.map(([icon, title]) => <div key={title}><EventIcon name={icon} /><strong>{title}</strong></div>)}</div>
          <Link className="button button-dark" href="/parents-schools">See the event guidance</Link>
        </div>
        <figure><video aria-label="Students arriving for a supervised TY Ball check-in" autoPlay loop muted playsInline poster={`${basePath}/images/school-arrival.jpg`} preload="metadata"><source src={`${basePath}/video/tyball-school-arrival-loop.mp4`} type="video/mp4" /></video></figure>
      </section>

      <section className="visual-faq">
        <div className="shell faq-grid">
          <div className="section-heading"><p className="eyebrow light">Quick answers</p><h2>Good to know.</h2></div>
          <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="visual-final-cta shell">
        <EventIcon name="calendar" />
        <div><p className="eyebrow">Start with the basics</p><h2>Booking Enquiry Form</h2></div>
        <Link className="button button-dark" href="/enquire">Open the form</Link>
      </section>
    </main>
  );
}
