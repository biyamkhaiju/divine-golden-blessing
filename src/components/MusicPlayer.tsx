import { useEffect, useRef, useState } from "react";
import musicAsset from "@/assets/wedding-music.mp3.asset.json";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const a = new Audio(musicAsset.url);
    a.loop = true;
    a.volume = 0;
    audioRef.current = a;

    const tryPlay = async () => {
      try {
        await a.play();
        setStarted(true);
        // fade in
        const target = 0.45;
        const step = 0.02;
        const id = setInterval(() => {
          if (!audioRef.current) return clearInterval(id);
          if (audioRef.current.volume < target - step) audioRef.current.volume += step;
          else { audioRef.current.volume = target; clearInterval(id); }
        }, 120);
      } catch {
        // autoplay blocked — wait for first user gesture
        const onGesture = async () => {
          try { await a.play(); setStarted(true); a.volume = 0.45; } catch {}
          window.removeEventListener("pointerdown", onGesture);
          window.removeEventListener("keydown", onGesture);
        };
        window.addEventListener("pointerdown", onGesture, { once: true });
        window.addEventListener("keydown", onGesture, { once: true });
      }
    };
    tryPlay();

    return () => { a.pause(); audioRef.current = null; };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) { a.muted = false; setMuted(false); }
    else { a.muted = true; setMuted(true); }
    if (!started) { a.play().catch(() => {}); setStarted(true); }
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--royal)]/60 bg-[color:var(--deep)]/70 text-[color:var(--royal)] shadow-[0_0_24px_rgba(246,196,83,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_36px_rgba(246,196,83,0.6)] active:scale-95"
    >
      {muted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>
      )}
    </button>
  );
}
