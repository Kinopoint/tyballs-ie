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
      <div className="form-shell shell">
        <aside className="form-guide">
          <p className="eyebrow">Before you begin</p>
          <h2>A few essentials are enough.</h2>
          <ul>
            <li><span>01</span><p><strong>Your school and county</strong>So the team can consider practical venue options.</p></li>
            <li><span>02</span><p><strong>A realistic estimate</strong>Your guest count does not need to be final.</p></li>
            <li><span>03</span><p><strong>Your preferred date</strong>Flexibility can open up more possibilities.</p></li>
          </ul>
          <p className="form-guide-note">Submitting this form starts a conversation. It does not reserve a date.</p>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
