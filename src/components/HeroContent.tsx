"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroContentProps {
  heading: string;
  headingAccent: string;
  subtitle: string;
  tagline: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

export function HeroContent({
  heading,
  headingAccent,
  subtitle,
  tagline,
  ctaPrimaryLabel,
  ctaPrimaryLink,
  ctaSecondaryLabel,
  ctaSecondaryLink,
}: HeroContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const baseTransition = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-4";
  const shown = "opacity-100 translate-y-0";

  return (
    <div className="text-center md:text-left">
      <h1
        className={`text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight ${baseTransition} ${visible ? shown : hidden}`}
        style={{ transitionDelay: "0ms" }}
      >
        {heading}{" "}
        <span className="text-accent-orange">{headingAccent}</span>.
      </h1>
      <p
        className={`text-xl md:text-2xl text-neutral-dark mb-4 leading-relaxed ${baseTransition} ${visible ? shown : hidden}`}
        style={{ transitionDelay: "150ms" }}
      >
        {subtitle}
      </p>
      <p
        className={`text-lg text-neutral-warm mb-10 ${baseTransition} ${visible ? shown : hidden}`}
        style={{ transitionDelay: "300ms" }}
      >
        {tagline}
      </p>
      <div
        className={`flex items-center justify-center md:justify-start gap-4 ${baseTransition} ${visible ? shown : hidden}`}
        style={{ transitionDelay: "450ms" }}
      >
        {ctaPrimaryLabel && ctaPrimaryLink && (
          <Link
            href={ctaPrimaryLink}
            className="px-8 py-3 bg-accent-orange text-background font-medium rounded-lg hover:bg-accent-orange/90 transition-colors"
          >
            {ctaPrimaryLabel}
          </Link>
        )}
        {ctaSecondaryLabel && ctaSecondaryLink && (
          <Link
            href={ctaSecondaryLink}
            className="px-8 py-3 border border-neutral-warm/40 text-foreground font-medium rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
          >
            {ctaSecondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
