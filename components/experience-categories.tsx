"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomePage, Media } from "@/payload-types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = [
  {
    name: "beautiful venues",
    poster: "tyballs-school-arrival-poster.webp",
    video: "tyballs-school-arrival-vertical",
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

function mediaUrl(media: string | Media | null | undefined) {
  return typeof media === "object" && media?.url ? media.url : null;
}

type ViewportVideoProps = {
  cmsVideo: string | null;
  fallbackVideo: string;
  poster: string;
};

function ViewportVideo({ cmsVideo, fallbackVideo, poster }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = useRef(false);
  const [sourcesReady, setSourcesReady] = useState(false);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (sourcesReady && shouldPlay.current && document.visibilityState === "visible") {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [sourcesReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sourceObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setSourcesReady(true);
      sourceObserver.disconnect();
    }, { rootMargin: "240px 20%", threshold: 0 });

    sourceObserver.observe(video);
    return () => sourceObserver.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playbackObserver = new IntersectionObserver(([entry]) => {
      shouldPlay.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      syncPlayback();
    }, { threshold: [0, 0.35] });
    const pause = () => video.pause();

    playbackObserver.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pageshow", syncPlayback);
    window.addEventListener("pagehide", pause);

    return () => {
      playbackObserver.disconnect();
      video.pause();
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pageshow", syncPlayback);
      window.removeEventListener("pagehide", pause);
    };
  }, [syncPlayback]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourcesReady) return;
    video.load();
    syncPlayback();
  }, [sourcesReady, syncPlayback]);

  return (
    <video
      aria-hidden="true"
      className="experience-category-video"
      loop
      muted
      onCanPlay={syncPlayback}
      playsInline
      poster={poster}
      preload="none"
      ref={videoRef}
    >
      {sourcesReady && (cmsVideo
        ? <source src={cmsVideo} />
        : <>
            <source src={`${basePath}/video/${fallbackVideo}.mp4`} type="video/mp4" />
            <source src={`${basePath}/video/${fallbackVideo}.webm`} type="video/webm" />
          </>)}
    </video>
  );
}

export function ExperienceCategories({ content }: { content?: HomePage["experience"] }) {
  const displayCategories = content?.categories?.length ? content.categories : categories;

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
        {displayCategories.map((category, index) => {
          const cmsVideo = "video" in category ? mediaUrl(category.video) : null;
          const cmsPoster = "poster" in category ? mediaUrl(category.poster) : null;
          const fallbackVideo = "video" in category && typeof category.video === "string" ? category.video : "";
          const fallbackPoster = "poster" in category && typeof category.poster === "string" ? category.poster : "";
          return (
          <motion.article
            className="experience-category-card"
            initial={{ opacity: 0, y: 48 }}
            key={category.name}
            transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.1, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <ViewportVideo
              cmsVideo={cmsVideo}
              fallbackVideo={fallbackVideo}
              poster={cmsPoster ?? `${basePath}/images/${fallbackPoster}`}
            />
            <div className="experience-category-overlay" aria-hidden="true" />
            <h3>{category.name}</h3>
            <Link
              aria-label={`Enquire about ${category.name}`}
              className="experience-category-link"
              href="/enquire"
            />
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}
