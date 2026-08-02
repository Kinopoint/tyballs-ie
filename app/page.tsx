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
        <div className="hero-content shell">
          <p className="eyebrow light">Transition Year balls, thoughtfully planned</p>
          <h1>
            Your night.
            <br />
            <em>Properly planned.</em>
          </h1>
          <p className="hero-lead">
            A dedicated team to help your committee find the right venue, shape
            the experience and bring every detail together.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/enquire">
              Check your date <span aria-hidden="true">↗</span>
            </Link>
            <Link className="quiet-link" href="/#experience">
              Explore the experience <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <div className="hero-trust">
            <span>From the makers of</span>
            <strong>DebsGuru.ie</strong>
            <span>Ireland&apos;s leading Debs &amp; TY Ball organisers</span>
          </div>
        </div>
      </section>

      <section className="intro shell">
        <p className="eyebrow">Built for TY committees</p>
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
      </section>

      <section className="experience" id="experience">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow light">The experience</p>
            <h2>
              Your committee brings the ideas.
              <br />
              <em>We bring them together.</em>
            </h2>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tailored shell">
        <div className="tailored-card">
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
          <strong>Good to know</strong>
          <p>An enquiry does not reserve a date or create a booking.</p>
        </div>
      </section>

      <section className="process shell" aria-labelledby="process-title">
        <div className="section-heading dark-heading">
          <p className="eyebrow">From enquiry to event</p>
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
        <div className="section-heading dark-heading"><p className="eyebrow">The right information</p><h2 id="audience-title">Different questions.<br /><em>One clear plan.</em></h2></div>
        <div className="audience-grid">
          <article><span>For committees</span><h3>Turn the group chat into a practical starting point.</h3><p>See what information is useful now, what can wait and how an honest attendance estimate helps.</p><Link className="text-link" href="/for-committees">Committee planning guide <span aria-hidden="true">→</span></Link></article>
          <article><span>For parents &amp; schools</span><h3>Understand what should be confirmed before booking.</h3><p>Venue rules, timings, transport, support arrangements and booking conditions depend on the actual proposal.</p><Link className="text-link" href="/parents-schools">Information for adults <span aria-hidden="true">→</span></Link></article>
        </div>
      </section>

      <section className="faq" id="questions">
        <div className="shell faq-grid">
          <div className="section-heading">
            <p className="eyebrow light">Straight answers</p>
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
        <p className="eyebrow">Have a date in mind?</p>
        <h2>Let&apos;s see what is possible.</h2>
        <p>Tell us the essentials. The DebsGuru team will take it from there.</p>
        <Link className="button button-dark" href="/enquire">
          Check your date <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
