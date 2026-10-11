import Image from "next/image";
import { STAT_MOTIONS } from "@/lib/stat-motion";

interface MotionImageSlotProps {
  /** Key in STAT_MOTIONS */
  motion: string;
  alt?: string;
  /** Sizing and shape, same as ImageSlot, e.g. "h-[208px] w-full rounded-xl" */
  className?: string;
  sizes?: string;
}

// Animated stand-in for ImageSlot: stacked screenshots that fade out in turn (Figma 486:174, 493:831).
// The frame keeps its Figma proportions and scales to cover the slot, like object-cover.
export function MotionImageSlot({ motion, alt = "", className = "", sizes }: MotionImageSlotProps) {
  const preset = STAT_MOTIONS[motion];
  if (!preset) return null;
  const { frame, background, layers } = preset;
  const pct = (value: number, total: number) => `${(value / total) * 100}%`;

  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`relative overflow-hidden ${className}`}
      style={{ background, containerType: "size" }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          width: `max(100cqw, calc(100cqh * ${frame.width} / ${frame.height}))`,
          aspectRatio: `${frame.width} / ${frame.height}`,
        }}
      >
        {layers.map((layer, i) => {
          const [left, top, width, height] = layer.box;
          const crop = layer.crop;
          return (
            <div
              key={i}
              className={`absolute overflow-hidden ${layer.animationClass ? `stat-motion-layer ${layer.animationClass}` : ""}`}
              style={{
                left: pct(left, frame.width),
                top: pct(top, frame.height),
                width: pct(width, frame.width),
                height: pct(height, frame.height),
              }}
            >
              <div
                className="absolute"
                style={
                  crop
                    ? { left: `${crop.left}%`, top: `${crop.top}%`, width: `${crop.width}%`, height: `${crop.height}%` }
                    : { inset: 0 }
                }
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  sizes={sizes ?? "(max-width: 768px) 100vw, 480px"}
                  className="max-w-none object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
