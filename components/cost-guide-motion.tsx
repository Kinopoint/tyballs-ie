"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CostFactorRotator } from "@/components/cost-factor-rotator";
import { EventIcon, type EventIconName } from "@/components/event-icon";

const factors: ReadonlyArray<readonly [EventIconName, string, string]> = [
  ["venue", "Venue and date", "Location, availability and time of year influence the starting cost."],
  ["guests", "Guest estimate", "A realistic number sets the capacity and helps suppliers price accurately."],
  ["dining", "Dinner and service", "Menu, service style and dietary needs become part of the proposal."],
  ["music", "Entertainment", "DJ, lighting, photography and extras follow the committee’s priorities."],
  ["route", "Transport", "Routes, collection points and passenger numbers shape any travel included."],
  ["contact", "Event requirements", "Staffing, access, timings and procedures differ between venues."],
];

export function CostGuideMotion({ basePath }: { basePath: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "9%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, reduceMotion ? 1.04 : 1.1]);

  return (
    <>
      <section className="cost-cinematic-hero" aria-labelledby="cost-hero-title" ref={heroRef}>
        <motion.div className="cost-hero-media" style={{ scale: imageScale, y: imageY }}>
          <Image alt="Guests together at a real DebsGuru event venue" className="cost-hero-image" fill priority sizes="100vw" src={`${basePath}/images/drive-garden.webp`} unoptimized />
        </motion.div>
        <div className="cost-hero-scrim" aria-hidden="true" />
        <div className="cost-hero-content shell">
          <p className="eyebrow light">TY Ball cost guide</p>
          <h1 id="cost-hero-title">
            {"What shapes the cost?".split(" ").map((word) => (
              <span className="cost-word" key={word}>
                <span>{word}&nbsp;</span>
              </span>
            ))}
          </h1>
          <div className="cost-hero-action">
            <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}><Link className="button" href="/enquire">Booking Enquiry Form <span aria-hidden="true">↗</span></Link></motion.div>
            <p>Your proposal follows the venue, date, guest estimate and the parts of the night your committee chooses.</p>
          </div>
        </div>
        <div className="cost-hero-panels">
          <article className="cost-panel cost-panel-intro">
            <div><p className="eyebrow">Built for your event</p><h2>Built around your night.</h2></div>
            <a href="#cost-factors">See the factors</a>
          </article>
          <article className="cost-panel cost-panel-rotator"><CostFactorRotator /></article>
          <article className="cost-panel cost-panel-proof">
            <EventIcon name="calendar" />
            <div><strong>10+ years</strong><p>DebsGuru event experience across Ireland.</p></div>
          </article>
        </div>
      </section>

      <section className="cost-factor-section shell" id="cost-factors">
        <div className="cost-factor-heading">
          <div><p className="eyebrow">Pricing factors</p><h2>Every part counts.</h2></div>
          <p>DebsGuru checks current venue and supplier costs, then brings the relevant inclusions and pricing into one proposal.</p>
        </div>
        <div className="cost-factor-grid">
          {factors.map(([icon, title, text]) => (
            <motion.article key={title} whileHover={reduceMotion ? undefined : { y: -6 }}>
              <EventIcon name={icon} /><h3>{title}</h3><p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="cost-request-band shell">
        <div><p className="eyebrow light">Send the starting point</p><h2>Ready for a real proposal?</h2></div>
        <p>Share the school, county, date or flexibility, guest estimate and the parts of the night that matter most.</p>
        <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}><Link className="button" href="/enquire">Booking Enquiry Form</Link></motion.div>
      </section>
    </>
  );
}
