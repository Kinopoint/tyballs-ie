import type { Metadata } from "next";
import Link from "next/link";
import { EventIcon } from "@/components/event-icon";

export const metadata: Metadata = {
  title: "TY Ball Information for Parents and Schools",
  description: "A clear view of TY Ball venue rules, timings, transport, accessibility and responsible event contacts.",
  alternates: { canonical: "/parents-schools" },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const confirmations = [
  ["shield", "Guest list and entry", "Check-in, venue rules and re-entry."],
  ["guests", "Event format", "Who attends and which spaces are shared."],
  ["calendar", "Venue timings", "Arrival, finish and collection windows."],
  ["contact", "Named contacts", "Coordinator, venue and responsible adults."],
  ["route", "Transport home", "Collection points and contact details."],
  ["dining", "Food and access", "Dietary, allergy and accessibility needs."],
] as const;

const beforeEvent = [
  ["contact", "Save the contacts", "Keep the coordinator and venue details close."],
  ["route", "Share the route", "Send arrival and collection details to guests."],
  ["dining", "Confirm requirements", "Submit dietary and access needs on time."],
  ["camera", "Check photography", "Know how event images will be handled."],
] as const;

export default function ParentsSchoolsPage() {
  return (
    <main id="main-content">
      <section className="guidance-hero shell">
        <div className="guidance-hero-copy">
          <p className="eyebrow">For parents and schools</p>
          <h1>TY Ball guidance</h1>
          <p>See the key arrangements at a glance, then confirm the details for the selected venue.</p>
          <Link className="button button-dark" href="/enquire">Ask DebsGuru</Link>
        </div>
        <figure>
          <video aria-label="Students arriving for a supervised TY Ball check-in" autoPlay loop muted playsInline poster={`${basePath}/images/school-arrival.jpg`} preload="metadata">
            <source src={`${basePath}/video/tyball-school-arrival-loop.mp4`} type="video/mp4" />
          </video>
        </figure>
      </section>

      <section className="guidance-confirm shell">
        <div className="guidance-heading"><p className="eyebrow">Before confirmation</p><h2>What to confirm</h2></div>
        <div className="guidance-card-grid">
          {confirmations.map(([icon, title, text]) => (
            <article key={title}><EventIcon name={icon} /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="guidance-before">
        <div className="shell guidance-before-grid">
          <div className="guidance-before-copy"><p className="eyebrow light">Before the event</p><h2>Keep it handy</h2><p>Share the confirmed information for the actual venue with guests and responsible contacts.</p></div>
          <div className="guidance-action-grid">
            {beforeEvent.map(([icon, title, text]) => (
              <article key={title}><EventIcon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta shell"><div><p className="eyebrow">Questions about an event</p><h2>Ask DebsGuru</h2></div><Link className="button button-dark" href="/enquire">Open the enquiry form</Link></section>
    </main>
  );
}
