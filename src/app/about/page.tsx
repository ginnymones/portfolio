import type { Metadata } from "next";
import { getPageContent, richTextToHtml } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "About — Ginny Mones",
  description:
    "Learn more about Ginny Mones, a UX/UI designer passionate about solving real problems through design.",
};

export default function AboutPage() {
  const page = getPageContent("about");
  const bioHtml = richTextToHtml(page.bio);

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
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          {page.heading || "About Me"}
        </h1>

        {/* Bio */}
        {bioHtml && (
          <div
            className="prose mb-16 text-lg"
            dangerouslySetInnerHTML={{ __html: bioHtml }}
          />
        )}

        {/* Experience */}
        {page.experience && page.experience.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {page.experience.map((item, index) => (
                <div key={index} className="border-l-2 border-accent-orange/30 pl-6">
                  <h3 className="font-semibold text-foreground">{item.role}</h3>
                  <p className="text-sm text-accent-orange font-medium">
                    {item.company}
                  </p>
                  <p className="text-sm text-neutral-warm mt-1">{item.period}</p>
                  {item.description && (
                    <p className="text-neutral-dark mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {page.socialLinks && page.socialLinks.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Find Me Online
            </h2>
            <div className="flex flex-wrap gap-4">
              {page.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border border-neutral-warm/30 rounded-lg text-sm font-medium text-neutral-dark hover:border-accent-orange hover:text-accent-orange transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </PageBackground>
  );
}
