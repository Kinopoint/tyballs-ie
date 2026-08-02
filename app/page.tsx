import Image from "next/image";
import Link from "next/link";

const experience = [
  {
    number: "01",
    title: "The right venue",
    text: "Options matched to your preferred date, location, group and the kind of night your committee wants.",
  },
  {
    number: "02",
    title: "A plan that fits",
    text: "Food, entertainment and extras are brought together around your priorities — not a fixed one-size-fits-all package.",
  },
  {
    number: "03",
    title: "One point of contact",
    text: "Clear communication with an experienced event team from the first enquiry through to the final arrangements.",
  },
  {
    number: "04",
    title: "A night to remember",
    text: "A well-paced event with the atmosphere, photo moments and dance floor your year can look forward to.",
  },
] as const;

const steps = [
  ["Tell us the essentials", "Share your school, preferred date, county and honest estimate of attendance."],
  ["We check the options", "The team reviews suitable venues and availability before discussing a tailored proposal."],
  ["Shape your night", "Your committee agrees the venue, entertainment and extras with a dedicated contact."],
  ["Confirm and plan", "A date is secured only after availability, details and the booking terms are confirmed."],
] as const;

const questions = [
  ["Why are prices not shown?", "Venue and supplier costs vary by date, location and group. We speak with your committee first, then prepare an accurate proposal rather than publishing a price that may no longer apply."],
  ["Is there a minimum group size?", "There is no single number that applies to every venue or date. Tell us your honest attendance estimate and we will check the suitable options."],
  ["Does the form reserve our date?", "No. It starts the conversation. Your date is only secured after availability and the booking details have been confirmed with DebsGuru."],
  ["Who organises TYBalls.ie events?", "TYBalls.ie is from the team behind DebsGuru.ie, bringing established event-planning experience to a dedicated Transition Year service."],
] as const;

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <main id="main-content">
      <section className="hero">
        <Image
          alt="An elegant ballroom prepared for a TY Ball"
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src={`${basePath}/media/tyballs-ballroom-hero-v1.png`}
        />
        <div className="hero-overlay" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow light">Transition Year balls, thoughtfully planned</p>
            <h1>
              Your night.
              <br />
              <em>Properly planned.</em>
            </h1>
            <p className="hero-lead">
              The right venue, the right atmosphere and one experienced team
              bringing every detail together for your committee.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/enquire">
                Check your date <span aria-hidden="true">↗</span>
              </Link>
              <Link className="quiet-link" href="/#experience">
                Explore the night <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <div className="hero-side-note" aria-label="Planning promise">
            <span>One team</span>
            <strong>Every detail</strong>
            <span>Your night</span>
          </div>
        </div>
        <div className="hero-trust shell">
          <p><span>From the team behind</span><strong>DebsGuru.ie</strong></p>
          <p><span>Built around</span><strong>Your date &amp; group</strong></p>
          <p><span>First step</span><strong>A real conversation</strong></p>
        </div>
      </section>

      <div className="event-ribbon" aria-hidden="true">
        <div><span>VENUE</span><b>✦</b><span>FOOD</span><b>✦</b><span>DJ</span><b>✦</b><span>PHOTOGRAPHY</span><b>✦</b><span>ATMOSPHERE</span><b>✦</b><span>YOUR NIGHT</span></div>
      </div>

      <section className="intro shell">
        <div className="section-index"><span>01</span><span>Built for TY committees</span></div>
        <div className="intro-grid">
          <h2>
            Big-night energy.
            <br />
            <em>Calm, clear planning.</em>
          </h2>
          <div>
            <p className="lead">
              No two schools, dates or venues are the same. That is why every
              TY Ball starts with a real conversation rather than a generic
              package or an out-of-date price list.
            </p>
            <Link className="text-link" href="/how-it-works">
              See how the process works <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="intro-principles" aria-label="How TYBalls.ie works">
          <p><strong>Tailored</strong><span>A proposal shaped around the actual night</span></p>
          <p><strong>Clear</strong><span>One point of contact from the start</span></p>
          <p><strong>Practical</strong><span>No booking is made by submitting the form</span></p>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="shell">
          <div className="section-heading">
            <div className="section-index light"><span>02</span><span>The experience</span></div>
            <h2>
              Your committee brings the ideas.
              <br />
              <em>We bring them together.</em>
            </h2>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article key={item.number}>
                <div className="experience-number">{item.number}</div>
                <div className="experience-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
                <span className="experience-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tailored shell">
        <div className="tailored-card">
          <span className="tailored-kicker" aria-hidden="true">Made to fit</span>
          <p className="eyebrow">One-size-fits-all? Not here.</p>
          <h2>A proposal shaped around your date, venue and numbers.</h2>
          <p>
            Prices change with venue availability and supplier costs. Share the
            essentials and the team will talk you through the suitable options.
          </p>
          <Link className="button button-dark" href="/enquire">
            Start your enquiry <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="tailored-note">
          <span aria-hidden="true">!</span>
          <strong>Good to know</strong>
          <p>An enquiry does not reserve a date or create a booking.</p>
        </div>
      </section>

      <section className="process shell" aria-labelledby="process-title">
        <div className="section-heading dark-heading">
          <div className="section-index"><span>03</span><span>From enquiry to event</span></div>
          <h2 id="process-title">
            A simple process.
            <br />
            <em>No guesswork.</em>
          </h2>
        </div>
        <ol className="process-list">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="audience-paths shell" aria-labelledby="audience-title">
        <div className="section-heading dark-heading"><div className="section-index"><span>04</span><span>The right information</span></div><h2 id="audience-title">Different questions.<br /><em>One clear plan.</em></h2></div>
        <div className="audience-grid">
          <article><span>For committees</span><h3>Turn the group chat into a practical starting point.</h3><p>See what information is useful now, what can wait and how an honest attendance estimate helps.</p><Link className="text-link" href="/for-committees">Committee planning guide <span aria-hidden="true">→</span></Link></article>
          <article><span>For parents &amp; schools</span><h3>Understand what should be confirmed before booking.</h3><p>Venue rules, timings, transport, support arrangements and booking conditions depend on the actual proposal.</p><Link className="text-link" href="/parents-schools">Information for adults <span aria-hidden="true">→</span></Link></article>
        </div>
      </section>

      <section className="faq" id="questions">
        <div className="shell faq-grid">
          <div className="section-heading">
            <div className="section-index light"><span>05</span><span>Straight answers</span></div>
            <h2>
              Before you
              <br />
              <em>get started.</em>
            </h2>
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
        <div className="final-cta-copy"><p className="eyebrow">Have a date in mind?</p><h2>Let&apos;s see what<br /><em>is possible.</em></h2></div>
        <div className="final-cta-action"><p>Tell us the essentials. The DebsGuru team will take it from there.</p><Link className="button button-dark" href="/enquire">Check your date <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
