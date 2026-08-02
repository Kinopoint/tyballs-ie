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
      <section className="page-hero shell form-page-hero">
        <p className="eyebrow">Contact DebsGuru</p>
        <h1>TY Ball enquiry</h1>
        <p>Send the school, county, preferred date and estimated attendance. DebsGuru will use these details to check the relevant options.</p>
      </section>
      <figure className="editorial-visual shell form-visual">
        <EditorialImage
          alt="An adult technician checking event lighting in an empty hall"
          height={768}
          name="production-check"
          width={1376}
        />
      </figure>
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
