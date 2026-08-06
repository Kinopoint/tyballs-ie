"use client";

import { motion, useReducedMotion } from "motion/react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const headlineLines = ["From enquiry to event"] as const;

const characterVariants = {
  hidden: { filter: "blur(8px)", opacity: 0, y: "0.9em" },
  visible: (index: number) => ({
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      delay: 0.34 + index * 0.032,
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    y: 0,
  }),
};

export function HowItWorksHero() {
  const prefersReducedMotion = useReducedMotion();
  let characterIndex = 0;

  return (
    <section className="how-hero zip-shell" aria-labelledby="how-hero-title">
      <div className="how-hero-frame">
        <video
          aria-hidden="true"
          autoPlay={!prefersReducedMotion}
          className="how-hero-video"
          loop
          muted
          playsInline
          poster={`${basePath}/images/tyballs-how-hero-poster.webp`}
          preload="metadata"
        >
          <source src={`${basePath}/video/tyballs-how-hero.webm`} type="video/webm" />
          <source src={`${basePath}/video/tyballs-how-hero.mp4`} type="video/mp4" />
        </video>
        <div className="how-hero-shade" aria-hidden="true" />
        <div className="how-hero-copy">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="zip-eyebrow"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            How it works
          </motion.p>
          <h1 aria-label="From enquiry to event" id="how-hero-title">
            {headlineLines.map((line) => (
              <span className="how-hero-line" key={line}>
                {Array.from(line).map((character) => {
                  const index = characterIndex++;
                  return (
                    <motion.span
                      aria-hidden="true"
                      custom={index}
                      initial={prefersReducedMotion ? false : "hidden"}
                      key={`${line}-${index}`}
                      variants={characterVariants}
                      animate="visible"
                    >
                      {character === " " ? "\u00a0" : character}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>
        <motion.span
          animate={{ opacity: 1, scaleY: 1 }}
          aria-hidden="true"
          className="how-hero-rule"
          initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="how-hero-intro"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>Start with a date, location and guest estimate.</p>
        <p>DebsGuru turns them into a plan the committee can review with confidence.</p>
      </motion.div>
    </section>
  );
}
