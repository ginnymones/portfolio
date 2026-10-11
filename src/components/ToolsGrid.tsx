import { ToolCard } from "@/components/ToolCard";
import type { Tool } from "@/lib/tools";

interface ToolsGridProps {
  tools: Tool[];
}

// Figma: tools grid. Two columns, 32px apart, cards in a row share a height.
export function ToolsGrid({ tools }: ToolsGridProps) {
  if (tools.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-warm-gray">Nothing here yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} {...tool} />
      ))}
    </div>
  );
}
