import { LightboxContent } from "@/components/Lightbox";
import type { ActionBlock } from "@/lib/action-blocks";

const imageHtml = (src: string, alt: string) => `<img src="${src}" alt="${alt.replace(/"/g, "&quot;")}">`;

// Figma: action (357:215). Blocks with an image and text always put the image left and the text right (Ginny, 2026-10-12);
// a lone image runs full width.
export function ActionSection({ blocks }: { blocks: ActionBlock[] }) {
  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block, i) => {
        const hasBody = !!block.html.trim();

        if (block.image && hasBody) {
          return (
            <div key={i} className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
              {block.stack ? (
                <div className="flex flex-col gap-5">
                  {block.stack.map((img) => (
                    <figure key={img.src} className="flex flex-col gap-4">
                      <div className="[&_.prose_img]:m-0 [&_.prose_img]:w-full">
                        <LightboxContent html={imageHtml(img.src, img.alt)} />
                      </div>
                      {img.alt && <figcaption className="text-warm-gray">{img.alt}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="[&_.prose_img]:m-0">
                  <LightboxContent html={imageHtml(block.image.src, block.image.alt)} />
                </div>
              )}
              <div>
                {block.heading && <h3 className="heading-3 mb-5 text-neutral-black">{block.heading}</h3>}
                <LightboxContent html={block.html} />
              </div>
            </div>
          );
        }

        if (block.image) {
          return (
            <figure key={i} className={`flex flex-col ${block.after ? "gap-5" : "gap-4"}`}>
              <div className="[&_.prose_img]:m-0 [&_.prose_img]:w-full">
                <LightboxContent html={imageHtml(block.image.src, block.image.alt)} />
              </div>
              {(block.image.alt || block.heading) && (
                <figcaption className="text-warm-gray">{block.image.alt || block.heading}</figcaption>
              )}
              {block.after && <LightboxContent html={block.after} />}
            </figure>
          );
        }

        return (
          <div key={i}>
            {block.heading && <h3 className="heading-3 mb-5 text-neutral-black">{block.heading}</h3>}
            <LightboxContent html={block.html} />
          </div>
        );
      })}
    </div>
  );
}
