"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EditorialImage } from "@/components/editorial-image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const scenes = [
  ["The night", "Arrival, lit and calm", "drive-arrival", 1000, 1367],
  ["Dinner", "Dinner, served together", "drive-dinner", 1000, 1500],
  ["Photo booth", "Photo booth, all night", "drive-photobooth", 1000, 1500],
  ["Together", "The whole year, one room", "drive-group", 1000, 1500],
] as const;

export function HomeHero() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = window.setInterval(() => setActiveScene((scene) => (scene + 1) % scenes.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="zip-hero" aria-labelledby="home-hero-title">
      <div className="zip-hero-glow zip-hero-glow-magenta" aria-hidden="true" />
      <div className="zip-hero-glow zip-hero-glow-blue" aria-hidden="true" />
      <div className="zip-hero-grid zip-shell">
        <div className="zip-hero-copy">
          <p className="zip-pill"><span aria-hidden="true" />TY Ball organisers across Ireland</p>
          <h1 id="home-hero-title">Planning a TY&nbsp;Ball?</h1>
          <p className="zip-lead">A memorable night for your guests. One clear plan for you.</p>
          <div className="zip-actions">
            <Link className="zip-button-outline" href="/enquire">Booking Enquiry Form</Link>
            <Link className="zip-button-quiet" href="/how-it-works">See how it works →</Link>
          </div>
          <div className="zip-proof" aria-label="DebsGuru experience">
            <div className="zip-proof-brand">
              <picture>
                <source srcSet={`${basePath}/brand/tyballs-client-logo-sign.webp`} type="image/webp" />
                <img alt="TYBalls.ie" height={640} src={`${basePath}/brand/tyballs-client-logo-sign.jpg`} width={1390} />
              </picture>
            </div>
            <div><strong>10+ years</strong><span>Experience across Ireland</span></div>
            <div><strong>Thousands</strong><span>Of students enjoying our events</span></div>
          </div>
        </div>
        <div className="zip-hero-gallery">
          <div className="zip-hero-frame">
            <div className="zip-hero-track" style={{ transform: `translateX(-${activeScene * 25}%)` }}>
              {scenes.map((scene, index) => (
                <EditorialImage
                  alt=""
                  className="zip-hero-scene"
                  height={scene[4]}
                  key={scene[0]}
                  name={scene[2]}
                  priority={index === 0}
                  width={scene[3]}
                />
              ))}
            </div>
            <p className="zip-hero-caption">{scenes[activeScene][1]}</p>
          </div>
          <div className="zip-scene-tabs" role="group" aria-label="Explore the event planning experience">
            {scenes.map((scene, index) => (
              <button aria-pressed={activeScene === index} key={scene[0]} onClick={() => setActiveScene(index)} type="button">{scene[0]}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
