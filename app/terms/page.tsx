import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Website Terms", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <main className="legal-page shell" id="main-content">
      <header><p className="eyebrow">Legal</p><h1>Website Terms</h1><p>Draft for client review · Last updated 2 August 2026</p></header>
      <article>
        <h2>1. About this website</h2><p>TYBalls.ie is operated by DebsGuru Ltd. It provides information and an enquiry route for Transition Year ball planning.</p>
        <h2>2. An enquiry is not a booking</h2><p>Submitting the website form does not reserve a venue or date, create a booking, or oblige either party to proceed. Availability, services, pricing, deposits, cancellation and date-change terms are confirmed separately in writing by DebsGuru.</p>
        <h2>3. Prices and availability</h2><p>Venue and supplier costs can change. Website descriptions are general and do not constitute a fixed offer. A tailored proposal becomes applicable only in the form and period stated in that proposal.</p>
        <h2>4. Information you provide</h2><p>You agree to provide information you reasonably believe is accurate, including an honest attendance estimate. You must not submit another person’s contact information without permission or use the form unlawfully.</p>
        <h2>5. Website content</h2><p>We aim to keep information accurate but cannot guarantee that every venue, date, supplier or option shown or described remains available. We may update the website without notice.</p>
        <h2>6. Intellectual property</h2><p>Unless stated otherwise, the website design, written content and brand materials are owned by or licensed to DebsGuru Ltd. They may not be reproduced for commercial use without permission.</p>
        <h2>7. External services</h2><p>Links to third-party websites or services are provided for convenience. Their availability, content and privacy practices are controlled by those third parties.</p>
        <h2>8. Contact</h2><p>Questions about these website terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </article>
    </main>
  );
}
