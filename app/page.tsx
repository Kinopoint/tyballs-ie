import Link from "next/link";
import { HomeHero } from "@/components/home-hero";

const services = [
  ["Venue options", "The team checks venues that suit your county, date and expected attendance."],
  ["Food and service", "Menu and service options are discussed once the venue and group requirements are known."],
  ["Music and production", "DJ, sound, lighting and timings can be included in the proposal."],
  ["Photography and extras", "Photography, photobooths and other additions are considered with the committee."],
] as const;

const steps = [
  ["Send an enquiry", "Provide the school, county, preferred date and an estimate of attendance."],
  ["Availability is checked", "DebsGuru reviews suitable venue and supplier options for those details."],
  ["Discuss the proposal", "The committee reviews the available options, costs and practical requirements."],
  ["Confirm the booking", "The date is secured only after the proposal and booking terms are agreed."],
] as const;

const questions = [
  ["Why is there no fixed price?", "Venue and supplier costs depend on the location, date, attendance and services required. DebsGuru checks those details before preparing a proposal."],
  ["Do we need final attendance numbers?", "No. Give the most realistic estimate your committee has. Final numbers can be dealt with later in the planning process."],
  ["Does the enquiry form reserve a date?", "No. The form sends the details to DebsGuru for review. A date is not reserved until availability and booking terms are confirmed."],
  ["Who operates TYBalls.ie?", "TYBalls.ie is operated by DebsGuru Ltd, the team behind DebsGuru.ie."],
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <HomeHero />

      <div className="company-line">
        <div className="shell">
          <span>TYBalls.ie is operated by</span>
          <strong>DebsGuru Ltd</strong>
          <span>Based in Ballybunion, Co Kerry</span>
        </div>
      </div>

      <section className="intro shell">
        <p className="eyebrow">Before you enquire</p>
        <div className="intro-grid">
          <h2>Start with the details you have.</h2>
          <div>
            <p className="lead">
              Your committee does not need a final guest list or a complete
              event plan. A realistic attendance estimate and some flexibility
              on dates are enough for the first check.
            </p>
            <Link className="text-link" href="/for-committees">Committee information checklist</Link>
          </div>
        </div>
      </section>

      <section className="services" id="experience">
        <div className="shell services-heading">
          <p className="eyebrow light">What can be discussed</p>
          <h2>Venue, food, entertainment and event requirements.</h2>
        </div>
        <div className="shell service-list">
          {services.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-note shell">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Each proposal is based on the actual event details.</h2>
        </div>
        <div>
          <p>
            Costs change with the venue, date, attendance, food and suppliers.
            Publishing one standard price would not give committees an accurate
            figure.
          </p>
          <Link className="text-link" href="/cost-guide">Read the TY Ball cost guide</Link>
        </div>
      </section>

      <section className="process shell" aria-labelledby="process-title">
        <div className="section-heading">
          <p className="eyebrow">Enquiry process</p>
          <h2 id="process-title">What happens after you contact us</h2>
        </div>
        <ol className="process-list">
          {steps.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="audience-paths shell" aria-labelledby="audience-title">
        <div className="section-heading">
          <p className="eyebrow">More information</p>
          <h2 id="audience-title">Information for committees and adults</h2>
        </div>
        <div className="audience-grid">
          <article>
            <p>For committees</p>
            <h3>What to agree before sending an enquiry</h3>
            <Link className="text-link" href="/for-committees">View the committee guide</Link>
          </article>
          <article>
            <p>For parents and schools</p>
            <h3>Questions to ask about the venue and arrangements</h3>
            <Link className="text-link" href="/parents-schools">View the information page</Link>
          </article>
        </div>
      </section>

      <section className="faq" id="questions">
        <div className="shell faq-grid">
          <div className="section-heading">
            <p className="eyebrow light">Common questions</p>
            <h2>Before submitting an enquiry</h2>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta shell">
        <div>
          <p className="eyebrow">Make an enquiry</p>
          <h2>Send the details to DebsGuru.</h2>
        </div>
        <div>
          <p>The team will review the information and contact your committee about availability and next steps.</p>
          <Link className="button button-dark" href="/enquire">Open the enquiry form</Link>
        </div>
      </section>
    </main>
  );
}
