"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const headline = "Booking Enquiry Form";

const characterVariants = {
  hidden: { filter: "blur(8px)", opacity: 0, y: "0.85em" },
  visible: (index: number) => ({
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      delay: 0.32 + index * 0.028,
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    y: 0,
  }),
};

export function EnquiryHero() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const resumeVideo = useCallback(() => {
    const video = videoRef.current;
    if (video && !shouldReduceMotion && document.visibilityState === "visible") {
      void video.play().catch(() => undefined);
    }
  }, [shouldReduceMotion]);

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
    <section className="enquiry-cinematic" aria-labelledby="enquiry-hero-title">
      <motion.div
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        className="enquiry-cinematic-frame"
        initial={{ clipPath: "inset(6% 0% 6% 0%)", opacity: 0 }}
        key={pathname}
        transition={{ delay: 0.08, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.video
          aria-hidden="true"
          autoPlay={!shouldReduceMotion}
          animate={{ opacity: 1, scale: 1 }}
          className="enquiry-cinematic-video"
          initial={{ opacity: 0, scale: 1.035 }}
          loop
          muted
          onCanPlay={resumeVideo}
          playsInline
          poster={`${basePath}/images/tyballs-enquire-hero-poster.webp`}
          preload="metadata"
          ref={videoRef}
          transition={{ delay: 0.08, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <source src={`${basePath}/video/tyballs-enquire-hero.mp4`} type="video/mp4" />
          <source src={`${basePath}/video/tyballs-enquire-hero.webm`} type="video/webm" />
        </motion.video>
        <motion.svg
          animate={{ opacity: 1, scale: 1 }}
          aria-hidden="true"
          className="enquiry-cinematic-check"
          initial={{ opacity: 0, scale: 0.92 }}
          transition={{ delay: 0.72, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewBox="0 0 110 100"
        >
          <defs>
            <linearGradient id="enquiry-check-gradient" x1="10" x2="92" y1="58" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ff20c8" />
              <stop offset="0.52" stopColor="#8c42ff" />
              <stop offset="1" stopColor="#178cff" />
            </linearGradient>
          </defs>
          <path className="enquiry-cinematic-check-glow" d="M 10 58 L 38 84 L 92 18" pathLength="1" />
          <path className="enquiry-cinematic-check-line" d="M 10 58 L 38 84 L 92 18" pathLength="1" />
        </motion.svg>
        <div className="enquiry-cinematic-shade" aria-hidden="true" />
        <div className="enquiry-cinematic-copy">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="zip-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Your event starts here
          </motion.p>
          <h1 aria-label={headline} id="enquiry-hero-title">
            {Array.from(headline).map((character, index) => (
              <motion.span
                animate="visible"
                aria-hidden="true"
                custom={index}
                initial="hidden"
                key={`${character}-${index}`}
                variants={characterVariants}
              >
                {character === " " ? "\u00a0" : character}
              </motion.span>
            ))}
          </h1>
        </div>
        <motion.span
          animate={{ opacity: 1, scaleY: 1 }}
          aria-hidden="true"
          className="enquiry-cinematic-rule"
          initial={{ opacity: 0, scaleY: 0 }}
          transition={{ delay: 1.02, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="enquiry-cinematic-intro zip-shell"
        initial={{ opacity: 0, y: 22 }}
        transition={{ delay: 1.04, duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>Share the school, preferred date and likely attendance.</p>
        <p>A DebsGuru coordinator reviews every enquiry before any date or venue is confirmed.</p>
      </motion.div>
    </section>
  );
}
