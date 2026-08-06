"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

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
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  let characterIndex = 0;

  const resumeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (document.visibilityState === "visible") {
      void video.play().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    resumeVideo();
    document.addEventListener("visibilitychange", resumeVideo);
    window.addEventListener("pageshow", resumeVideo);

    return () => {
      document.removeEventListener("visibilitychange", resumeVideo);
      window.removeEventListener("pageshow", resumeVideo);
    };
  }, [pathname, resumeVideo]);

  return (
    <section className="how-hero" aria-labelledby="how-hero-title">
      <motion.div
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        className="how-hero-frame"
        initial={{ clipPath: "inset(7% 0% 7% 0%)", opacity: 0 }}
        key={pathname}
        transition={{ delay: 0.1, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.video
          aria-hidden="true"
          autoPlay
          animate={{ opacity: 1, scale: 1 }}
          className="how-hero-video"
          initial={{ opacity: 0, scale: 1.035 }}
          loop
          muted
          onCanPlay={() => resumeVideo()}
          playsInline
          poster={`${basePath}/images/tyballs-how-hero-poster.webp`}
          preload="metadata"
          ref={videoRef}
          transition={{ delay: 0.08, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <source src={`${basePath}/video/tyballs-how-hero.webm`} type="video/webm" />
          <source src={`${basePath}/video/tyballs-how-hero.mp4`} type="video/mp4" />
        </motion.video>
        <div className="how-hero-shade" aria-hidden="true" />
        <div className="how-hero-copy">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="zip-eyebrow"
            initial={{ opacity: 0, y: 18 }}
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
                      initial="hidden"
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
          initial={{ opacity: 0, scaleY: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="how-hero-intro zip-shell"
        initial={{ opacity: 0, y: 24 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>Start with a date, location and guest estimate.</p>
        <p>DebsGuru turns them into a plan the committee can review with confidence.</p>
      </motion.div>
    </section>
  );
}
