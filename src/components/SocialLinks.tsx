"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDribbble,
  faLinkedinIn,
  faLinkedin,
  faBehance,
  faGithub,
  faTwitter,
  faInstagram,
  faSubstack,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const brandIconMap: Record<string, IconDefinition> = {
  dribbble: faDribbble,
  linkedin: faLinkedinIn,
  behance: faBehance,
  github: faGithub,
  twitter: faTwitter,
  instagram: faInstagram,
  substack: faSubstack,
};

function getIconForLabel(label: string): IconDefinition {
  const lower = label.toLowerCase();
  for (const [key, icon] of Object.entries(brandIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return faGlobe;
}

// The panel uses the boxed LinkedIn mark; everything else matches the inline icons
function panelIconFor(label: string): IconDefinition {
  return label.toLowerCase().includes("linkedin") ? faLinkedin : getIconForLabel(label);
}

interface SocialLink {
  label: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  email?: string; // panel only: adds an Email item first
  variant?: "light" | "dark" | "panel"; // light = on dark bg, dark = on light bg, panel = icon over label on the sunset contact panel
}

export function SocialLinks({
  links,
  className = "",
  variant = "dark",
  email,
}: SocialLinksProps) {
  if (variant === "panel") {
    // Figma "get in touch / mobile" (416:197): icon above a small semibold label, no circles. Email is the first item.
    const items = [
      ...(email ? [{ label: "Email", url: `mailto:${email}`, icon: faEnvelope, external: false }] : []),
      ...links.map((link) => ({ ...link, icon: panelIconFor(link.label), external: true })),
    ];
    return (
      <div className={`flex flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-10 ${className}`}>
        {items.map((item) => (
          <a
            key={item.label}
            href={item.url}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex flex-col items-center gap-[5px] text-warm-white transition-colors hover:text-sunshine"
          >
            <span className="flex h-5 w-14 items-center justify-center md:h-6">
              <FontAwesomeIcon icon={item.icon} className="size-4 md:size-5" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.03em] md:text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    );
  }

  const baseClasses =
    variant === "light"
      ? "text-light-gray hover:text-cream"
      : "text-warm-gray hover:text-sunset";

  return (
    <div className={`flex flex-wrap gap-5 justify-center ${className}`}>
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
