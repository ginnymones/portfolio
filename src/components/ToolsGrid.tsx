import { ToolCard } from "@/components/ToolCard";
import type { Tool } from "@/lib/tools";

interface ToolsGridProps {
  tools: Tool[];
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-warm text-lg">Nothing here yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} {...tool} />
      ))}
    </div>
  );
}
