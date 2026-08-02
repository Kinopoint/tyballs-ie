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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function HomeHero() {
  const [activeScene, setActiveScene] = useState(0);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-media" aria-hidden="true">
        <video autoPlay className={`home-hero-video${activeScene === 0 ? " is-active" : ""}`} loop muted playsInline poster={`${basePath}/images/event-hall.jpg`} preload="auto">
          <source src={`${basePath}/video/tyball-arrival-loop.mp4`} type="video/mp4" />
        </video>
        {scenes.map((scene, index) => (
          <EditorialImage
            alt=""
            className={`home-hero-image${activeScene === index && index !== 0 ? " is-active" : ""}`}
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
          <p className="hero-badge">TY Ball organisers across Ireland</p>
          <h1 id="home-hero-title">Planning a TY Ball?</h1>
          <p className="hero-lead">A memorable night for them. One clear plan for you.</p>
          <div className="hero-actions">
            <Link className="button" href="/enquire">Check your date</Link>
            <Link className="hero-secondary-link" href="/how-it-works">See how it works <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-proof" aria-label="DebsGuru experience"><strong>10+ years</strong><span>One event coordinator</span><span>Across Ireland</span></div>
        </div>
      </div>

      <div className="home-hero-controls shell">
        <div className="scene-switcher" role="group" aria-label="Explore the event planning experience">
          {scenes.map((scene, index) => (
            <button aria-pressed={activeScene === index} key={scene.label} onClick={() => setActiveScene(index)} type="button">{scene.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
