"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDribbble,
  faLinkedinIn,
  faBehance,
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const brandIconMap: Record<string, IconDefinition> = {
  dribbble: faDribbble,
  linkedin: faLinkedinIn,
  behance: faBehance,
  github: faGithub,
  twitter: faTwitter,
  instagram: faInstagram,
};

function getIconForLabel(label: string): IconDefinition {
  const lower = label.toLowerCase();
  for (const [key, icon] of Object.entries(brandIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return faGlobe;
}

interface SocialLink {
  label: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  variant?: "light" | "dark"; // light = on dark bg, dark = on light bg
}

export function SocialLinks({
  links,
  className = "",
  variant = "dark",
}: SocialLinksProps) {
  const baseClasses =
    variant === "light"
      ? "text-neutral-warm hover:text-background"
      : "text-neutral-dark hover:text-accent-orange";

  return (
    <div className={`flex flex-wrap gap-5 ${className}`}>
      {links.map((link) => {
        const icon = getIconForLabel(link.label);
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm transition-colors ${baseClasses}`}
          >
            <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
