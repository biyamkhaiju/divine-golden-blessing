import { useEffect, useRef, useState } from "react";
import ganeshImg from "@/assets/ganesh.asset.png";
import SpinningChakra from "./SpinningChakra";

/**
 * Ganesh reveal → dismantle → handwritten names.
 * Phases: idle → breathing (with spinning chakra) → dismantle → names
 */
export default function GaneshReveal({ bride, groom }: { bride: string; groom: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"idle" | "breathing" | "dismantle" | "names">("idle");
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("breathing"), 50);
    const t2 = setTimeout(() => setPhase("dismantle"), 6000);
    const t3 = setTimeout(() => setPhase("names"), 7800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Dismantle: Ganesh particles morph directly into the names
  useEffect(() => {
    if (phase !== "dismantle" && phase !== "names") return;
    if (!imgReady) return;
    const cvs = canvasRef.current!;
    const img = imgRef.current!;
    const ctx = cvs.getContext("2d", { willReadFrequently: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const W = cvs.clientWidth, H = cvs.clientHeight;
    cvs.width = W * dpr; cvs.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Sample silhouette from transparent PNG
    const off = document.createElement("canvas");
    const targetW = Math.min(380, Math.floor(W * 0.5));
    const ratio = img.naturalHeight / img.naturalWidth;
    const targetH = Math.floor(targetW * ratio);
    off.width = targetW; off.height = targetH;
    const octx = off.getContext("2d", { willReadFrequently: true })!;
    try { octx.drawImage(img, 0, 0, targetW, targetH); } catch { return; }
    let data: Uint8ClampedArray;
    try { data = octx.getImageData(0, 0, targetW, targetH).data; } catch { return; }

    const imgCx = W / 2;
    const imgCy = H / 2 - 20;
    const ox = imgCx - targetW / 2;
    const oy = imgCy - targetH / 2;

    const srcPoints: { x: number; y: number }[] = [];
    const step = 4;
    for (let y = 0; y < targetH; y += step) {
      for (let x = 0; x < targetW; x += step) {
        const i = (y * targetW + x) * 4;
        if (data[i + 3] > 80) srcPoints.push({ x: ox + x, y: oy + y });
      }
    }

    // Target text sample points
    const tcv = document.createElement("canvas");
    tcv.width = W; tcv.height = H;
    const tctx = tcv.getContext("2d")!;
    tctx.fillStyle = "#fff";
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    const big = Math.min(W * 0.13, 130);
    tctx.font = `400 ${big}px "Great Vibes", "Cinzel Decorative", serif`;
    tctx.fillText(groom, W / 2, H / 2 - big * 0.55);
    tctx.fillText(bride, W / 2, H / 2 + big * 0.55);
    const tdata = tctx.getImageData(0, 0, W, H).data;
    const textPoints: { x: number; y: number }[] = [];
    for (let y = 0; y < H; y += 4) {
      for (let x = 0; x < W; x += 4) {
        if (tdata[(y * W + x) * 4 + 3] > 128) textPoints.push({ x, y });
      }
    }

    type P = {
      sx: number; sy: number; tx: number; ty: number;
      delay: number; size: number; hue: number;
    };
    const N = Math.min(srcPoints.length, textPoints.length > 0 ? Math.max(textPoints.length, 2200) : 2200);
    const particles: P[] = Array.from({ length: N }, (_, i) => {
      const s = srcPoints[i % srcPoints.length];
      const t = textPoints.length > 0
        ? textPoints[i % textPoints.length]
        : { x: s.x, y: s.y };
      return {
        sx: s.x, sy: s.y, tx: t.x, ty: t.y,
        delay: Math.random() * 0.35,
        size: Math.random() * 1.3 + 0.5,
        hue: 38 + Math.random() * 14,
      };
    });

    const start = performance.now();
    const DUR = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const t = Math.min(1, Math.max(0, (elapsed / DUR) - p.delay));
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const cx = (p.sx + p.tx) / 2 + Math.sin(e * Math.PI) * 30;
        const cy = (p.sy + p.ty) / 2 - Math.sin(e * Math.PI) * 70;
        const mx = (1 - e) * (1 - e) * p.sx + 2 * (1 - e) * e * cx + e * e * p.tx;
        const my = (1 - e) * (1 - e) * p.sy + 2 * (1 - e) * e * cy + e * e * p.ty;
        const fade = t < 0.1 ? t * 10 : 1;
        const r = p.size * (1 + Math.sin(elapsed * 0.005 + p.delay * 10) * 0.25);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${fade})`;
        ctx.beginPath(); ctx.arc(mx, my, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${fade * 0.2})`;
        ctx.beginPath(); ctx.arc(mx, my, r * 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (elapsed < DUR + 800) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, bride, groom, imgReady]);

  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden">
      {/* Spinning religious chakra behind Ganesh */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "breathing" || phase === "dismantle" ? "opacity-100" : "opacity-30"
        }`}
      >
        <SpinningChakra />
      </div>

      {/* Transparent Ganesh PNG with animated edge glow */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1200ms] ease-out ${
          phase === "breathing" ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          ref={imgRef}
          src={ganeshImg}
          alt="Lord Ganesh blessing"
          crossOrigin="anonymous"
          onLoad={() => setImgReady(true)}
          className="select-none ganesh-edge-glow"
          style={{
            width: "min(58vmin, 440px)",
            height: "auto",
            userSelect: "none",
            WebkitUserDrag: "none",
          } as React.CSSProperties}
          draggable={false}
        />
      </div>

      {/* Particle morph layer */}
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500 ${
          phase === "dismantle" || phase === "names" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Handwritten names reveal */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
          phase === "names" ? "opacity-100" : "opacity-0"
        }`}
      >
        <HandwrittenName text={groom} delay={0.1} />
        <span className="my-1 font-serif italic text-[color:var(--royal)]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.8rem)" }}>&</span>
        <HandwrittenName text={bride} delay={1.4} />
        <div className="mt-8 flex items-center gap-3 opacity-80">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[color:var(--royal)]" />
          <span className="font-serif tracking-[0.4em] text-[color:var(--warm)]/80 text-xs uppercase">Shubha Vivah</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[color:var(--royal)]" />
        </div>
      </div>
    </div>
  );
}

function HandwrittenName({ text, delay }: { text: string; delay: number }) {
  return (
    <svg
      viewBox="0 0 800 180"
      className="w-[88vw] max-w-[760px]"
      style={{ height: "clamp(90px, 16vw, 170px)" }}
      aria-label={text}
    >
      <defs>
        <linearGradient id={`g-${text}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="45%" stopColor="#FFD77A" />
          <stop offset="100%" stopColor="#B8881F" />
        </linearGradient>
        <filter id={`glow-${text}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <text
        x="400" y="115"
        textAnchor="middle"
        fontFamily='"Great Vibes", "Cinzel Decorative", cursive'
        fontSize="140"
        fontWeight="400"
        fill="none"
        stroke="#FFD77A"
        strokeWidth="1.4"
        className="handwrite-stroke"
        style={{ animationDelay: `${delay}s` }}
        filter={`url(#glow-${text})`}
      >{text}</text>
      <text
        x="400" y="115"
        textAnchor="middle"
        fontFamily='"Great Vibes", "Cinzel Decorative", cursive'
        fontSize="140"
        fontWeight="400"
        fill={`url(#g-${text})`}
        className="handwrite-fill"
        style={{ animationDelay: `${delay + 1.2}s` }}
      >{text}</text>
    </svg>
  );
}
