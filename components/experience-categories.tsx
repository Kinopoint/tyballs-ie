"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = [
  {
    name: "arrival",
    poster: "tyballs-school-arrival-poster.webp",
    video: "tyballs-school-arrival-vertical",
  },
  {
    name: "venue",
    poster: "tyballs-real-event-poster.webp",
    video: "tyballs-real-event-vertical",
  },
  {
    name: "entertainment",
    poster: "tyballs-jenga-poster.webp",
    video: "tyballs-jenga-vertical",
  },
] as const;

export function ExperienceCategories() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const resumeVideos = useCallback(() => {
    if (document.visibilityState !== "visible") return;
    videoRefs.current.forEach((video) => {
      if (video) void video.play().catch(() => undefined);
    });
  }, []);

  useEffect(() => {
    resumeVideos();
    document.addEventListener("visibilitychange", resumeVideos);
    window.addEventListener("pageshow", resumeVideos);

    return () => {
      document.removeEventListener("visibilitychange", resumeVideos);
      window.removeEventListener("pageshow", resumeVideos);
    };
  }, [resumeVideos]);

  return (
    <section className="experience-categories" id="experience" aria-labelledby="experience-title">
      <div className="experience-categories-header zip-shell">
        <div>
          <p className="zip-eyebrow">Your night</p>
          <h2 id="experience-title">Everything in its place.</h2>
        </div>
        <Link className="zip-button-outline" href="/enquire">Booking Enquiry Form</Link>
      </div>
      <p className="experience-categories-hint zip-shell" aria-hidden="true">Swipe to explore <span>→</span></p>
      <div className="experience-category-grid" aria-label="TY Ball experience gallery">
        {categories.map((category, index) => (
          <motion.article
            className="experience-category-card"
            initial={{ opacity: 0, y: 48 }}
            key={category.name}
            transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.1, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <video
              aria-hidden="true"
              autoPlay
              className="experience-category-video"
              loop
              muted
              onCanPlay={resumeVideos}
              playsInline
              poster={`${basePath}/images/${category.poster}`}
              preload="metadata"
              ref={(video) => { videoRefs.current[index] = video; }}
            >
              <source src={`${basePath}/video/${category.video}.webm`} type="video/webm" />
              <source src={`${basePath}/video/${category.video}.mp4`} type="video/mp4" />
            </video>
            <div className="experience-category-overlay" aria-hidden="true" />
            <h3>{category.name}</h3>
            <Link className="experience-category-action" href="/enquire">
              Include {category.name}
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
