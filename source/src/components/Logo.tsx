/**
 * JE monogram (the "A5" mark): a shared vertical stem — E's bars read right,
 * the J's hook curves off the bottom-left — knocked out of a solid tile.
 * The tile fills with `currentColor`; set text-ink (or any colour) on a parent.
 */
interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Joshua Edwards"
    >
      <rect x="6" y="6" width="88" height="88" rx="20" fill="currentColor" />
      <g
        fill="none"
        stroke="var(--fn-surface)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(50 50) scale(0.8) translate(-50 -50)"
      >
        <path d="M46 24 H74 M46 47 H66 M46 70 H74" />
        <path d="M46 24 V79 Q46 84 37 84 Q29 84 29 77" />
      </g>
    </svg>
  );
}
