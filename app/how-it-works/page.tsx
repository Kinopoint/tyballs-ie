import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How TY Ball Planning Works",
  description: "A clear, committee-friendly process from the first TY Ball enquiry to confirmed event planning.",
  alternates: { canonical: "/how-it-works" },
};

const stages = [
  {
    label: "Enquire",
    title: "Start with what you know",
    text: "Tell us your school, county, preferred date and a realistic attendance estimate. You do not need a final guest list or a complete plan.",
  },
  {
    label: "Explore",
    title: "Review the suitable options",
    text: "The team checks availability and discusses venues and event options that fit your date, location and priorities.",
  },
  {
    label: "Shape",
    title: "Build the right experience",
    text: "Your committee works through the details with one point of contact. The proposal is tailored because venue and supplier costs can change.",
  },
  {
    label: "Confirm",
    title: "Secure the arrangements",
    text: "A date is not reserved by the website form. It is confirmed only after availability, pricing and the booking terms have been agreed with DebsGuru.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <section className="page-hero shell">
        <p className="eyebrow">How it works</p>
        <h1>Clear from the first message.</h1>
        <p>A practical process designed for busy TY committees — with no need to pretend every detail is final on day one.</p>
      </section>
      <section className="stage-list shell">
        {stages.map((stage, index) => (
          <article key={stage.label}>
            <span>0{index + 1}</span>
            <p className="stage-label">{stage.label}</p>
            <h2>{stage.title}</h2>
            <p>{stage.text}</p>
          </article>
        ))}
      </section>
      <section className="page-cta shell">
        <div><p className="eyebrow">Ready when you are</p><h2>Have a date in mind?</h2></div>
        <Link className="button button-dark" href="/enquire">Check your date <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
