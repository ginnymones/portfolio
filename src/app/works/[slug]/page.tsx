import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getAdjacentCaseStudies,
} from "@/lib/case-studies";
import { parseActionBlocks } from "@/lib/action-blocks";
import { PageBackground } from "@/components/PageBackground";
import { ActionSection } from "@/components/ActionSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";
import { CaseStudyLinks } from "@/components/CaseStudyLinks";
import { Curve } from "@/components/Curve";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Tag } from "@/components/ui/Tag";

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

// Text fields (challenge, results copy): a blank line starts a new block. A block whose lines all start with "- " is a
// bullet list, and one whose lines all start with "1. ", "2. " … is a numbered list (as in the Figma text lists).
type TextBlock = { kind: "p"; text: string } | { kind: "ul" | "ol"; items: string[] };

const textBlocks = (text?: string): TextBlock[] =>
  (text ?? "")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): TextBlock => {
      const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.every((l) => /^[-•]\s+/.test(l))) return { kind: "ul", items: lines.map((l) => l.replace(/^[-•]\s+/, "")) };
      if (lines.every((l) => /^\d+\.\s+/.test(l))) return { kind: "ol", items: lines.map((l) => l.replace(/^\d+\.\s+/, "")) };
      return { kind: "p", text: chunk };
    });

function TextBlocks({ blocks }: { blocks: TextBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.kind === "p" ? (
          <p key={i} className="text-dark-gray">{b.text}</p>
        ) : (
          (() => {
            const List = b.kind === "ul" ? "ul" : "ol";
            return (
              <List key={i} className={`pl-6 text-dark-gray ${b.kind === "ul" ? "list-disc" : "list-decimal"}`}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </List>
            );
          })()
        ),
      )}
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="heading-4 text-xl text-sunset md:text-2xl">{children}</h2>;
}

// Figma: case study / hi-fi (357:171). Sections: Challenge, Action, Results. Challenge and Results are hidden when empty.
// No mobile frame exists yet: the stacked layout below is a proposal.
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const actionBlocks = await parseActionBlocks(study.content);
  // An Action made only of images and galleries has nothing to label (Figma: Chansey sketches has no Action heading)
  const actionHasText = /\S/.test(study.content.replace(/!\[[^\]]*\]\([^)]*\)|:::\w*|\*\*\*|\+\+\+/g, ""));
  const challenge = textBlocks(study.challenge);
  const resultsCopy = textBlocks(study.resultsCopy);
  const stats = study.resultsStats ?? [];
  // Homepage-only company case studies are left out of related and prev/next
  const related = study.homepageOnly ? [] : getRelatedCaseStudies(slug, study.tags, 3);
  const { prev, next } = study.homepageOnly ? { prev: null, next: null } : getAdjacentCaseStudies(slug);

  const years = study.years || (study.date ? String(new Date(study.date).getFullYear()) : "");
  const meta = [
    { label: "Client", value: study.client },
    { label: "Role", value: study.role },
    { label: "Years", value: years },
  ].filter((m) => m.value);

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
      <article className="mx-auto max-w-[1000px] px-6 xl:px-0">
        <div className="pt-2">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Works", href: "/works" },
              { label: study.title },
            ]}
          />
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-8 pb-16 md:pb-24 lg:flex-row lg:items-start lg:gap-12">
          <ImageSlot
            src={study.headerImage}
            alt={study.headerImageAlt || `${study.title} header`}
            label="Hero image"
            className="aspect-[4/3] w-full rounded-xl lg:aspect-auto lg:h-[440px] lg:w-[600px] lg:shrink-0"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
          <div className="flex flex-col items-start gap-5 lg:w-[352px]">
            {study.tags[0] && <Tag>{study.tags[0]}</Tag>}
            <h1 className="heading-2 text-[30px] leading-[1.15] text-neutral-black md:text-[40px] md:leading-none">
              {study.title}
            </h1>
            {study.summary && <p className="text-warm-gray">{study.summary}</p>}
            <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />
            {meta.length > 0 && (
              <dl className="flex flex-col gap-3">
                {meta.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <dt className="label text-sunset">{m.label}</dt>
                    <dd className="text-dark-gray">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {study.liveUrl && (
              <Button variant="text" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                View live
              </Button>
            )}
          </div>
        </header>

        {/* Challenge */}
        {challenge.length > 0 && (
          <section className="flex flex-col gap-5 pb-12 md:pb-[72px]">
            <SectionHeading>Challenge</SectionHeading>
            <TextBlocks blocks={challenge} />
          </section>
        )}

        {/* Action */}
        {actionBlocks.length > 0 && (
          <section className="flex flex-col gap-8 pb-12 md:gap-12 md:pb-[72px]">
            {actionHasText && <SectionHeading>Action</SectionHeading>}
            <ActionSection blocks={actionBlocks} />
          </section>
        )}

        {/* Results */}
        {(stats.length > 0 || resultsCopy.length > 0) && (
          <section className="flex flex-col gap-10 pb-16 md:pb-28">
            <SectionHeading>Results</SectionHeading>
            {stats.length > 0 && (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                {stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="flex flex-col items-center gap-3 text-center">
                    <p className="font-serif text-5xl leading-none text-sunset">{stat.value}</p>
                    {stat.icon && <ImageSlot src={stat.icon} alt="" label="" className="size-16 rounded-full" sizes="64px" />}
                    <p className="label text-dark-gray">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
            <TextBlocks blocks={resultsCopy} />
          </section>
        )}

        <CaseStudyLinks links={study.links || []} />

        <CaseStudyNav prev={prev} next={next} />
      </article>

      {/* Related Case Studies */}
      <div className="mx-auto max-w-[1200px] px-6 xl:px-0">
        <RelatedCaseStudies studies={related} />
      </div>
    </PageBackground>
  );
}
