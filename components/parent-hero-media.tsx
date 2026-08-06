"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import type { PointerEvent } from "react";
import { EditorialImage } from "@/components/editorial-image";

const columns = 12;
const rows = 8;
const pixels = Array.from({ length: columns * rows }, (_, index) => ({
  column: index % columns,
  index,
  row: Math.floor(index / columns),
}));

const mediaVariants = {
  covered: { opacity: 1, scale: 1 },
  revealed: { opacity: 1, scale: 1 },
  hover: { opacity: 1, scale: 1 },
};

const pixelVariants = {
  covered: { opacity: 1, scale: 1.04 },
  revealed: ({ column, row }: { column: number; row: number }) => ({
    opacity: 0,
    scale: 0,
    transition: { delay: 0.2 + (row + column) * 0.075, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
  hover: ({ column, row }: { column: number; row: number }) => ({
    opacity: 1,
    scale: 1.02,
    transition: { delay: (row + column) * 0.014, duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const floatingPixels = [
  { left: 5, top: 18, size: 11, strength: 0.28, tone: "magenta" },
  { left: 11, top: 31, size: 7, strength: 0.2, tone: "violet" },
  { left: 88, top: 22, size: 9, strength: 0.3, tone: "cyan" },
  { left: 92, top: 39, size: 5, strength: 0.18, tone: "violet" },
  { left: 80, top: 82, size: 12, strength: 0.24, tone: "cyan" },
  { left: 7, top: 76, size: 6, strength: 0.16, tone: "magenta" },
] as const;

type FloatingPixelProps = {
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  pixel: (typeof floatingPixels)[number];
};

function FloatingPixel({ index, pixel, pointerX, pointerY }: FloatingPixelProps) {
  const x = useTransform(pointerX, (value) => value * pixel.strength);
  const y = useTransform(pointerY, (value) => value * pixel.strength);

  return (
    <motion.span
      className={`parent-hero-floating-pixel is-${pixel.tone}`}
      style={{ height: pixel.size, left: `${pixel.left}%`, top: `${pixel.top}%`, width: pixel.size, x, y }}
    >
      <motion.span
        animate={{ opacity: [0.55, 1, 0.55], y: [0, -6, 0] }}
        transition={{ delay: 0.9 + index * 0.18, duration: 3.4 + index * 0.24, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.span>
  );
}

export function ParentHeroMedia() {
  const reduceMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 22, mass: 0.55, stiffness: 105 });
  const smoothY = useSpring(pointerY, { damping: 22, mass: 0.55, stiffness: 105 });
  const imageX = useTransform(smoothX, (value) => value * -0.07);
  const imageY = useTransform(smoothY, (value) => value * -0.07);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left - bounds.width / 2);
    pointerY.set(event.clientY - bounds.top - bounds.height / 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      animate="revealed"
      className="zip-parent-placeholder parent-hero-media-effect"
      initial="covered"
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      variants={mediaVariants}
      whileHover="hover"
    >
      <motion.div className="parent-hero-image-plane" style={{ x: imageX, y: imageY }}>
        <EditorialImage alt="Students attending a real DebsGuru event" className="parent-hero-effect-picture" height={1367} name="drive-arrival" priority width={1000} />
      </motion.div>
      <div className="parent-hero-image-shade" aria-hidden="true" />
      <div className="parent-hero-pixel-grid" aria-hidden="true">
        {pixels.map(({ column, index, row }) => (
          <motion.span
            className={(row + column) % 13 === 0 ? "is-accent" : undefined}
            custom={{ column, row }}
            key={index}
            variants={pixelVariants}
          />
        ))}
      </div>
      <span className="parent-hero-neon-frame" aria-hidden="true" />
      <div className="parent-hero-floating-pixels" aria-hidden="true">
        {floatingPixels.map((pixel, index) => (
          <FloatingPixel index={index} key={`${pixel.left}-${pixel.top}`} pixel={pixel} pointerX={smoothX} pointerY={smoothY} />
        ))}
      </div>
    </motion.div>
  );
}
