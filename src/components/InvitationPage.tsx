import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ganeshAsset from "@/assets/ganesh.asset.json";
import shubhaAsset from "@/assets/shubha-vivaha.jpg.asset.json";
import musicAsset from "@/assets/wedding-music.mp3.asset.json";
import MandalaCorner from "./MandalaCorner";

/**
 * Page 1 — appears after the front cover.
 * Sections: Ganesh mantra → Shubha Vivaha artwork → Couple intro → Invitation
 */
export default function InvitationPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  // Auto-play with low volume; respect autoplay policy via user-gesture fallback
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    const tryPlay = () => a.play().catch(() => {});
    tryPlay();
    const onInteract = () => {
      tryPlay();
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
    document.addEventListener("click", onInteract);
    document.addEventListener("touchstart", onInteract);
    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
  }, []);

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const mantra = [
    "ॐ श्री गणेशाय नमः",
    "वक्रतुंड महाकाय सूर्यकोटि समप्रभ।",
    "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
  ];

  return (
    <section className="relative w-full overflow-hidden vignette text-[color:var(--warm)] invitation-bg">
      {/* Background music */}
      <audio ref={audioRef} src={musicAsset.url} loop preload="auto" autoPlay />

      {/* Mute toggle — fixed bottom-right */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--deep)]/70 text-[color:var(--gold)] backdrop-blur-md shadow-[0_0_20px_rgba(246,196,83,0.25)] transition-all duration-300 hover:scale-110 hover:border-[color:var(--gold)] hover:shadow-[0_0_30px_rgba(246,196,83,0.5)] active:scale-95"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Mandala corners */}
      <MandalaCorner className="pointer-events-none absolute left-3 top-3 h-20 w-20 text-[color:var(--royal)]/50 md:h-28 md:w-28" />
      <MandalaCorner className="pointer-events-none absolute right-3 top-3 h-20 w-20 -scale-x-100 text-[color:var(--royal)]/50 md:h-28 md:w-28" />

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Section 1 — Divine Beginning */}
        <div className="flex flex-col items-center text-center">
          <div className="relative ganesh-aura">
            <img
              src={ganeshAsset.url}
              alt="Lord Ganesh"
              className="h-24 w-24 md:h-32 md:w-32 object-contain ganesh-shimmer"
              draggable={false}
            />
          </div>

          <div className="mt-6 space-y-2 font-serif text-[color:var(--warm)]">
            {mantra.map((line, i) => (
              <p
                key={i}
                className="mantra-line text-gold-gradient"
                style={{
                  animationDelay: `${0.3 + i * 0.7}s`,
                  fontSize: i === 0 ? "clamp(1.05rem,2.2vw,1.45rem)" : "clamp(0.95rem,1.8vw,1.2rem)",
                  letterSpacing: i === 0 ? "0.15em" : "0.02em",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="gold-divider mt-12 w-48" />
        </div>

        {/* Section 2 — Shubha Vivaha artwork */}
        <div className="mt-14 flex justify-center shubha-reveal">
          <div className="relative w-full max-w-2xl">
            <img
              src={shubhaAsset.url}
              alt="Shubha Vivah"
              className="w-full h-auto blend-screen select-none"
              draggable={false}
            />
            {/* Golden breathing glow overlay on the text area */}
            <div className="pointer-events-none absolute inset-0 shubha-text-glow" aria-hidden />
            {/* Spark particles */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="shubha-spark"
                  style={{
                    left: `${20 + ((i * 53) % 60)}%`,
                    top: `${30 + ((i * 37) % 40)}%`,
                    animationDelay: `${(i * 0.4) % 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 — Couple Introduction */}
        <div className="mt-16 text-center">
          <h2
            className="font-display reveal-up text-gold-gradient"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", animationDelay: "0.2s" }}
          >
            आशीष <span className="text-[color:var(--royal)]">💛</span> आयुषी
          </h2>

          <p
            className="reveal-up mx-auto mt-8 max-w-2xl font-serif leading-relaxed text-[color:var(--warm)]/90"
            style={{ fontSize: "clamp(0.95rem,1.5vw,1.15rem)", animationDelay: "0.8s" }}
          >
            सुपुत्र: श्री [वरका बाबुको नाम] तथा श्रीमती [वरकी आमाको नाम] र
            सुपुत्री: श्री [कन्याका बाबुको नाम] तथा श्रीमती [कन्याको आमाको नाम]
            का साथ सु-सम्बन्ध हुने
          </p>

          <div className="gold-divider mx-auto mt-12 w-48" />
        </div>

        {/* Section 4 — Invitation Message */}
        <div className="mt-14 text-center">
          <p
            className="reveal-scale mx-auto max-w-2xl font-serif italic leading-relaxed text-[color:var(--warm)]/95"
            style={{ fontSize: "clamp(1rem,1.7vw,1.25rem)", animationDelay: "0.4s" }}
          >
            को सुखद अवसरमा उपस्थित भई वर-वधुलाई आशीर्वाद प्रदान गरिदिनुहुन
            यहाँको गरिमामय उपस्थितिको लागि हार्दिक निमन्त्रणा गर्दछौं।
          </p>

          <p className="mt-12 font-serif text-[10px] tracking-[0.5em] uppercase text-[color:var(--warm)]/60">
            ॥ Shubha Vivah ॥
          </p>
        </div>
      </div>
    </section>
  );
}
