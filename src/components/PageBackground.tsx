"use client";

import { useRef, useEffect } from "react";

export interface BackgroundConfig {
  backgroundType?: "none" | "image" | "video" | "color" | "gradient";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: string;
  overlayOpacity?: number;
  overlayColor?: string;
}

interface PageBackgroundProps extends BackgroundConfig {
  children: React.ReactNode;
  className?: string;
}

export function PageBackground({
  backgroundType = "none",
  backgroundImage,
  backgroundVideo,
  backgroundColor,
  gradientFrom,
  gradientTo,
  gradientDirection = "to bottom",
  overlayOpacity = 50,
  overlayColor = "#FFFDF9",
  children,
  className = "",
}: PageBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — that's fine, it's decorative
      });
    }
  }, []);

  if (backgroundType === "none" || !backgroundType) {
    return <div className={className}>{children}</div>;
  }

  const overlayStyle = {
    backgroundColor: overlayColor,
    opacity: (overlayOpacity ?? 50) / 100,
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Layer */}
      {backgroundType === "image" && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {backgroundType === "video" && backgroundVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {backgroundType === "color" && backgroundColor && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor }}
          aria-hidden="true"
        />
      )}

      {backgroundType === "gradient" && gradientFrom && gradientTo && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={overlayStyle}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
