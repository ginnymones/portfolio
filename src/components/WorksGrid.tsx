"use client";

import { useState, useRef } from "react";
import { CaseStudyCard } from "@/components/CaseStudyCard";

const ITEMS_PER_PAGE = 6;

interface CaseStudyItem {
  slug: string;
  title: string;
  thumbnail: string;
  summary: string;
  tags: string[];
}

interface WorksGridProps {
  studies: CaseStudyItem[];
  availableTags: string[];
}

export function WorksGrid({ studies, availableTags }: WorksGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filter studies by active tag
  const filtered = activeTag
    ? studies.filter((s) => s.tags.includes(activeTag))
    : studies;

  // Paginate
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Only show tags that have at least one case study
  const visibleTags = availableTags.filter((tag) =>
    studies.some((s) => s.tags.includes(tag))
  );

  const scrollToTop = useCallback(() => {
    if (gridTopRef.current) {
      const offset = 80;
      const top =
        gridTopRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div ref={gridTopRef}>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by tag">
        <button
          onClick={() => handleTagClick(null)}
          className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
            activeTag === null
              ? "bg-accent-orange text-background font-medium"
              : "border border-neutral-warm/30 text-neutral-dark hover:border-accent-orange hover:text-accent-orange"
          }`}
          role="tab"
          aria-selected={activeTag === null}
        >
          All
        </button>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              activeTag === tag
                ? "bg-accent-orange text-background font-medium"
                : "border border-neutral-warm/30 text-neutral-dark hover:border-accent-orange hover:text-accent-orange"
            }`}
            role="tab"
            aria-selected={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div>
        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-warm text-lg">
              No case studies found for this filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((study) => (
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
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2 mt-16"
        >
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-all duration-200"
            >
              Previous
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  pageNum === currentPage
                    ? "bg-accent-orange text-background font-medium"
                    : "border border-neutral-warm/30 hover:border-accent-orange hover:text-accent-orange"
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-all duration-200"
            >
              Next
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
