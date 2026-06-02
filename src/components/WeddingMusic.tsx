import { useState, useRef, useCallback, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * 🎵 SONG URL — Replace this with your actual wedding song file.
 * Place the MP3 in public/music/ or use a CDN link.
 * Example: src="/music/wedding-song.mp3"
 */
const SONG_SRC = "https://res.cloudinary.com/diakoeadm/video/upload/v1780367435/Sangeet_Dance_Series_Day_26_60_Kudmayi_The_Sparklers_shorts_dance_kudmayi_bollywood_UCwRfc1Arfo_ccsbs4.mp3"; // <-- ADD YOUR SONG URL HERE

export default function WeddingMusic() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted((m) => !m);
  }, []);

  // Attempt auto-play on mount
  useEffect(() => {
    if (!audioRef.current || !SONG_SRC) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Hidden audio element */}
      {SONG_SRC && (
        <audio ref={audioRef} src={SONG_SRC} loop preload="auto" />
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="relative flex items-center gap-3 rounded-full border border-[color:var(--royal)]/40 bg-[color:var(--deep)]/60 px-7 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/70 hover:bg-[color:var(--deep)]/80 hover:shadow-[0_0_30px_rgba(246,196,83,0.2)]"
        >
          {/* Animated music bars */}
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[color:var(--gold)]"
                style={{
                  height: playing ? "18px" : "6px",
                  opacity: playing ? 1 : 0.45,
                  transition: `all 0.4s ease ${i * 0.08}s`,
                  animation: playing
                    ? `music-bar 0.9s ease-in-out ${i * 0.12}s infinite alternate`
                    : "none",
                }}
              />
            ))}
          </span>

          <span className="font-serif text-sm tracking-[0.15em] text-[color:var(--warm)]/90 uppercase">
            {playing ? "Pause Music" : "Play Wedding Music"}
          </span>

          {/* Decorative corner dots */}
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[color:var(--royal)]/60" />
          <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[color:var(--royal)]/60" />
        </button>

        {/* Mute / Unmute icon */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--royal)]/40 bg-[color:var(--deep)]/60 text-[color:var(--gold)] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/70 hover:bg-[color:var(--deep)]/80 hover:shadow-[0_0_20px_rgba(246,196,83,0.2)]"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {!SONG_SRC && (
        <p className="max-w-xs text-center font-serif text-[10px] italic tracking-wider text-[color:var(--royal)]/60">
          Add your song URL in src/components/WeddingMusic.tsx
        </p>
      )}
    </div>
  );
}
