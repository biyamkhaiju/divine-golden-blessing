import { createFileRoute } from "@tanstack/react-router";
import GoldParticles from "@/components/GoldParticles";
import GaneshReveal from "@/components/GaneshReveal";
import MandalaCorner from "@/components/MandalaCorner";
import WeddingMusic from "@/components/WeddingMusic";

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
        href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap",
      },

    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden vignette text-[color:var(--warm)]">
      {/* Scene 1 — Ganesh reveal */}
      <section className="relative">
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
          <p className="fade-up font-serif text-xs tracking-[0.45em] uppercase text-[color:var(--warm)]/70" style={{ animationDelay: "8s", animationFillMode: "both" }}>
            Scroll to begin the journey
          </p>
        </div>
      </section>

      {/* Scene 2 — Invitation */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="gold-divider mx-auto w-40" />
          <p className="mt-8 font-serif italic text-[color:var(--warm)]/80" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
            Together with their families
          </p>
          <p className="mt-3 font-serif italic text-[color:var(--warm)]/80" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
            request the pleasure of your presence
          </p>
          <p className="mt-3 font-serif italic text-[color:var(--warm)]/80" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
            at their wedding celebration
          </p>

          <div className="mt-14">
            <h2 className="font-display shimmer" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              Aarav <span className="font-serif italic text-[color:var(--royal)]">&</span> Sanjana
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              { label: "Date", value: "Kartik 22, 2083" },
              { label: "Venue", value: "Hyatt Regency, Kathmandu" },
              { label: "Muhurta", value: "7:45 PM" },
            ].map((it) => (
              <div key={it.label}>
                <p className="font-serif text-[10px] tracking-[0.4em] uppercase text-[color:var(--royal)]/80">{it.label}</p>
                <p className="mt-2 font-display text-gold-gradient" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)" }}>{it.value}</p>
              </div>
            ))}
          </div>

          <div className="gold-divider mx-auto mt-16 w-40" />

          {/* Music Player */}
          <div className="mt-10">
            <WeddingMusic />
          </div>

          <p className="mt-10 font-serif text-[10px] tracking-[0.5em] uppercase text-[color:var(--warm)]/60">
            ॥ Shubha Vivah ॥
          </p>
        </div>
      </section>
    </main>
  );
}
