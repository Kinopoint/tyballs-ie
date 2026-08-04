"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const statements = [
  "Venue, date and location set the starting point.",
  "A realistic guest estimate shapes capacity and cost.",
  "Dinner, service and dietary needs form one part.",
  "Entertainment follows the committee’s priorities.",
] as const;

const factors = [
  ["Venue and date", "Location, availability and time of year influence the starting cost."],
  ["Guest estimate", "A realistic number sets the capacity and helps suppliers price accurately."],
  ["Dinner and service", "Menu, service style and dietary needs become part of the proposal."],
  ["Entertainment", "DJ, lighting, photography and extras follow the committee’s priorities."],
  ["Transport", "Routes, collection points and passenger numbers shape any travel included."],
  ["Event requirements", "Staffing, access, timings and procedures differ between venues."],
] as const;

export function CostGuideMotion() {
  const [activeStatement, setActiveStatement] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveStatement((line) => (line + 1) % statements.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="zip-inner-hero zip-cost-hero" aria-labelledby="cost-hero-title">
        <div className="zip-inner-glow" aria-hidden="true" />
        <div className="zip-cost-hero-grid zip-shell">
          <div className="zip-inner-copy">
            <p className="zip-eyebrow">TY Ball cost guide</p>
            <h1 id="cost-hero-title">What shapes the cost?</h1>
            <p>Your proposal follows the venue, date, guest estimate and the parts of the night your committee chooses.</p>
            <Link className="zip-button-outline" href="/enquire">Booking Enquiry Form ↗</Link>
          </div>
          <div className="zip-cost-summary">
            <article className="zip-cost-intro"><p className="zip-eyebrow">Built for your event</p><h2>Built around your night.</h2><a href="#factors">See the factors →</a></article>
            <article className="zip-cost-proof"><strong>10+ years</strong><p>DebsGuru event experience across Ireland.</p></article>
            <article className="zip-cost-lines">
              {statements.map((statement, index) => <p className={index === activeStatement ? "is-active" : ""} key={statement}><span aria-hidden="true" />{statement}</p>)}
            </article>
          </div>
        </div>
      </section>

      <section className="zip-section zip-shell" id="factors">
        <div className="zip-two-column-heading">
          <div><p className="zip-eyebrow">Pricing factors</p><h2>Every part counts.</h2></div>
          <p>DebsGuru checks current venue and supplier costs, then brings the relevant inclusions and pricing into one proposal.</p>
        </div>
        <div className="zip-factor-grid">
          {factors.map(([title, text]) => <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="zip-section zip-shell">
        <div className="zip-request-cta">
          <div><p className="zip-eyebrow">Send the starting point</p><h2>Ready for a real proposal?</h2><p>Share the school, county, date or flexibility, guest estimate and the parts of the night that matter most.</p></div>
          <Link className="zip-button-fill" href="/enquire">Booking Enquiry Form</Link>
        </div>
      </section>
    </>
  );
}
