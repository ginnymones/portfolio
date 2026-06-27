"use client";

import { useEffect, useCallback, useState } from "react";
import { BentoGallery } from "@/components/BentoGallery";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

function LightboxModal({ src, alt, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-accent-yellow transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/**
 * Parse content HTML and split into segments: regular HTML and bento galleries.
 */
function parseContentSegments(html: string) {
  // Remark wraps :::bento, images, and ::: in a single <p> tag:
  // <p>:::bento\n<img ...>\n<img ...>\n:::</p>
  const bentoRegex =
    /<p>:::bento\s*([\s\S]*?):::<\/p>/g;

  const segments: Array<
    { type: "html"; content: string } | { type: "bento"; images: { src: string; alt: string }[] }
  > = [];

  let lastIndex = 0;
  let match;

  while ((match = bentoRegex.exec(html)) !== null) {
    // Add HTML before this bento block
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }

    // Parse images from the bento block
    const bentoContent = match[1];
    const imgRegex = /<img\s+src="([^"]+)"\s+alt="([^"]*)"/g;
    const images: { src: string; alt: string }[] = [];
    let imgMatch;
    while ((imgMatch = imgRegex.exec(bentoContent)) !== null) {
      images.push({ src: imgMatch[1], alt: imgMatch[2] });
    }

    if (images.length > 0) {
      segments.push({ type: "bento", images });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining HTML
  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  // If no bento blocks found, return the whole thing as HTML
  if (segments.length === 0) {
    segments.push({ type: "html", content: html });
  }

  return segments;
}

/**
 * Wraps case study content and intercepts image clicks to open a lightbox.
 * Also renders :::bento blocks as BentoGallery components.
 */
export function LightboxContent({ html }: { html: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      setLightbox({ src: img.src, alt: img.alt || "Case study image" });
    }
  };

  const segments = parseContentSegments(html);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "bento") {
          return <BentoGallery key={index} images={segment.images} />;
        }
        return (
          <div
            key={index}
            className="prose max-w-none [&_img]:cursor-zoom-in"
            dangerouslySetInnerHTML={{ __html: segment.content }}
            onClick={handleClick}
          />
        );
      })}
      {lightbox && (
        <LightboxModal
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
