"use client";

import { motion } from "motion/react";
import { EditorialImage } from "@/components/editorial-image";

const ease = [0.22, 1, 0.36, 1] as const;

export function CommitteeVisual() {
  return (
    <section className="committee-visual" aria-label="TY Ball committee planning">
      <motion.div
        animate={{ scale: [1.025, 1.075, 1.025] }}
        className="committee-visual-image-plane"
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
      >
        <EditorialImage alt="Students talking together at a real DebsGuru event venue" className="committee-visual-picture" height={1500} name="drive-garden" priority={false} width={1000} />
      </motion.div>
      <div className="committee-visual-shade" aria-hidden="true" />
      <div className="committee-visual-grid" aria-hidden="true" />
      <span className="committee-visual-brand" aria-hidden="true">TYBalls.ie</span>
      <motion.div
        className="committee-visual-copy"
        initial="hidden"
        transition={{ staggerChildren: 0.12 }}
        viewport={{ amount: 0.35, once: true }}
        whileInView="visible"
      >
        <motion.p className="committee-visual-eyebrow" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, transition: { duration: 0.55, ease }, y: 0 } }}>For TY committees</motion.p>
        <motion.h3 variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.68, ease } } }}>Plan with <span>clarity</span></motion.h3>
        <motion.p className="committee-visual-description" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, transition: { duration: 0.58, ease }, y: 0 } }}>Five useful details are enough to begin shaping the event.</motion.p>
        <motion.a className="committee-visual-link" href="#committee-checklist" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, transition: { duration: 0.55, ease }, y: 0 } }}>
          <span>See the five things</span><i aria-hidden="true">↓</i>
        </motion.a>
      </motion.div>
      <span className="committee-visual-dots" aria-hidden="true"><i /><i /><i /></span>
    </section>
  );
}
