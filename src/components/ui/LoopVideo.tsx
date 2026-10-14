"use client";

import { useEffect, useRef, useState } from "react";

interface LoopVideoProps {
  src: string;
  /** Description for screen readers; empty marks the video as decorative */
  alt?: string;
  className?: string;
  /** Still frame shown until the video starts (or if autoplay is blocked, e.g. Low Power Mode on iPhones) */
  poster?: string;
}

// Silent looping clip that stands in for a stat image (Figma elev_grewportfolio 489:231, elev_addtocart 493:1487).
// Autoplays and loops (Ginny's call, 2026-10-11, even with reduced motion on). It only downloads and plays while near
// the viewport, and the button lets anyone pause; a manual pause sticks until they press play again.
export function LoopVideo({ src, alt = "", className = "", poster }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`absolute inset-0 size-full object-cover ${className}`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause animation" : "Play animation"}
        className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-warm-white/90 text-dark-gray shadow-sm transition-colors hover:bg-warm-white"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          {playing ? (
            <>
              <rect x="2" y="1" width="3" height="10" />
              <rect x="7" y="1" width="3" height="10" />
            </>
          ) : (
            <path d="M3 1l8 5-8 5z" />
          )}
        </svg>
      </button>
    </>
  );
}
