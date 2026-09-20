import Image from "next/image";
import Link from "next/link";
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

const actionClass =
  "text-sm font-medium text-accent-orange hover:underline underline-offset-4";

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

  const titleEl = <>{title}</>;
  const imageEl = (
    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-warm/10">
      <Image
        src={thumbnail}
        alt={thumbnailAlt || `${title} screenshot`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/90 text-neutral-dark">
        {STATUS_LABEL[projectStatus]}
      </span>
    </div>
  );

  const wrap = (children: React.ReactNode, className: string) =>
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
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {wrap(imageEl, "block")}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-orange transition-colors mb-2">
          {wrap(titleEl, "")}
        </h3>
        <p className="text-sm text-neutral-dark mb-3">{summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-neutral-warm/15 text-neutral-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-2">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
              Launch
              <span className="sr-only"> {title} (opens in a new tab)</span>
            </a>
          )}
          {caseStudy && (
            <Link href={`/works/${caseStudy}`} className={actionClass}>
              Case study
              <span className="sr-only"> for {title}</span>
            </Link>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
              Code
              <span className="sr-only"> for {title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
