import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  summary: string;
  tags: string[];
  /** CSS aspect-ratio for the cover on md+ screens, e.g. "381 / 460". Phones always use 4:3. */
  aspect?: string;
}

// Figma: works / hi-fi "work / ..." tile (359:93) and its hover state (359:104).
// Hover or keyboard focus fills the cover with sunset and shows the summary.
export function CaseStudyCard({
  slug,
  title,
  thumbnail,
  thumbnailAlt,
  summary,
  tags,
  aspect = "4 / 3",
}: CaseStudyCardProps) {
  return (
    <Link href={`/works/${slug}`} className="group flex flex-col gap-[14px] outline-none">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-khaki md:aspect-[var(--ar)]"
        style={{ "--ar": aspect } as React.CSSProperties}
      >
        <Image
          src={thumbnail}
          alt={thumbnailAlt || `${title} thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 382px"
        />
        <div className="absolute inset-0 flex flex-col justify-end gap-4 bg-sunset p-7 text-warm-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {summary && <p className="line-clamp-6">{summary}</p>}
          <span className="label text-sunshine">View case study →</span>
        </div>
      </div>
      <h3 className="heading-5 text-neutral-black transition-colors group-hover:text-sunset group-focus-visible:text-sunset">
        {title}
      </h3>
      {tags.length > 0 && <p className="text-warm-gray">{tags.join(" · ")}</p>}
    </Link>
  );
}
