import { remark } from "remark";
import html from "remark-html";
import type { Root, RootContent } from "mdast";

export interface ActionBlock {
  heading?: string;
  html: string;
  image?: { src: string; alt: string };
  /** Two or more images written together (one line each, no blank line between): stacked in the image column, each with its alt text as a caption. */
  stack?: { src: string; alt: string }[];
  /** Text under a full-width image and its caption, in the same block (written after a `+++` line). */
  after?: string;
}

const VIDEO = /\.(mp4|webm)$/i;

function headingText(node: RootContent): string {
  if (node.type !== "heading") return "";
  return node.children.map((c) => ("value" in c ? c.value : "")).join("");
}

/**
 * Splits the Action markdown into blocks for the image-left text/image layout.
 * A `###` heading starts a block; a `***` line starts a new one without a heading (use it to end an image + text row
 * so the next paragraphs run full width). Every stand-alone image is paired with its neighbouring text as a side image;
 * everything else stays as prose. Anything before the first `###` is an intro block with no heading.
 * Images on consecutive lines (no blank line between) form a stack: one image column holding all of them.
 * A line with just `+++` after a stand-alone image keeps the text that follows in the same block, under the image's caption.
 * Write-ups that don't follow the convention still render: they just come out as full-width prose.
 */
export async function parseActionBlocks(markdown: string): Promise<ActionBlock[]> {
  const tree = remark().parse(markdown) as Root;

  const groups: { heading?: string; nodes: RootContent[] }[] = [{ nodes: [] }];
  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 3) {
      groups.push({ heading: headingText(node), nodes: [] });
    } else if (node.type === "thematicBreak") {
      groups.push({ nodes: [] }); // `***` ends the current image + text row without adding a heading
    } else {
      groups[groups.length - 1].nodes.push(node);
    }
  }

  // A paragraph made only of images (and the line breaks between them). Videos stay inline in the prose.
  const imagesOf = (node: RootContent) => {
    if (node.type !== "paragraph") return [];
    const imgs = node.children.flatMap((c) => (c.type === "image" ? [c] : []));
    const onlyImages = node.children.every((c) => c.type === "image" || (c.type === "text" && !c.value.trim()));
    return onlyImages && imgs.length > 0 && imgs.every((i) => !VIDEO.test(i.url)) ? imgs : [];
  };
  const isImage = (node: RootContent) => imagesOf(node).length > 0;

  const render = async (nodes: RootContent[]) => {
    const source = nodes.map((n) => markdown.slice(n.position!.start.offset, n.position!.end.offset)).join("\n\n");
    return source ? (await remark().use(html).process(source)).toString() : "";
  };

  const blocks: ActionBlock[] = [];
  for (const group of groups) {
    // Walk the group in order. Every stand-alone image is paired with the text run that follows it, or, when
    // no text follows before the next image, with the text run just before it. Pairs become image-left rows.
    type Row = { image?: ActionBlock["image"]; stack?: ActionBlock["stack"]; nodes: RootContent[] };
    const rows: Row[] = [];
    let run: RootContent[] = [];
    let waiting: Pick<Row, "image" | "stack"> | undefined;
    const isBelowMarker = (node: RootContent) =>
      node.type === "paragraph" &&
      node.children.length === 1 &&
      node.children[0].type === "text" &&
      node.children[0].value.trim() === "+++";
    let belowNodes: RootContent[] | undefined;
    const flush = () => {
      if (waiting) {
        rows.push({ ...waiting, nodes: run });
        waiting = undefined;
      } else if (run.length) {
        rows.push({ nodes: run });
      }
      run = [];
    };
    for (const node of group.nodes) {
      if (belowNodes) {
        belowNodes.push(node);
        continue;
      }
      if (isBelowMarker(node)) {
        // text after the marker belongs under the image just before it
        if (waiting && !run.length) belowNodes = [];
        continue;
      }
      if (isImage(node)) {
        const all = imagesOf(node).map((i) => ({ src: i.url, alt: i.alt ?? "" }));
        const image = { image: all[0], ...(all.length > 1 ? { stack: all } : {}) };
        if (waiting) {
          flush(); // the earlier image has no text of its own
        } else if (run.length) {
          rows.push({ ...image, nodes: run }); // text before the image: they form one row
          run = [];
          continue;
        }
        waiting = image;
      } else {
        run.push(node);
      }
    }
    flush();
    const belowRow = belowNodes ? rows[rows.length - 1] : undefined;
    const belowHtml = belowNodes && belowRow ? await render(belowNodes) : "";

    let first = true;
    for (const row of rows) {
      const rendered = await render(row.nodes);
      blocks.push({
        heading: first ? group.heading : undefined,
        html: rendered,
        image: row.image,
        ...(row.stack ? { stack: row.stack } : {}),
        ...(row === belowRow && belowHtml ? { after: belowHtml } : {}),
      });
      first = false;
    }
    if (first && group.heading) blocks.push({ heading: group.heading, html: "" });
  }
  return blocks;
}
