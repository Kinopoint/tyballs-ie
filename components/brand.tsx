import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Brand({ full = false }: { full?: boolean }) {
  const asset = full ? "tyballs-client-logo-full" : "tyballs-client-logo-sign";

  return (
    <Link className={`brand${full ? " brand-full" : ""}`} href="/" aria-label="TYBalls.ie home">
      <picture className="brand-picture">
        <source srcSet={`${basePath}/brand/${asset}.webp`} type="image/webp" />
        <img
          alt=""
          height={full ? 1069 : 640}
          src={`${basePath}/brand/${asset}.jpg`}
          width={full ? 1471 : 1390}
        />
      </picture>
    </Link>
  );
}
