import { createFileRoute } from "@tanstack/react-router";
import GoldParticles from "@/components/GoldParticles";
import GaneshReveal from "@/components/GaneshReveal";
import MandalaCorner from "@/components/MandalaCorner";
import ganeshImg from "@/assets/ganesh.asset.png";
import shubhaImg from "@/assets/shubha-vivah.jpg.asset.json?url";
import MusicPlayer from "@/components/MusicPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Sanjana — Shubha Vivah" },
      { name: "description", content: "A cinematic Nepali wedding invitation under the blessings of Lord Ganesh." },
      { property: "og:title", content: "Aarav & Sanjana — Shubha Vivah" },
      { property: "og:description", content: "A cinematic Nepali wedding invitation under the blessings of Lord Ganesh." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Great+Vibes&family=Tiro+Devanagari+Sanskrit&family=Yatra+One&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative w-full overflow-x-hidden text-[color:var(--warm)]">
      <MusicPlayer />

      {/* Scene 1 — Ganesh reveal */}
      <section className="relative min-h-screen w-full vignette">
        <GoldParticles />

        {/* Ornament corners */}
        <MandalaCorner className="absolute left-4 top-4 h-24 w-24 text-[color:var(--royal)]/60 md:h-32 md:w-32" />
        <MandalaCorner className="absolute right-4 top-4 h-24 w-24 -scale-x-100 text-[color:var(--royal)]/60 md:h-32 md:w-32" />
        <MandalaCorner className="absolute bottom-4 left-4 h-24 w-24 -scale-y-100 text-[color:var(--royal)]/60 md:h-32 md:w-32" />
        <MandalaCorner className="absolute bottom-4 right-4 h-24 w-24 -scale-100 text-[color:var(--royal)]/60 md:h-32 md:w-32" />

        <div className="absolute left-1/2 top-8 -translate-x-1/2 text-center">
          <p className="font-serif text-[10px] tracking-[0.5em] text-[color:var(--royal)]/80 md:text-xs">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>

        <GaneshReveal groom="Aarav" bride="Sanjana" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="fade-up font-serif text-xs tracking-[0.45em] uppercase text-[color:var(--warm)]/70">
            Scroll to begin the journey →
          </p>
        </div>

      </section>

      {/* Scene 2 — Invitation (directly after Ganesh - skipping the middle section) */}
      <section className="relative min-h-screen w-full overflow-x-hidden bg-[color:var(--bg)] invitation-bg">
        {/* Ornament corners — same as front for continuity */}
        <MandalaCorner className="absolute left-3 top-3 h-20 w-20 text-[color:var(--royal)]/55 md:h-28 md:w-28" />
        <MandalaCorner className="absolute right-3 top-3 h-20 w-20 -scale-x-100 text-[color:var(--royal)]/55 md:h-28 md:w-28" />
        <MandalaCorner className="absolute bottom-3 left-3 h-20 w-20 -scale-y-100 text-[color:var(--royal)]/55 md:h-28 md:w-28" />
        <MandalaCorner className="absolute bottom-3 right-3 h-20 w-20 -scale-100 text-[color:var(--royal)]/55 md:h-28 md:w-28" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-24 pt-16 md:pt-24">
          {/* Section 1 — Divine Beginning */}
          <section className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 -m-6 rounded-full bg-[radial-gradient(circle,rgba(246,196,83,0.35),transparent_70%)] aura-pulse" />
              <img
                src={ganeshImg}
                alt="Lord Ganesh"
                draggable={false}
                className="relative h-28 w-28 select-none object-contain ganesh-shimmer md:h-36 md:w-36"
              />
            </div>

            <div className="mt-6 space-y-2 font-[Tiro_Devanagari_Sanskrit,serif] text-[color:var(--warm)]">
              <p className="reveal-line text-gold-gradient text-base md:text-lg" style={{ animationDelay: "0.2s" }}>
                ॐ श्री गणेशाय नमः
              </p>
              <p className="reveal-line text-sm leading-relaxed text-[color:var(--warm)]/90 md:text-base" style={{ animationDelay: "0.9s" }}>
                वक्रतुंड महाकाय सूर्यकोटि समप्रभ।
              </p>
              <p className="reveal-line text-sm leading-relaxed text-[color:var(--warm)]/90 md:text-base" style={{ animationDelay: "1.6s" }}>
                निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
              </p>
            </div>
          </section>

          <div className="gold-divider my-12 w-56 reveal-line" style={{ animationDelay: "2.2s" }} />

          {/* Section 2 — Shubha Vivah */}
          <section className="relative w-full reveal-zoom" style={{ animationDelay: "2.4s" }}>
            <div className="relative mx-auto w-full max-w-2xl">
              {/* Breathing golden glow behind the title area */}
              <div className="pointer-events-none absolute inset-0 -m-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(246,196,83,0.35),transparent_65%)] glow-breathe" />
              {/* Sparkle dots */}
              <span className="spark spark-1" />
              <span className="spark spark-2" />
              <span className="spark spark-3" />
              <span className="spark spark-4" />
              <img
                src={shubhaImg}
                alt="शुभ विवाह"
                draggable={false}
                className="relative block w-full select-none rounded-xl shubha-blend"
              />
            </div>
          </section>

          {/* Section 3 — Couple */}
          <section className="mt-16 flex flex-col items-center text-center">
            <h1
              className="font-[Yatra_One,serif] text-gold-gradient reveal-line"
              style={{ fontSize: "clamp(2.4rem, 8vw, 4.5rem)", animationDelay: "3.2s", textShadow: "0 0 30px rgba(246,196,83,0.35)" }}
            >
              आशीष <span className="mx-2 text-[color:var(--royal)]">💛</span> आयुषी
            </h1>
            <p
              className="mt-8 max-w-2xl font-[Tiro_Devanagari_Sanskrit,serif] leading-loose text-[color:var(--warm)]/85 reveal-line"
              style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", animationDelay: "4s" }}
            >
              सुपुत्र: श्री [वरका बाबुको नाम] तथा श्रीमती [वरकी आमाको नाम] र सुपुत्री: श्रीमती [वधुको नाम] तथा श्री [वधुका बाबुको नाम]
            </p>
          </section>

          <div className="gold-divider my-12 w-56 reveal-line" style={{ animationDelay: "4.6s" }} />

          {/* Section 4 — Invitation message */}
          <section className="reveal-soft text-center" style={{ animationDelay: "4.8s" }}>
            <p
              className="mx-auto max-w-2xl font-[Tiro_Devanagari_Sanskrit,serif] leading-loose text-[color:var(--warm)]/90"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
            >
              को सुखद अवसरमा उपस्थित भई वर-वधुलाई आशीर्वाद प्रदान गरिदिनुहुन यहाँ निमन्त्रण गर्दछौं।
            </p>
            <p className="mt-10 font-serif text-[10px] tracking-[0.5em] uppercase text-[color:var(--royal)]/80">
              ॥ Shubha Vivah ॥
            </p>
          </section>
        </div>
      </section>

    </main>
  );
}
