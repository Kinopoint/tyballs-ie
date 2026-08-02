type EventIconName = "calendar" | "camera" | "contact" | "dining" | "guests" | "music" | "route" | "shield" | "spark" | "venue";

export function EventIcon({ name }: { name: EventIconName }) {
  const paths: Record<EventIconName, React.ReactNode> = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" /><circle cx="12" cy="14" r="4" /></>,
    contact: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0M18 4l2 2 3-3" /></>,
    dining: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 5 4 8h-4" /></>,
    guests: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" /></>,
    music: <><path d="M9 18V5l11-2v13M9 9l11-2" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
    route: <><circle cx="6" cy="18" r="3" /><circle cx="18" cy="6" r="3" /><path d="M8 16c2-2 1-5 4-6s3 0 4-2" /></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    spark: <><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    venue: <><path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01" /></>,
  };

  return <span className="event-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">{paths[name]}</svg></span>;
}
