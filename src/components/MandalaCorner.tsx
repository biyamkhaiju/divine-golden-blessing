export default function MandalaCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" stroke="currentColor" strokeWidth="0.6">
      <g opacity="0.85">
        <path d="M0 80 Q40 80 80 40 T160 0" />
        <path d="M0 60 Q50 60 80 30" opacity="0.6" />
        <path d="M0 100 Q60 100 100 60 T160 20" opacity="0.4" />
        <circle cx="80" cy="40" r="3" />
        <circle cx="40" cy="80" r="3" />
        <circle cx="60" cy="60" r="1.5" />
        <path d="M50 70 q10 -20 30 -25 q-5 15 -10 25 z" opacity="0.55" />
        <path d="M30 90 q20 -10 35 -5 q-15 8 -25 15 z" opacity="0.35" />
        <path d="M10 110 l5 -3 M20 100 l5 -3 M30 90 l5 -3" />
      </g>
    </svg>
  );
}
