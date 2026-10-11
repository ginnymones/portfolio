"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Button } from "@/components/ui/Button";

const PAGE_SIZE = 6;

// Figma: works / hi-fi gallery. Three independent columns with staggered cover heights.
// Row 1 is tall / short / medium, row 2 short / tall / medium, repeating.
const STAGGER = [
  ["381.333 / 460", "381.333 / 300", "381.333 / 380"],
  ["381.333 / 300", "381.333 / 460", "381.333 / 380"],
];

interface CaseStudyItem {
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  summary: string;
  tags: string[];
}

interface WorksGridProps {
  studies: CaseStudyItem[];
  availableTags: string[];
}

function useColumnCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setCount(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);
  return count;
}

export function WorksGrid({ studies, availableTags }: WorksGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const initialTag = tagParam && availableTags.includes(tagParam) ? tagParam : null;

  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [shown, setShown] = useState(PAGE_SIZE);
  const columnCount = useColumnCount();

  // Keep filter state in sync with the URL (e.g. browser back/forward)
  useEffect(() => {
    setActiveTag(tagParam && availableTags.includes(tagParam) ? tagParam : null);
    setShown(PAGE_SIZE);
  }, [tagParam, availableTags]);

  const filtered = activeTag ? studies.filter((s) => s.tags.includes(activeTag)) : studies;
  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  // Only show tags that have at least one case study
  const visibleTags = availableTags.filter((tag) => studies.some((s) => s.tags.includes(tag)));

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setShown(PAGE_SIZE);

    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  };

  // Deal items out round-robin so newest-first reads across the columns
  const columns: { study: CaseStudyItem; aspect?: string }[][] = Array.from({ length: columnCount }, () => []);
  visible.forEach((study, i) => {
    const col = i % columnCount;
    const row = Math.floor(i / columnCount);
    columns[col].push({
      study,
      aspect: columnCount > 1 ? STAGGER[row % 2][col] : undefined,
    });
  });

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`label whitespace-nowrap rounded-full border border-sunset px-[14px] py-[6px] transition-colors ${
        active ? "bg-sunset text-warm-white" : "text-sunset hover:bg-sunset/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-[10px]" role="tablist" aria-label="Filter by category">
        {chip("All", activeTag === null, () => handleTagClick(null))}
        {visibleTags.map((tag) => chip(tag, activeTag === tag, () => handleTagClick(tag)))}
      </div>

      {/* Gallery */}
      {visible.length === 0 ? (
        <p className="py-20 text-center text-warm-gray">No case studies found for this filter.</p>
      ) : (
        <div className="flex items-start gap-[30px]">
          {columns.map((column, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-10">
              {column.map(({ study, aspect }) => (
                <CaseStudyCard
                  key={study.slug}
                  slug={study.slug}
                  title={study.title}
                  thumbnail={study.thumbnail}
                  thumbnailAlt={study.thumbnailAlt}
                  summary={study.summary}
                  tags={study.tags}
                  aspect={aspect}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pb-16 pt-16 md:pb-24">
          <Button variant="text" onClick={() => setShown((n) => n + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
