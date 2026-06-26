import type { CaseStudyLink } from "@/lib/case-studies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFigma,
  faDribbble,
  faBehance,
  faNpm,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faLink,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const iconMap: Record<string, IconDefinition> = {
  github: faGithub,
  figma: faFigma,
  dribbble: faDribbble,
  behance: faBehance,
  npm: faNpm,
  globe: faGlobe,
  link: faLink,
  play: faPlay,
};

interface CaseStudyLinksProps {
  links: CaseStudyLink[];
}

export function CaseStudyLinks({ links }: CaseStudyLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-neutral-warm/20">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Relevant Links
      </h3>
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => {
          const icon = iconMap[link.icon || "link"] || faLink;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-warm/30 rounded-lg text-sm font-medium text-neutral-dark hover:border-accent-orange hover:text-accent-orange transition-colors"
            >
              <FontAwesomeIcon icon={icon} className="w-4 h-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
