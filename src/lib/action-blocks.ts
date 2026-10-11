import { remark } from "remark";
import html from "remark-html";
import type { Root, RootContent } from "mdast";

export interface ActionBlock {
  heading?: string;
  html: string;
  image?: { src: string; alt: string };
}

const VIDEO = /\.(mp4|webm)$/i;

function headingText(node: RootContent): string {
  if (node.type !== "heading") return "";
  return node.children.map((c) => ("value" in c ? c.value : "")).join("");
}

/**
 * Splits the Action markdown into blocks for the alternating image/text layout.
 * A `###` heading starts a block. The first stand-alone image in a block becomes its side image;
 * everything else stays as prose. Anything before the first `###` is an intro block with no heading.
 * Write-ups that don't follow the convention still render: they just come out as full-width prose.
 */
export async function parseActionBlocks(markdown: string): Promise<ActionBlock[]> {
  const tree = remark().parse(markdown) as Root;

  const groups: { heading?: string; nodes: RootContent[] }[] = [{ nodes: [] }];
  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 3) {
      groups.push({ heading: headingText(node), nodes: [] });
    } else {
      groups[groups.length - 1].nodes.push(node);
    }
  }

  const blocks: ActionBlock[] = [];
  for (const group of groups) {
    let image: ActionBlock["image"];
    const rest = group.nodes.filter((node) => {
      if (
        !image &&
        node.type === "paragraph" &&
        node.children.length === 1 &&
        node.children[0].type === "image" &&
        !VIDEO.test(node.children[0].url)
      ) {
        image = { src: node.children[0].url, alt: node.children[0].alt ?? "" };
        return false;
      }
      return true;
    });

    const source = rest
      .map((n) => markdown.slice(n.position!.start.offset, n.position!.end.offset))
      .join("\n\n");
    const rendered = source ? (await remark().use(html).process(source)).toString() : "";

    if (!group.heading && !image && !rendered.trim()) continue;
    blocks.push({ heading: group.heading, html: rendered, image });
  }
  return blocks;
}
