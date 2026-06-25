import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getPageContent } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";
import { WorksGrid } from "@/components/WorksGrid";

export const metadata: Metadata = {
  title: "Works — Ginny Mones",
  description: "Browse case studies and design work by Ginny Mones.",
};

export default function WorksPage() {
  const studies = getAllCaseStudies();
  const page = getPageContent("works");

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
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {page.heading || "Works"}
        </h1>
        <p className="text-lg text-neutral-dark mb-12">
          {page.subtitle || "Selected case studies from my design practice."}
        </p>

        <WorksGrid
          studies={studies.map((s) => ({
            slug: s.slug,
            title: s.title,
            thumbnail: s.thumbnail,
            summary: s.summary,
            tags: s.tags,
          }))}
        />
      </section>
    </PageBackground>
  );
}
