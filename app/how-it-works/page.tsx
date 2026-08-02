import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How a TY Ball Enquiry Works",
  description: "What happens after a TY Ball committee sends an enquiry to DebsGuru.",
  alternates: { canonical: "/how-it-works" },
};

const stages = [
  {
    label: "Step 1",
    title: "Send the main details",
    text: "Provide the school, county, preferred date and a realistic attendance estimate. A final guest list is not required at this stage.",
  },
  {
    label: "Step 2",
    title: "DebsGuru checks availability",
    text: "The team reviews venues and event options that may suit the date, location and expected attendance.",
  },
  {
    label: "Step 3",
    title: "The committee reviews a proposal",
    text: "DebsGuru discusses the available venue, services, costs and practical requirements with the committee contact.",
  },
  {
    label: "Step 4",
    title: "The booking is confirmed",
    text: "A date is not reserved by the website form. It is confirmed only after availability, pricing and the booking terms have been agreed with DebsGuru.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <section className="page-hero shell">
        <p className="eyebrow">Enquiry process</p>
        <h1>What happens after you enquire</h1>
        <p>The website form sends your details to DebsGuru for review. It does not make a booking or reserve a date.</p>
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
        <div><p className="eyebrow">Contact DebsGuru</p><h2>Send your school and date details</h2></div>
        <Link className="button button-dark" href="/enquire">Open the enquiry form</Link>
      </section>
    </main>
  );
}
