/**
 * Ornate religious chakra — multi-layered counter-rotating mandala.
 * Pure SVG, no raster artefacts. Designed to look genuinely sacred.
 */
export default function SpinningChakra({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}
    >
      {/* Soft golden aura */}
      <div
        className="absolute rounded-full"
        style={{
          width: "min(78vmin, 600px)",
          height: "min(78vmin, 600px)",
          background:
            "radial-gradient(circle, rgba(246,196,83,0.38) 0%, rgba(246,196,83,0.14) 40%, rgba(122,31,38,0.05) 65%, transparent 78%)",
          animation: "chakra-pulse 5s ease-in-out infinite",
          filter: "blur(6px)",
        }}
      />

      {/* OUTER RING — 96s forward spin: dotted halo + 36 ray petals */}
      <svg
        viewBox="-320 -320 640 640"
        className="absolute"
        style={{
          width: "min(96vmin, 780px)",
          height: "min(96vmin, 780px)",
          animation: "chakra-spin 96s linear infinite",
          filter: "drop-shadow(0 0 18px rgba(246,196,83,0.55))",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldStroke" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#FFD77A" />
            <stop offset="100%" stopColor="#B8881F" />
          </linearGradient>
          <radialGradient id="petalFill" cx="0" cy="-0.5" r="1">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B8881F" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        <circle r="305" fill="none" stroke="url(#goldStroke)" strokeWidth="0.6" opacity="0.55" />
        <circle
          r="290"
          fill="none"
          stroke="#FFD77A"
          strokeWidth="0.4"
          strokeDasharray="1 5"
          opacity="0.65"
        />
        <circle r="260" fill="none" stroke="url(#goldStroke)" strokeWidth="1.1" opacity="0.7" />
        <circle r="252" fill="none" stroke="#F6C453" strokeWidth="0.5" opacity="0.4" />

        {/* 36 outer rays */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 360) / 36;
          return (
            <g key={`r${i}`} transform={`rotate(${a})`}>
              <path d="M 0 -302 L 4 -262 L -4 -262 Z" fill="url(#petalFill)" opacity="0.85" />
              <circle cy="-312" r="1.6" fill="#FFF2D6" opacity="0.95" />
            </g>
          );
        })}

        {/* 18 larger lotus petals between */}
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i * 360) / 18 + 5;
          return (
            <g key={`p${i}`} transform={`rotate(${a})`}>
              <path
                d="M 0 -250 Q 20 -225 12 -200 Q 0 -210 -12 -200 Q -20 -225 0 -250 Z"
                fill="url(#petalFill)"
                stroke="#FFD77A"
                strokeWidth="0.5"
                opacity="0.7"
              />
            </g>
          );
        })}
      </svg>

      {/* MID RING — counter spin 64s: 24 sharp spokes + scallops */}
      <svg
        viewBox="-220 -220 440 440"
        className="absolute"
        style={{
          width: "min(68vmin, 540px)",
          height: "min(68vmin, 540px)",
          animation: "chakra-spin-rev 64s linear infinite",
          filter: "drop-shadow(0 0 12px rgba(255,215,122,0.65))",
        }}
        aria-hidden="true"
      >
        <circle r="205" fill="none" stroke="#FFD77A" strokeWidth="0.8" opacity="0.55" />
        <circle
          r="180"
          fill="none"
          stroke="#F6C453"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        <circle r="160" fill="none" stroke="#FFD77A" strokeWidth="0.6" opacity="0.5" />

        {/* 24 dharma spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          return (
            <g key={`s${i}`} transform={`rotate(${a})`}>
              <line
                x1="0"
                y1="-160"
                x2="0"
                y2="-200"
                stroke="#FFD77A"
                strokeWidth="0.9"
                opacity="0.75"
              />
              <circle cy="-205" r="1.4" fill="#FFF2D6" opacity="0.9" />
            </g>
          );
        })}

        {/* Scalloped inner ring */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i * 360) / 48;
          return (
            <g key={`sc${i}`} transform={`rotate(${a})`}>
              <circle cy="-170" r="2.2" fill="#F6C453" opacity="0.55" />
            </g>
          );
        })}
      </svg>

      {/* INNER LOTUS — 40s forward spin: 8 large lotus petals + bindu */}
      <svg
        viewBox="-140 -140 280 280"
        className="absolute"
        style={{
          width: "min(42vmin, 340px)",
          height: "min(42vmin, 340px)",
          animation: "chakra-spin 40s linear infinite",
          filter: "drop-shadow(0 0 10px rgba(255,215,122,0.75))",
        }}
        aria-hidden="true"
      >
        {/* 8 lotus petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 360) / 8;
          return (
            <g key={`l${i}`} transform={`rotate(${a})`}>
              <path
                d="M 0 -60 Q 36 -90 0 -135 Q -36 -90 0 -60 Z"
                fill="url(#petalFill)"
                stroke="#FFD77A"
                strokeWidth="0.8"
                opacity="0.85"
              />
            </g>
          );
        })}
        {/* 8 mini petals offset */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 360) / 8 + 22.5;
          return (
            <g key={`lm${i}`} transform={`rotate(${a})`}>
              <path
                d="M 0 -55 Q 16 -75 0 -100 Q -16 -75 0 -55 Z"
                fill="none"
                stroke="#FFD77A"
                strokeWidth="0.6"
                opacity="0.65"
              />
            </g>
          );
        })}
        <circle r="50" fill="none" stroke="#FFD77A" strokeWidth="0.6" opacity="0.6" />
        <circle r="36" fill="none" stroke="#F6C453" strokeWidth="0.5" opacity="0.55" />
      </svg>
    </div>
  );
}
