"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EventIcon } from "@/components/event-icon";

const cards = [
  ["venue", "Venue, date and location set the starting point."],
  ["guests", "A realistic guest estimate shapes capacity and cost."],
  ["dining", "Dinner, service and dietary needs form one part."],
  ["music", "Entertainment follows the committee’s priorities."],
] as const;

export function CostFactorRotator() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % cards.length), 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="cost-rotator">
      <div className="cost-rotator-cards" aria-live="polite">
        <AnimatePresence initial={false} mode="sync">
          <motion.div animate={{ opacity: 1, y: 0 }} className="cost-rotator-card is-active" exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} initial={reduceMotion ? false : { opacity: 0, y: 12 }} key={cards[active][1]} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
            <EventIcon name={cards[active][0]} />
            <p>{cards[active][1]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="cost-rotator-dots" aria-label="Pricing factors">
        {cards.map(([, text], index) => (
          <button aria-label={`Show: ${text}`} aria-pressed={active === index} key={text} onClick={() => setActive(index)} type="button" />
        ))}
      </div>
    </div>
  );
}
