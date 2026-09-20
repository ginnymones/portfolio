import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { getPageContent } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";
import { ToolsGrid } from "@/components/ToolsGrid";

export const metadata: Metadata = {
  title: "Tools — Ginny Mones",
  description: "Web apps, plugins, and coding projects built by Ginny Mones.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const page = getPageContent("tools");

  return (
    <>
      {/* Hero: character left, text right. The background (image, video, color, or gradient) is set in the CMS */}
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
        {/* Same placement as the home page hero: viewport-height, vertically centered, max-w-5xl, 320px character */}
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
          <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <Image
              src="/images/tools/ginny-lab.svg"
              alt=""
              width={425}
              height={515}
              priority
              unoptimized
              className="w-[240px] md:w-[320px] h-auto flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
                {page.heading || "Tools"}
                {page.headingAccent && (
                  <>
                    {" "}
                    <span className="text-accent-orange">{page.headingAccent}</span>
                  </>
                )}
              </h1>
              {page.subtitle && (
                <p
                  className={`text-xl md:text-2xl font-normal text-neutral-dark max-w-[511px] leading-normal ${
                    page.tagline ? "mb-8" : ""
                  }`}
                >
                  {page.subtitle}
                </p>
              )}
              {page.tagline && (
                <p className="text-xl md:text-2xl font-medium text-neutral-dark max-w-[511px] leading-normal">
                  {page.tagline}
                </p>
              )}
              {((page.ctaPrimaryLabel && page.ctaPrimaryLink) ||
                (page.ctaSecondaryLabel && page.ctaSecondaryLink)) && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                  {page.ctaPrimaryLabel && page.ctaPrimaryLink && (
                    <Link
                      href={page.ctaPrimaryLink}
                      className="px-8 py-3 bg-accent-orange text-background font-medium rounded-lg hover:bg-accent-orange/90 transition-colors"
                    >
                      {page.ctaPrimaryLabel}
                    </Link>
                  )}
                  {page.ctaSecondaryLabel && page.ctaSecondaryLink && (
                    <Link
                      href={page.ctaSecondaryLink}
                      className="px-8 py-3 border border-neutral-warm/40 text-foreground font-medium rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
                    >
                      {page.ctaSecondaryLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </PageBackground>

      <section id="tools" className="max-w-[1184px] mx-auto px-6 pb-20 scroll-mt-20">
        <Suspense fallback={null}>
          <ToolsGrid tools={tools} />
        </Suspense>
      </section>
    </>
  );
}
