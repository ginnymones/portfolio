import type { CaseStudyMeta } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/CaseStudyCard";

interface RelatedCaseStudiesProps {
  studies: CaseStudyMeta[];
}

export function RelatedCaseStudies({ studies }: RelatedCaseStudiesProps) {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="mt-20 pt-10 border-t border-neutral-warm/20">
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        Related Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {studies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            slug={study.slug}
            title={study.title}
            thumbnail={study.thumbnail}
            summary={study.summary}
            tags={study.tags}
          />
        ))}
      </div>
    </section>
  );
}
