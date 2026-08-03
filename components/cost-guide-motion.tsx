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

const ease = [0.16, 1, 0.3, 1] as const;

export function CostGuideMotion({ basePath }: { basePath: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "9%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, reduceMotion ? 1.04 : 1.1]);
  const peopleY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  const reveal = { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <>
      <section className="cost-cinematic-hero" aria-labelledby="cost-hero-title" ref={heroRef}>
        <motion.div className="cost-hero-media" style={{ scale: imageScale, y: imageY }}>
          <Image alt="A TY Ball committee taking part in a venue walkthrough with an adult event coordinator" className="cost-hero-image" fill priority sizes="100vw" src={`${basePath}/images/cost-guide-hero.webp`} unoptimized />
        </motion.div>
        <div className="cost-hero-scrim" aria-hidden="true" />
        <div className="cost-hero-content shell">
          <motion.p animate={{ opacity: 1, y: 0 }} className="eyebrow light" initial={{ opacity: 0, y: 16 }} transition={{ delay: 0.2, duration: 0.65, ease }}>TY Ball cost guide</motion.p>
          <h1 id="cost-hero-title">
            {"What shapes the cost?".split(" ").map((word, index) => (
              <span className="cost-word" key={word}>
                <motion.span animate={{ filter: "blur(0px)", opacity: 1, y: "0%" }} initial={{ filter: "blur(4px)", opacity: 0, y: "105%" }} transition={{ delay: 0.3 + index * 0.11, duration: 0.72, ease }}>{word}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <motion.div animate={{ opacity: 1, y: 0 }} className="cost-hero-action" initial={{ opacity: 0, y: 28 }} transition={{ delay: 0.68, duration: 0.8, ease }}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}><Link className="button" href="/enquire">Booking Enquiry Form <span aria-hidden="true">↗</span></Link></motion.div>
            <p>Your proposal follows the venue, date, guest estimate and the parts of the night your committee chooses.</p>
          </motion.div>
        </div>
        <motion.div animate={{ opacity: 1, scale: 1, x: 0 }} className="cost-hero-people" initial={{ opacity: 0, scale: 0.9, x: 70 }} style={{ y: peopleY }} transition={{ delay: 0.7, duration: 1, ease }}>
          <Image alt="" aria-hidden="true" height={1139} priority src={`${basePath}/images/cost-guide-people.webp`} unoptimized width={1060} />
        </motion.div>
        <div className="cost-hero-panels">
          <motion.article animate={{ opacity: 1, y: 0 }} className="cost-panel cost-panel-intro" initial={{ opacity: 0, y: 46 }} transition={{ delay: 0.86, duration: 0.8, ease }}>
            <div><p className="eyebrow">Built for your event</p><h2>Built around your night.</h2></div>
            <a href="#cost-factors">See the factors</a>
          </motion.article>
          <motion.article animate={{ opacity: 1, y: 0 }} className="cost-panel cost-panel-rotator" initial={{ opacity: 0, y: 46 }} transition={{ delay: 0.98, duration: 0.8, ease }}><CostFactorRotator /></motion.article>
          <motion.article animate={{ opacity: 1, y: 0 }} className="cost-panel cost-panel-proof" initial={{ opacity: 0, y: 46 }} transition={{ delay: 1.1, duration: 0.8, ease }}>
            <EventIcon name="calendar" />
            <div><strong>10+ years</strong><p>DebsGuru event experience across Ireland.</p></div>
          </motion.article>
        </div>
      </section>

      <section className="cost-factor-section shell" id="cost-factors">
        <motion.div {...reveal} className="cost-factor-heading" transition={{ duration: 0.8, ease }} viewport={{ amount: 0.3, once: true }}>
          <div><p className="eyebrow">Pricing factors</p><h2>Every part counts.</h2></div>
          <p>DebsGuru checks current venue and supplier costs, then brings the relevant inclusions and pricing into one proposal.</p>
        </motion.div>
        <div className="cost-factor-grid">
          {factors.map(([icon, title, text], index) => (
            <motion.article initial={{ opacity: 0, y: 30 }} key={title} transition={{ delay: index * 0.07, duration: 0.65, ease }} viewport={{ amount: 0.25, once: true }} whileHover={reduceMotion ? undefined : { y: -6 }} whileInView={{ opacity: 1, y: 0 }}>
              <EventIcon name={icon} /><h3>{title}</h3><p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section {...reveal} className="cost-request-band shell" transition={{ duration: 0.8, ease }} viewport={{ amount: 0.35, once: true }}>
        <div><p className="eyebrow light">Send the starting point</p><h2>Ready for a real proposal?</h2></div>
        <p>Share the school, county, date or flexibility, guest estimate and the parts of the night that matter most.</p>
        <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}><Link className="button" href="/enquire">Booking Enquiry Form</Link></motion.div>
      </motion.section>
    </>
  );
}
