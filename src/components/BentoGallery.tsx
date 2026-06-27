"use client";

import { useState } from "react";

interface BentoImage {
  src: string;
  alt: string;
}

interface BentoGalleryProps {
  images: BentoImage[];
}

function LightboxModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
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

export function BentoGallery({ images }: BentoGalleryProps) {
  const [lightbox, setLightbox] = useState<BentoImage | null>(null);

  if (!images || images.length === 0) return null;

  const count = images.length;

  // Determine grid layout based on image count
  const getGridClass = () => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      case 5:
        return "grid-cols-2 grid-rows-3";
      case 6:
        return "grid-cols-2 grid-rows-3";
      default:
        return "grid-cols-2";
    }
  };

  const getItemClass = (index: number) => {
    if (count === 3 && index === 0) {
      // First image spans 2 rows
      return "row-span-2";
    }
    if (count === 5 && index === 0) {
      // First image spans 2 rows
      return "row-span-2";
    }
    if (count === 6 && index === 0) {
      // First image spans 2 rows
      return "row-span-2";
    }
    return "";
  };

  return (
    <>
      <div
        className={`grid ${getGridClass()} gap-3 my-8 rounded-xl overflow-hidden`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl cursor-zoom-in ${getItemClass(index)}`}
            onClick={() => setLightbox(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
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
