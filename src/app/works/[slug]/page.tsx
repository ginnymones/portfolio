import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageBackground } from "@/components/PageBackground";
import { remark } from "remark";
import html from "remark-html";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Not Found" };
  }

  return {
    title: `${study.title} — Ginny Mones`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const processedContent = await remark().use(html).process(study.content);
  const contentHtml = processedContent.toString();

  return (
    <PageBackground
      backgroundType={study.backgroundType}
      backgroundImage={study.backgroundImage}
      backgroundVideo={study.backgroundVideo}
      backgroundColor={study.backgroundColor}
      gradientFrom={study.gradientFrom}
      gradientTo={study.gradientTo}
      gradientDirection={study.gradientDirection}
      overlayOpacity={study.overlayOpacity}
      overlayColor={study.overlayColor}
      className="min-h-screen"
    >
      <article className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Works", href: "/works" },
            { label: study.title },
          ]}
        />

        {/* Header Image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
          <Image
            src={study.headerImage}
            alt={`${study.title} header`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 896px"
          />
        </div>

        {/* Title & Meta */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {study.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-warm">
            {study.client && <span>Client: {study.client}</span>}
            {study.date && (
              <span>
                {new Date(study.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange hover:underline"
              >
                View Live →
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </PageBackground>
  );
}
