"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/ToolCard";
import type { Tool } from "@/lib/tools";

interface ToolsGridProps {
  tools: Tool[];
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");

  // Only offer tags that at least one tool uses
  const tags = Array.from(new Set(tools.flatMap((t) => t.tags)));
  const validTag = tagParam && tags.includes(tagParam) ? tagParam : null;

  const [activeTag, setActiveTag] = useState<string | null>(validTag);

  // Keep filter state in sync with the URL (e.g. browser back/forward)
  useEffect(() => {
    setActiveTag(validTag);
  }, [validTag]);

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    const query = params.toString();
    router.replace(query ? `?${query}#tools` : "?#tools", { scroll: false });
  };

  const visible = activeTag ? tools.filter((t) => t.tags.includes(activeTag)) : tools;

  const tabClass = (selected: boolean) =>
    `px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
      selected
        ? "bg-accent-orange text-background font-medium"
        : "border border-neutral-warm/30 text-neutral-dark hover:border-accent-orange hover:text-accent-orange"
    }`;

  return (
    <div>
      {tags.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by type">
          <button
            onClick={() => handleTagClick(null)}
            className={tabClass(activeTag === null)}
            role="tab"
            aria-selected={activeTag === null}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={tabClass(activeTag === tag)}
              role="tab"
              aria-selected={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-warm text-lg">Nothing here yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      )}
    </div>
  );
}
