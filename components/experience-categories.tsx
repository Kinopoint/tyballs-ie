"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = [
  {
    name: "beautiful venues",
    poster: "tyballs-beautiful-venues-poster.webp",
    video: "tyballs-beautiful-venues-vertical",
  },
  {
    name: "dinner",
    poster: "tyballs-real-event-poster.webp",
    video: "tyballs-real-event-vertical",
  },
  {
    name: "photobooth",
    poster: "tyballs-photobooth-poster.webp",
    video: "tyballs-photobooth-vertical",
  },
  {
    name: "professional DJs",
    poster: "tyballs-disco-poster.webp",
    video: "tyballs-disco-vertical",
  },
] as const;

export function ExperienceCategories() {
  const visibleVideos = useRef(new Set<HTMLVideoElement>());
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const resumeVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      if (document.visibilityState === "visible" && visibleVideos.current.has(video)) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, []);

  useEffect(() => {
    const visibility = visibleVideos.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
          visibility.add(video);
        } else {
          visibility.delete(video);
        }
      });
      resumeVideos();
    }, { threshold: [0, 0.18] });

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    document.addEventListener("visibilitychange", resumeVideos);
    window.addEventListener("pageshow", resumeVideos);

    return () => {
      observer.disconnect();
      visibility.clear();
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
              <source src={`${basePath}/video/${category.video}.mp4`} type="video/mp4" />
              <source src={`${basePath}/video/${category.video}.webm`} type="video/webm" />
            </video>
            <div className="experience-category-overlay" aria-hidden="true" />
            <h3>{category.name}</h3>
            <Link
              aria-label={`Enquire about ${category.name}`}
              className="experience-category-link"
              href="/enquire"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
