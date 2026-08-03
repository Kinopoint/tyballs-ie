import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Brand({ full = false }: { full?: boolean }) {
  return (
    <Link className={`brand${full ? " brand-full" : ""}`} href="/" aria-label="TYBalls.ie home">
      <span className="brand-sign" aria-hidden="true" style={full ? { backgroundImage: `linear-gradient(rgba(6, 11, 29, 0.18), rgba(6, 11, 29, 0.18)), url(${basePath}/images/tyballs-neon-frame.webp)` } : undefined}>
        <span className="brand-wordmark"><span>TYBalls</span><span className="brand-ie">.ie</span></span>
        {full ? <span className="brand-origin">From the team behind DebsGuru.ie</span> : null}
        <svg className="brand-rhythm" viewBox="0 0 96 15" focusable="false">
          <path d="M1 8C26 4 57 4 95 7" />
        </svg>
      </span>
    </Link>
  );
}
