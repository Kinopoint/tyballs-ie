"use client";

import { useState } from "react";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";

const scenes = [
  { label: "Arrival", name: "event-hall", width: 1376, height: 768 },
  { label: "Planning", name: "planning-session", width: 1376, height: 768 },
  { label: "Hospitality", name: "table-service", width: 1200, height: 896 },
  { label: "Production", name: "production-check", width: 1376, height: 768 },
] as const;

const enquiryDetails = ["School and county", "Preferred date", "Attendance estimate", "Committee contact"] as const;

export function HomeHero() {
  const [activeScene, setActiveScene] = useState(0);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-media" aria-hidden="true">
        {scenes.map((scene, index) => (
          <EditorialImage
            alt=""
            className={`home-hero-image${activeScene === index ? " is-active" : ""}`}
            height={scene.height}
            key={scene.label}
            name={scene.name}
            priority={index === 0}
            width={scene.width}
          />
        ))}
      </div>
      <div className="home-hero-scrim" aria-hidden="true" />

      <div className="home-hero-content shell">
        <div className="home-hero-copy">
          <p className="hero-badge">TY Ball planning by DebsGuru</p>
          <p className="eyebrow">Planning across Ireland</p>
          <h1 id="home-hero-title">Planning a TY Ball?</h1>
          <p className="hero-lead">Start with your school, preferred date and estimated attendance. The team will check suitable options and contact your committee.</p>
          <div className="hero-actions">
            <Link className="button" href="/enquire">Check your date</Link>
            <Link className="hero-secondary-link" href="/how-it-works">See how it works <span aria-hidden="true">→</span></Link>
          </div>
          <p className="hero-note">An enquiry does not reserve a date or create a booking.</p>
        </div>

        <aside className="hero-glass" aria-label="Information needed for an enquiry">
          <p>Ready for the first check</p>
          <h2>Four details are enough to start.</h2>
          <ul>{enquiryDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <Link href="/enquire">Open the enquiry form <span aria-hidden="true">→</span></Link>
        </aside>
      </div>

      <div className="home-hero-controls shell">
        <div className="scene-switcher" role="group" aria-label="Explore the event planning experience">
          {scenes.map((scene, index) => (
            <button aria-pressed={activeScene === index} key={scene.label} onClick={() => setActiveScene(index)} type="button">{scene.label}</button>
          ))}
        </div>
        <p>Venue · Food · Entertainment · Event support</p>
      </div>
    </section>
  );
}
