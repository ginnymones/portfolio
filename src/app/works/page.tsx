import { Suspense } from "react";
import type { Metadata } from "next";
import { getListedCaseStudies } from "@/lib/case-studies";
import { getPageContent } from "@/lib/pages";
import { getSiteSettings } from "@/lib/site-settings";
import { PageBackground } from "@/components/PageBackground";
import { WorksGrid } from "@/components/WorksGrid";
import { Curve } from "@/components/Curve";

export const metadata: Metadata = {
  title: "Works — Ginny Mones",
  description: "Browse case studies and design work by Ginny Mones.",
};

export default function WorksPage() {
  const studies = getListedCaseStudies();
  const page = getPageContent("works");
  const settings = getSiteSettings();

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
      className="min-h-screen"
    >
      <section className="mx-auto max-w-[1000px] px-6 pb-16 pt-6 xl:px-0">
        <div className="flex flex-col items-start gap-4 pb-12">
          <h1 className="heading-1 text-burnt-sienna">{page.heading || "Works"}</h1>
          <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />
          <p className="max-w-[560px] text-warm-gray">
            {page.subtitle || "Selected case studies from my design practice."}
          </p>
        </div>

        <Suspense fallback={null}>
          <WorksGrid
            studies={studies.map((s) => ({
              slug: s.slug,
              title: s.title,
              thumbnail: s.thumbnail,
              thumbnailAlt: s.thumbnailAlt,
              summary: s.summary,
              tags: s.tags,
            }))}
            availableTags={settings.workTags}
          />
        </Suspense>
      </section>
    </PageBackground>
  );
}
