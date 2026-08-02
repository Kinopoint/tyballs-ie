import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="TY Balls home">
      <span className="brand-mark" aria-hidden="true">
        TY
      </span>
      <span className="brand-name">
        TY <strong>Balls</strong>
        <small>.ie</small>
      </span>
    </Link>
  );
}
