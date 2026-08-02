import type { Metadata } from "next";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Check Your TY Ball Date",
  description: "Tell the TYBalls.ie team about your school, preferred date and estimated attendance.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <main id="main-content">
      <section className="page-hero shell form-page-hero">
        <p className="eyebrow">Start the conversation</p>
        <h1>Tell us about your night.</h1>
        <p>There is no fixed package and you do not need every answer yet. Share what you know and the team will check the suitable options.</p>
      </section>
      <div className="form-shell shell"><EnquiryForm /></div>
    </main>
  );
}
