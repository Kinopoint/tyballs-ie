"use client";

import { useEffect, useState } from "react";
import { EventIcon } from "@/components/event-icon";

const cards = [
  ["venue", "Venue, date and location set the starting point."],
  ["guests", "A realistic guest estimate shapes capacity and cost."],
  ["dining", "Dinner, service and dietary needs form one part."],
  ["music", "Entertainment follows the committee’s priorities."],
] as const;

export function CostFactorRotator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % cards.length), 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="cost-rotator">
      <div className="cost-rotator-cards" aria-live="polite">
        {cards.map(([icon, text], index) => (
          <div aria-hidden={active !== index} className={`cost-rotator-card${active === index ? " is-active" : ""}`} key={text}>
            <EventIcon name={icon} />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="cost-rotator-dots" aria-label="Pricing factors">
        {cards.map(([, text], index) => (
          <button aria-label={`Show: ${text}`} aria-pressed={active === index} key={text} onClick={() => setActive(index)} type="button" />
        ))}
      </div>
    </div>
  );
}
