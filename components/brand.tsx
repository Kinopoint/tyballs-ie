import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Brand({ full = false }: { full?: boolean }) {
  const asset = "tyballs-client-logo-sign";

  return (
    <Link className={`brand${full ? " brand-full" : ""}`} href="/" aria-label="TYBalls.ie home">
      {full ? (
        <picture className="brand-picture">
          <source srcSet={`${basePath}/brand/${asset}.webp`} type="image/webp" />
          <img alt="" height={640} src={`${basePath}/brand/${asset}.jpg`} width={1390} />
        </picture>
      ) : (
        <span className="brand-lockup" aria-hidden="true">
          <span className="brand-dotfield" />
          <span className="brand-wordmark"><strong>TY</strong>Balls<span>.ie</span></span>
          <span className="brand-rhythm" />
        </span>
      )}
    </Link>
  );
}
