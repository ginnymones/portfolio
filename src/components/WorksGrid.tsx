"use client";

import { useState } from "react";
import { CaseStudyCard } from "@/components/CaseStudyCard";

const DEFINED_TAGS = [
  "Illustration",
  "Graphic Design",
  "UX/UI Design",
  "Product Design",
  "Animation",
  "Development",
];

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
}

export function WorksGrid({ studies }: WorksGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter studies by active tag
  const filtered = activeTag
    ? studies.filter((s) => s.tags.includes(activeTag))
    : studies;

  // Paginate
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Only show tags that have at least one case study
  const availableTags = DEFINED_TAGS.filter((tag) =>
    studies.some((s) => s.tags.includes(tag))
  );

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by tag">
        <button
          onClick={() => handleTagClick(null)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            activeTag === null
              ? "bg-accent-orange text-background font-medium"
              : "border border-neutral-warm/30 text-neutral-dark hover:border-accent-orange hover:text-accent-orange"
          }`}
          role="tab"
          aria-selected={activeTag === null}
        >
          All
        </button>
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2 mt-16"
        >
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
            >
              Previous
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
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
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 text-sm border border-neutral-warm/30 rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
            >
              Next
            </button>
          )}
        </nav>
      )}
    </>
  );
}
