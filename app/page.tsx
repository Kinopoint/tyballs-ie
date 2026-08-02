import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { EventIcon } from "@/components/event-icon";
import { HomeHero } from "@/components/home-hero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const highlights = [
  ["venue", "Venue search", "Matched to your county and numbers"],
  ["contact", "One coordinator", "From first chat to the event"],
  ["shield", "Managed TY event", "Clear adult support on the night"],
] as const;

const experiences = [
  ["planning-session", "venue", "The right setting", "Venue, date and travel checked together."],
  ["table-service", "dining", "Dinner made social", "Food, service and dietary needs coordinated."],
  ["production-check", "music", "A proper dancefloor", "DJ, lighting and the running order handled."],
  ["event-hall", "camera", "Moments worth keeping", "Photography, photobooth and awards options."],
] as const;

const steps = [
  ["calendar", "Send your date", "School, county and guest estimate."],
  ["venue", "See the options", "DebsGuru checks what fits."],
  ["spark", "Enjoy the night", "Your coordinator runs the plan."],
] as const;

const safety = [
  ["shield", "Guest list and venue entry plan"],
  ["contact", "Named adult contacts"],
  ["route", "Clear arrival and collection"],
] as const;

const questions = [
  ["Do we need final guest numbers?", "No. A realistic estimate is enough to begin."],
  ["Who supports the event on the night?", "A named coordinator works with the venue and responsible adult contacts."],
  ["Can dietary and access needs be included?", "Yes. Tell the team early so the venue can confirm arrangements."],
  ["Does an enquiry reserve the date?", "No. The date is secured only when the booking terms are agreed."],
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <HomeHero />

      <section className="visual-highlights shell" aria-label="Why plan with DebsGuru">
        {highlights.map(([icon, title, text]) => <article key={title}><EventIcon name={icon} /><div><h2>{title}</h2><p>{text}</p></div></article>)}
      </section>

      <section className="visual-experience shell" id="experience">
        <div className="visual-section-heading">
          <div><p className="eyebrow">Your night</p><h2>One clear plan.</h2></div>
          <Link className="button button-dark" href="/enquire">Check your date</Link>
        </div>
        <div className="experience-gallery">
          {experiences.map(([image, icon, title, text]) => (
            <article key={title}>
              <EditorialImage alt="" height={768} name={image} width={1376} />
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
            <p>Your dedicated coordinator connects the committee, venue and event team.</p>
            <div className="visual-facts"><strong>10+ years</strong><span>Across Ireland</span></div>
            <Link className="button" href="/how-it-works">How it works</Link>
          </div>
        </div>
      </section>

      <section className="visual-process shell">
        <div className="visual-section-heading"><div><p className="eyebrow">Three simple moves</p><h2>From idea to event.</h2></div></div>
        <div className="visual-step-grid">
          {steps.map(([icon, title, text]) => <article key={title}><EventIcon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <Link className="button button-dark" href="/enquire">Start your enquiry</Link>
      </section>

      <section className="visual-safety shell">
        <div className="visual-safety-copy">
          <p className="eyebrow">For parents and schools</p>
          <h2>A clear event plan.</h2>
          <div className="safety-icon-list">{safety.map(([icon, title]) => <div key={title}><EventIcon name={icon} /><strong>{title}</strong></div>)}</div>
          <Link className="button button-dark" href="/parents-schools">See safety information</Link>
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
        <div><p className="eyebrow">Ready when you are</p><h2>Check your date.</h2></div>
        <Link className="button button-dark" href="/enquire">Open the form</Link>
      </section>
    </main>
  );
}
