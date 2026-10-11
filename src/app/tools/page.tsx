import type { Metadata } from "next";
import Image from "next/image";
import { getAllTools } from "@/lib/tools";
import { getPageContent } from "@/lib/pages";
import { Curve } from "@/components/Curve";
import { PageBackground } from "@/components/PageBackground";
import { ToolsGrid } from "@/components/ToolsGrid";

export const metadata: Metadata = {
  title: "Tools — Ginny Mones",
  description: "Web apps, plugins, and coding projects built by Ginny Mones.",
};

// Figma: tools / hi-fi (359:152), hero 421:238 for 1024px and wider: 400px portrait (30% burnt-sienna circle, head popping
// out the top) beside the heading and subtitle. Below that, the tools / mobile frame (411:145): heading, curve, subtitle.
export default function ToolsPage() {
  const tools = getAllTools();
  const page = getPageContent("tools");

  return (
    <PageBackground
      backgroundType={page.backgroundType}
      backgroundImage={page.backgroundImage}
      backgroundVideo={page.backgroundVideo}
      backgroundColor={page.backgroundColor}
      gradientFrom={page.gradientFrom}
      gradientTo={page.gradientTo}
      gradientDirection={page.gradientDirection}
      overlayOpacity={page.overlayOpacity}
      overlayColor={page.overlayColor}
      className="w-full"
    >
      <div className="mx-auto max-w-[1000px] px-6 pb-16 pt-6 xl:px-0">
        <div className="flex flex-col items-start gap-4 pb-12 lg:hidden">
          <h1 className="heading-1 text-burnt-sienna">
            {page.heading || "Tools"}
            {page.headingAccent ? ` ${page.headingAccent}` : ""}
          </h1>
          <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />
          {page.subtitle && <p className="max-w-[560px] text-warm-gray">{page.subtitle}</p>}
        </div>

        <div className="hidden items-center gap-[72px] pb-[112px] lg:flex">
          {/* The head is drawn twice: the lower body is clipped to the circle, the top 211px of the art is not, so the
              head pops out above it. Both layers share the art's position from the Figma portrait. */}
          <div aria-hidden="true" className="relative size-[400px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-burnt-sienna/30" />
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <HeroArt className="left-[17px] top-[-48px] h-[495px] w-[374.391px]" imgClassName="left-[-22.32%] top-[-27.03%] h-[151.52%] w-[139.93%]" />
            </div>
            <HeroArt className="left-[17px] top-[-48px] h-[211px] w-[375px]" imgClassName="left-[-22.32%] top-[-63.41%] h-[355.47%] w-[139.93%]" />
          </div>
          <div className="flex flex-col items-start gap-6">
            <h1 className="heading-1 text-burnt-sienna">
              {page.heading || "Tools"}
              {page.headingAccent ? ` ${page.headingAccent}` : ""}
            </h1>
            {page.subtitle && <p className="max-w-[528px] text-warm-gray">{page.subtitle}</p>}
          </div>
        </div>

        <section id="tools" className="scroll-mt-20">
          <ToolsGrid tools={tools} />
        </section>
      </div>
    </PageBackground>
  );
}

function HeroArt({ className, imgClassName }: { className: string; imgClassName: string }) {
  return (
    <div className={`absolute overflow-hidden ${className}`}>
      <Image
        src="/images/tools/tools-hero-art.png"
        alt=""
        width={1668}
        height={2388}
        sizes="525px"
        className={`absolute max-w-none ${imgClassName}`}
      />
    </div>
  );
}
