import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Tag } from "@/components/ui/Tag";
import type { ToolStatus } from "@/lib/tools";

interface ToolCardProps {
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  summary: string;
  tags: string[];
  projectStatus: ToolStatus;
  liveUrl?: string;
  repoUrl?: string;
  caseStudy?: string;
}

const STATUS_LABEL: Record<ToolStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-progress": "In progress",
};

// Live is forest (Figma, added 2026-10-08), Beta is sunshine. In progress is sunset (decided 2026-10-08).
const STATUS_DOT: Record<ToolStatus, string> = {
  live: "bg-forest",
  beta: "bg-sunshine",
  "in-progress": "bg-sunset",
};

// Figma: tools / hi-fi "tool / ..." card (359:179)
export function ToolCard({
  title,
  thumbnail,
  thumbnailAlt,
  summary,
  tags,
  projectStatus,
  liveUrl,
  repoUrl,
  caseStudy,
}: ToolCardProps) {
  // The image and title open the tool itself when it's live, otherwise the case study
  const primaryHref = liveUrl || (caseStudy ? `/works/${caseStudy}` : repoUrl);
  const primaryIsExternal = Boolean(liveUrl || (!caseStudy && repoUrl));

  const wrap = (children: React.ReactNode, className = "") =>
    !primaryHref ? (
      <div className={className}>{children}</div>
    ) : primaryIsExternal ? (
      <a href={primaryHref} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link href={primaryHref} className={className}>
        {children}
      </Link>
    );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-khaki bg-warm-white">
      {wrap(
        <ImageSlot
          src={thumbnail}
          alt={thumbnailAlt || `${title} screenshot`}
          label="App preview"
          className="h-[220px] w-full md:h-[250px]"
          imageClassName="object-top"
          sizes="(max-width: 768px) 100vw, 484px"
        />,
        "block"
      )}

      <div className="flex flex-1 flex-col items-start gap-4 px-6 pb-7 pt-6 md:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label flex items-center gap-[6px] pr-[6px] text-ochre">
            <span aria-hidden="true" className={`size-2 rounded-full ${STATUS_DOT[projectStatus]}`} />
            {STATUS_LABEL[projectStatus]}
          </span>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <h2 className="heading-3 text-neutral-black transition-colors group-hover:text-sunset">
          {wrap(title)}
        </h2>

        <p className="text-warm-gray">{summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
          {liveUrl && (
            <Button href={liveUrl} target="_blank" rel="noopener noreferrer">
              Launch
              <span className="sr-only"> {title} (opens in a new tab)</span>
            </Button>
          )}
          {caseStudy && (
            <Button variant="text" href={`/works/${caseStudy}`}>
              Case study
              <span className="sr-only"> for {title}</span>
            </Button>
          )}
          {repoUrl && (
            <Button variant="text" href={repoUrl} target="_blank" rel="noopener noreferrer">
              Code
              <span className="sr-only"> for {title} (opens in a new tab)</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
