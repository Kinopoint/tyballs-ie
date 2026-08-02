import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";

export const metadata: Metadata = {
  title: "How a TY Ball Enquiry Works",
  description: "What happens after a TY Ball committee sends an enquiry to DebsGuru.",
  alternates: { canonical: "/how-it-works" },
};

const stages = [
  {
    title: "Send the main details",
    text: "Provide the school, county, preferred date and a realistic attendance estimate. A final guest list is not required at this stage.",
  },
  {
    title: "DebsGuru checks availability",
    text: "The team reviews venues and event options that may suit the date, location and expected attendance.",
  },
  {
    title: "The committee reviews a proposal",
    text: "DebsGuru discusses the available venue, services, costs and practical requirements with the committee contact.",
  },
  {
    title: "The booking is confirmed",
    text: "A date is not reserved by the website form. It is confirmed only after availability, pricing and the booking terms have been agreed with DebsGuru.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <section className="page-hero page-hero-with-media shell">
        <div className="page-hero-title"><p className="eyebrow">Enquiry process</p><h1>What happens after you enquire</h1></div>
        <p className="page-hero-description">The website form sends your details to DebsGuru for review. It does not make a booking or reserve a date.</p>
        <figure className="page-hero-media"><EditorialImage alt="Adult event coordinators reviewing a venue plan" height={768} name="planning-session" width={1376} /></figure>
      </section>
      <section className="stage-list shell">
        {stages.map((stage) => (
          <article key={stage.title}>
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
