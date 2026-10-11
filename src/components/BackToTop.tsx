"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

// Uses the sans-serif solid (primary) button style from the Figma design system, about 30% smaller below 768px.
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-4 right-4 z-40 gap-[6px] px-4! py-[10px]! text-[13px]! shadow-md md:bottom-8 md:right-8 md:gap-2 md:px-10! md:py-[14px]! md:text-[18px]!"
    >
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-[11px] md:size-4">
        <path
          d="M8 13V3M8 3L3 8M8 3L13 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Back to top</span>
    </Button>
  );
}
