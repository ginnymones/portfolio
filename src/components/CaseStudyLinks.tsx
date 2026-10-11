import type { CaseStudyLink } from "@/lib/case-studies";
import { Button } from "@/components/ui/Button";
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
    <section className="flex flex-col gap-6 pb-16 md:pb-28">
      <h2 className="heading-4 text-sunset">Relevant links</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => {
          const icon = iconMap[link.icon || "link"] || faLink;
          return (
            <Button
              key={index}
              variant="secondary"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2 px-6! py-[10px]! text-[14px]!"
            >
              <FontAwesomeIcon icon={icon} className="size-4" />
              {link.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
