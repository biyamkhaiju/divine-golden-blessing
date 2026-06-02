import { useEffect, useRef } from "react";

/** Ambient floating gold dust + bokeh, drawn on a single canvas (GPU-friendly). */
export default function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    let raf = 0;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number;
      t: number;
      type: 0 | 1;
    };
    let parts: P[] = [];

    const resize = () => {
      w = cvs.clientWidth;
      h = cvs.clientHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(180, Math.floor((w * h) / 9000));
      parts = Array.from({ length: count }, () => spawn());
    };

    const spawn = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2,
      type: Math.random() > 0.92 ? 1 : 0,
    });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.01;
        p.x += p.vx + Math.sin(p.t) * 0.15;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) Object.assign(p, spawn(), { y: h + 10 });
        const flicker = 0.7 + Math.sin(p.t * 2) * 0.3;
        if (p.type === 1) {
          // bokeh
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 14);
          g.addColorStop(0, `rgba(255,215,122,${0.35 * p.a * flicker})`);
          g.addColorStop(1, "rgba(255,215,122,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 14, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255,230,170,${p.a * flicker})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
