import Image from "next/image";
import { LoopVideo } from "@/components/ui/LoopVideo";

// A .mp4 or .webm picked in the CMS image field plays as a silent loop instead of a still.
const VIDEO_EXT = /\.(mp4|webm)$/i;

interface ImageSlotProps {
  src?: string;
  alt?: string;
  label: string;
  /** Sizing and shape, e.g. "h-[208px] w-[312px] rounded-xl" */
  className?: string;
  sizes?: string;
  /** Extra classes for the image itself, e.g. "object-top" to anchor screenshots to their top edge */
  imageClassName?: string;
  /** Load right away; use for the image at the top of the page */
  priority?: boolean;
}

// Figma: "image / Project image". Real assets drop in via the CMS; until then a khaki placeholder shows.
export function ImageSlot({ src, alt = "", label, className = "", sizes, imageClassName = "", priority }: ImageSlotProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-khaki ${className}`}>
      {src && VIDEO_EXT.test(src) ? (
        <LoopVideo src={src} alt={alt} />
      ) : src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "(max-width: 768px) 100vw, 400px"} className={`object-cover ${imageClassName}`} />
      ) : (
        <span className="label max-w-[280px] px-4 text-center text-warm-gray">{label}</span>
      )}
    </div>
  );
}
