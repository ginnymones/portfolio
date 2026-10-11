import type { CaseStudyMeta } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/CaseStudyCard";

interface RelatedCaseStudiesProps {
  studies: CaseStudyMeta[];
}

export function RelatedCaseStudies({ studies }: RelatedCaseStudiesProps) {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="pb-16 md:pb-28">
      <h2 className="heading-2 mb-8 text-burnt-sienna">Related work</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
