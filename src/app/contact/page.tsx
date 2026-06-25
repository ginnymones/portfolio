import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getPageContent } from "@/lib/pages";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PageBackground } from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Contact — Ginny Mones",
  description:
    "Get in touch with Ginny Mones for design collaborations and projects.",
};

export default function ContactPage() {
  const recentWorks = getAllCaseStudies().slice(0, 3);
  const page = getPageContent("contact");

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
        {/* Recent work context */}
        {recentWorks.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Recent Work
            </h2>
            <p className="text-neutral-dark mb-8">
              Here&apos;s a glimpse of what I&apos;ve been working on lately.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentWorks.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  slug={study.slug}
                  title={study.title}
                  thumbnail={study.thumbnail}
                  summary={study.summary}
                  tags={study.tags}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-neutral-dark rounded-2xl p-10 md:p-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-background mb-4">
            {page.heading || "Let's work together"}
          </h1>
          <p className="text-neutral-warm text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {page.subtitle ||
              "Whether you have a project in mind, need design support, or just want to chat about ideas — I'm always open to new conversations."}
          </p>
          {page.ctaPrimaryLabel && page.ctaPrimaryLink && (
            <a
              href={page.ctaPrimaryLink}
              className="inline-block px-8 py-4 bg-accent-orange text-background font-medium rounded-lg hover:bg-accent-orange/90 transition-colors text-lg"
            >
              {page.ctaPrimaryLabel}
            </a>
          )}
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://dribbble.com/ginnymones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-warm hover:text-background transition-colors text-sm"
            >
              Dribbble
            </a>
            <a
              href="https://linkedin.com/in/ginnymones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-warm hover:text-background transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://behance.net/ginnymones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-warm hover:text-background transition-colors text-sm"
            >
              Behance
            </a>
          </div>
        </div>
      </section>
    </PageBackground>
  );
}
