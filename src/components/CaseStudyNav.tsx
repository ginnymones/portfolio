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
      className="mt-16 pt-10 border-t border-neutral-warm/20 grid grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/works/${prev.slug}`}
          className="group flex flex-col items-start p-4 rounded-lg hover:bg-neutral-warm/10 transition-colors"
        >
          <span className="text-xs text-neutral-warm uppercase tracking-wide mb-1">
            ← Previous
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent-orange transition-colors line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/works/${next.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-lg hover:bg-neutral-warm/10 transition-colors"
        >
          <span className="text-xs text-neutral-warm uppercase tracking-wide mb-1">
            Next →
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent-orange transition-colors line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
