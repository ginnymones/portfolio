import type { Metadata } from "next";
import { getPaginatedCaseStudies } from "@/lib/case-studies";
import { getPageContent } from "@/lib/pages";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PageBackground } from "@/components/PageBackground";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Works — Ginny Mones",
  description: "Browse case studies and design work by Ginny Mones.",
};

interface WorksPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { studies, totalPages } = getPaginatedCaseStudies(currentPage, 6);
  const page = getPageContent("works");

  return (
    <PageBackground
      backgroundType={page.backgroundType}
      backgroundImage={page.backgroundImage}
      backgroundVideo={page.backgroundVideo}
      backgroundColor={page.backgroundColor}
      gradientFrom={page.gradientFrom}
      gradientTo={page.gradientTo}
      gradientDirection={page.gradientDirection}
      overlayOpacity={page.overlayOpacity}
      overlayColor={page.overlayColor}
      className="min-h-screen"
    >
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {page.heading || "Works"}
        </h1>
        <p className="text-lg text-neutral-dark mb-12">
          {page.subtitle || "Selected case studies from my design practice."}
        </p>

        {studies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-warm text-lg">
              No case studies yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="flex items-center justify-center gap-2 mt-16"
              >
                {currentPage > 1 && (
                  <Link
                    href={`/works?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/works?page=${pageNum}`}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        pageNum === currentPage
                          ? "bg-accent-orange text-background font-medium"
                          : "border border-neutral-warm/30 hover:border-accent-orange hover:text-accent-orange"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                )}

                {currentPage < totalPages && (
                  <Link
                    href={`/works?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </PageBackground>
  );
}
