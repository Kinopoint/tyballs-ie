import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { HomeHero } from "@/components/home-hero";

const services = [
  ["Venue search", "DebsGuru checks venue options against your county, preferred date, attendance and practical travel requirements."],
  ["Food and hospitality", "The committee can discuss the meal, dietary requirements, table service and the flow of the evening."],
  ["DJ and production", "Sound, lighting, DJ arrangements and the running order can be coordinated as part of the event plan."],
  ["Photography", "Professional photography and photobooth options can be considered, with image arrangements agreed before the event."],
  ["Awards and atmosphere", "An awards moment, room styling and selected entertainment can be shaped around the year group."],
  ["On-the-night coordination", "A DebsGuru coordinator manages the agreed schedule and works with the venue and event suppliers."],
] as const;

const safetyPoints = [
  ["Alcohol-free TY event", "The TY Ball itself is planned as an alcohol-free student event. Entry rules and venue arrangements are confirmed before booking."],
  ["Named event contacts", "The committee receives the relevant coordinator, venue and transport contacts for the confirmed event."],
  ["Security and first aid", "The applicable security, first-aid and incident arrangements are confirmed for the selected venue."],
  ["Dietary and access needs", "Allergies, dietary requirements and accessibility needs should be supplied early enough for the venue to plan correctly."],
] as const;

const venueChecks = [
  "County and realistic travel time",
  "Capacity for the expected attendance",
  "Dining, dancing and arrival spaces",
  "Accessibility and dietary capability",
  "Transport and collection arrangements",
] as const;

const reasons = [
  ["10+ years of experience", "DebsGuru has more than a decade of experience working with school event committees."],
  ["One dedicated coordinator", "A single DebsGuru contact guides the committee from the first conversation through the agreed event plan."],
  ["Venue and supplier coordination", "The team brings the venue, hospitality, production and selected event services into one workable schedule."],
  ["Focused event support", "DebsGuru states that it commits to one Debs or TY Ball per day so the booked event receives the team’s attention."],
] as const;

const steps = [
  ["Send an enquiry", "Provide the school, county, preferred date and an estimate of attendance."],
  ["Availability is checked", "DebsGuru reviews suitable venue and supplier options for those details."],
  ["Discuss the proposal", "The committee reviews the available options, costs and practical requirements."],
  ["Confirm the booking", "The date is secured only after the proposal and booking terms are agreed."],
] as const;

const questions = [
  ["Do we need final attendance numbers?", "No. Give the most realistic estimate your committee has. Final numbers can be dealt with later in the planning process."],
  ["Is a TY Ball alcohol-free?", "Yes. The TY Ball is planned as an alcohol-free student event. The confirmed proposal sets out the venue’s entry rules and event arrangements."],
  ["How are security and first aid handled?", "Requirements depend on the venue and attendance. The responsible contacts and applicable security and first-aid arrangements are confirmed for the booked event."],
  ["Can dietary and accessibility needs be accommodated?", "They should be raised as early as possible. DebsGuru checks the relevant venue arrangements and explains how confirmed requirements must be submitted."],
  ["Can transport be arranged?", "Transport can be discussed when DebsGuru knows the county, likely attendance and collection requirements. Any included or separate transport arrangement is confirmed in writing."],
  ["Is there a minimum attendance?", "Minimum numbers can vary by venue and event arrangement. DebsGuru will explain the applicable requirement before a committee confirms a booking."],
  ["Who can submit the enquiry?", "A committee contact can send the first details. DebsGuru works directly with the committee account holder when discussing a specific event."],
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
          <p className="eyebrow light">What your TY Ball can include</p>
          <h2>The practical parts of the night, brought together.</h2>
          <p className="section-lead-light">The final event plan is based on the selected venue, date, attendance and the committee’s priorities.</p>
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

      <section className="safety-feature shell" aria-labelledby="safety-title">
        <figure>
          <EditorialImage alt="Adult production staff managing a formal event" height={768} name="production-check" width={1376} />
        </figure>
        <div className="safety-copy">
          <p className="eyebrow">For a TY audience</p>
          <h2 id="safety-title">A celebration with clear adult management.</h2>
          <p className="lead">A TY Ball should feel special to the guests and properly prepared to the adults responsible for them.</p>
          <div className="safety-list">
            {safetyPoints.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <Link className="text-link" href="/parents-schools">Information for parents and schools</Link>
        </div>
      </section>

      <section className="venue-feature">
        <div className="shell venue-grid">
          <div>
            <p className="eyebrow light">Venue options across Ireland</p>
            <h2>Venue choice starts with fit, not a long generic list.</h2>
          </div>
          <div>
            <p>DebsGuru has access to TY Ball venue options across Ireland. The useful shortlist depends on where the group is travelling from, the date, attendance and the spaces the event needs.</p>
            <ul>{venueChecks.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className="text-link text-link-light" href="/enquire">Send your county and preferred date</Link>
          </div>
        </div>
      </section>

      <section className="trust-feature shell" aria-labelledby="trust-title">
        <div className="section-heading">
          <p className="eyebrow">Why DebsGuru</p>
          <h2 id="trust-title">An experienced team behind the event.</h2>
        </div>
        <div className="trust-grid">
          {reasons.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
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
            <h2>Before your committee confirms anything</h2>
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
