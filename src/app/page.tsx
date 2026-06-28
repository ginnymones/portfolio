import Link from "next/link";
import { getPageContent } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";
import { Character } from "@/components/Character";
import { HeroContent } from "@/components/HeroContent";

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
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Character */}
        <div className="flex-shrink-0">
          <Character variant="home" />
        </div>

        {/* Text content with staggered entrance */}
        <HeroContent
          heading={page.heading || ""}
          headingAccent={page.headingAccent || ""}
          subtitle={page.subtitle || ""}
          tagline={page.tagline || ""}
          ctaPrimaryLabel={page.ctaPrimaryLabel}
          ctaPrimaryLink={page.ctaPrimaryLink}
          ctaSecondaryLabel={page.ctaSecondaryLabel}
          ctaSecondaryLink={page.ctaSecondaryLink}
        />
      </div>
    </PageBackground>
  );
}
