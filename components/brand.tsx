import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="TYBalls.ie home">
      <span className="brand-wordmark" aria-hidden="true">
        <span>TYBalls</span>
        <span className="brand-ie">.ie</span>
        <svg className="brand-rhythm" viewBox="0 0 96 15" focusable="false">
          <path d="M1 12C23 1 54 1 95 6" />
        </svg>
      </span>
    </Link>
  );
}
