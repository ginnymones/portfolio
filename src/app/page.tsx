import Link from "next/link";
import { getPageContent } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";

export default function Home() {
  const page = getPageContent("home");

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
      className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          {page.heading}{" "}
          <span className="text-accent-orange">{page.headingAccent}</span>.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-dark mb-4 leading-relaxed">
          {page.subtitle}
        </p>
        <p className="text-lg text-neutral-warm mb-10">{page.tagline}</p>
        <div className="flex items-center justify-center gap-4">
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
      </div>
    </PageBackground>
  );
}
