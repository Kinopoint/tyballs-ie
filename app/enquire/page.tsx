import type { Metadata } from "next";
import { EditorialImage } from "@/components/editorial-image";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Check Your TY Ball Date",
  description: "Tell the TYBalls.ie team about your school, preferred date and estimated attendance.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <main id="main-content">
      <section className="page-hero page-hero-with-media shell form-page-hero">
        <div className="page-hero-title"><p className="eyebrow">Contact DebsGuru</p><h1>TY Ball enquiry</h1></div>
        <p className="page-hero-description">Send the school, county, preferred date and estimated attendance. DebsGuru will use these details to check the relevant options.</p>
        <figure className="page-hero-media"><EditorialImage alt="An event team managing a formal evening" height={768} name="production-check" width={1376} /></figure>
      </section>
      <div className="form-shell shell">
        <aside className="form-guide">
          <p className="eyebrow">Information needed</p>
          <h2>Prepare these details</h2>
          <ul>
            <li><span aria-hidden="true">•</span><p><strong>School and county</strong>Used to consider practical venue options.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Estimated attendance</strong>The number does not need to be final.</p></li>
            <li><span aria-hidden="true">•</span><p><strong>Preferred date</strong>Include any flexibility your committee has.</p></li>
          </ul>
          <p className="form-guide-note">Submitting this form starts a conversation. It does not reserve a date.</p>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
