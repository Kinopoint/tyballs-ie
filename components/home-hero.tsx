"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EditorialImage } from "@/components/editorial-image";
import type { HomePage } from "@/payload-types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const scenes = [
  ["The night", "Arrival, lit and calm", "drive-arrival", 1000, 1367],
  ["Dinner", "Dinner, served together", "drive-dinner", 1000, 1500],
  ["Photo booth", "Photo booth, all night", "drive-photobooth", 1000, 1500],
  ["Together", "The whole year, one room", "drive-group", 1000, 1500],
] as const;

type HomeHeroProps = {
  content?: HomePage["hero"];
};

export function HomeHero({ content }: HomeHeroProps) {
  const [activeScene, setActiveScene] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    let timer: number | undefined;

    const updateTimer = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
      if (!isVisible || document.visibilityState !== "visible" || reducedMotion.matches) return;
      timer = window.setInterval(() => setActiveScene((scene) => (scene + 1) % scenes.length), 5000);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateTimer();
    }, { threshold: 0.1 });

    observer.observe(hero);
    document.addEventListener("visibilitychange", updateTimer);
    reducedMotion.addEventListener("change", updateTimer);

    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateTimer);
      reducedMotion.removeEventListener("change", updateTimer);
    };
  }, []);

  return (
    <section className="zip-hero" aria-labelledby="home-hero-title" ref={heroRef}>
      <div className="zip-hero-glow zip-hero-glow-magenta" aria-hidden="true" />
      <div className="zip-hero-glow zip-hero-glow-blue" aria-hidden="true" />
      <div className="zip-hero-grid zip-shell">
        <div className="zip-hero-copy">
          <p className="zip-pill"><span aria-hidden="true" />{content?.eyebrow ?? "TY Ball organisers across Ireland"}</p>
          <h1 id="home-hero-title">{(content?.title ?? "Planning a TY Ball?").replace("TY Ball", "TY\u00a0Ball")}</h1>
          <p className="zip-lead">{content?.intro ?? "A memorable night for your guests. One clear plan for you."}</p>
          <div className="zip-actions">
            <Link className="zip-button-outline" href={content?.primaryButtonLink ?? "/enquire"}>{content?.primaryButtonLabel ?? "Booking Enquiry Form"}</Link>
            <Link className="zip-button-quiet" href={content?.secondaryButtonLink ?? "/how-it-works"}>{content?.secondaryButtonLabel ?? "See how it works"} →</Link>
          </div>
          <div className="zip-proof" aria-label="DebsGuru experience">
            <div className="zip-proof-brand">
              <picture>
                <Image alt="TYBalls.ie" height={640} sizes="200px" src={`${basePath}/brand/tyballs-client-logo-sign.webp`} width={1390} />
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
                  sizes="(max-width: 640px) calc(100vw - 40px), 420px"
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
