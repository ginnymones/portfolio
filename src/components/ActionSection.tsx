import { LightboxContent } from "@/components/Lightbox";
import type { ActionBlock } from "@/lib/action-blocks";

const imageHtml = (src: string, alt: string) => `<img src="${src}" alt="${alt.replace(/"/g, "&quot;")}">`;

// Figma: action (357:215). Blocks with an image and text alternate sides; a lone image runs full width.
export function ActionSection({ blocks }: { blocks: ActionBlock[] }) {
  let twoColumnIndex = 0;

  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block, i) => {
        const hasBody = !!block.html.trim();

        if (block.image && hasBody) {
          const imageFirst = twoColumnIndex++ % 2 === 0;
          return (
            <div key={i} className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
              <div className={`[&_.prose_img]:m-0 ${imageFirst ? "" : "md:order-2"}`}>
                <LightboxContent html={imageHtml(block.image.src, block.image.alt)} />
              </div>
              <div className={imageFirst ? "" : "md:order-1"}>
                {block.heading && <h3 className="heading-3 mb-3 text-neutral-black">{block.heading}</h3>}
                <LightboxContent html={block.html} />
              </div>
            </div>
          );
        }

        if (block.image) {
          return (
            <figure key={i} className="flex flex-col gap-4">
              <div className="[&_.prose_img]:m-0 [&_.prose_img]:w-full">
                <LightboxContent html={imageHtml(block.image.src, block.image.alt)} />
              </div>
              {(block.image.alt || block.heading) && (
                <figcaption className="text-warm-gray">{block.image.alt || block.heading}</figcaption>
              )}
            </figure>
          );
        }

        return (
          <div key={i}>
            {block.heading && <h3 className="heading-3 mb-3 text-neutral-black">{block.heading}</h3>}
            <LightboxContent html={block.html} />
          </div>
        );
      })}
    </div>
  );
}
