import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/case-studies";

interface CaseStudyNavProps {
  prev: CaseStudyMeta | null;
  next: CaseStudyMeta | null;
}

export function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case study navigation"
      className="grid grid-cols-2 gap-4 border-t border-khaki pb-16 pt-10 md:pb-28"
    >
      {prev ? (
        <Link
          href={`/works/${prev.slug}`}
          className="group flex flex-col items-start gap-2 rounded-xl p-4 transition-colors hover:bg-warm-white"
        >
          <span className="label text-sunset">← Previous</span>
          <span className="line-clamp-2 font-serif text-xl text-neutral-black transition-colors group-hover:text-burnt-sienna md:text-2xl">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/works/${next.slug}`}
          className="group flex flex-col items-end gap-2 rounded-xl p-4 text-right transition-colors hover:bg-warm-white"
        >
          <span className="label text-sunset">Next →</span>
          <span className="line-clamp-2 font-serif text-xl text-neutral-black transition-colors group-hover:text-burnt-sienna md:text-2xl">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
