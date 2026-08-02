import Image from "next/image";

export type EventIconName = "calendar" | "camera" | "contact" | "dining" | "guests" | "music" | "route" | "shield" | "spark" | "venue";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function EventIcon({ name }: { name: EventIconName }) {
  return <span aria-hidden="true" className="event-icon"><Image alt="" height={44} src={`${basePath}/icons/${name}.png`} unoptimized width={44} /></span>;
}
