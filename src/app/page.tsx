import Image from "next/image";
import Link from "next/link";
import { getPageContent } from "@/lib/pages";
import { Curve } from "@/components/Curve";
import { CompanyHighlight } from "@/components/CompanyHighlight";
import { SectionDots } from "@/components/SectionDots";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";

// Figma: homepage / hi-fi (357:13), mobile draft (364:96)
export default function Home() {
  const page = getPageContent("home");
  const projects = page.companyProjects ?? [];
  const ids = projects.map((_, i) => `highlight-${i + 1}`);

  return (
    <div className="mx-auto flex max-w-[1000px] flex-col items-center px-6 xl:px-0">
      {/* Hero */}
      <section
        id="intro"
        className="flex w-full scroll-mt-24 flex-col items-start gap-5 pb-16 pt-[43px] md:scroll-mt-36 md:gap-8 md:pb-28 md:pt-6 lg:flex-row lg:items-center lg:gap-[72px]"
      >
        {/* Hero illustration (Figma 367:104): a circle with the head popping out of the top. The artwork is
            443x448 around a 400px circle, so it hangs 22px past the left and 48px above the circle box. */}
        <div className="flex w-full justify-center pb-2 lg:block lg:w-auto lg:pb-0">
          <div className="relative size-[220px] shrink-0 md:size-[300px] lg:size-[400px]">
            {page.portrait ? (
              <Image
                src={page.portrait}
                alt={page.portraitAlt || ""}
                width={886}
                height={896}
                priority
                sizes="(max-width: 768px) 244px, (max-width: 1024px) 332px, 443px"
                className="absolute max-w-none"
                style={{ left: "-5.5%", top: "-12%", width: "110.75%", height: "112%" }}
              />
            ) : (
              <ImageSlot label="Illustration" className="size-full rounded-full" sizes="400px" />
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 md:gap-6 lg:max-w-[528px]">
          <h1 className="heading-1 text-[40px] text-burnt-sienna md:text-5xl">{page.heading}</h1>
          <p className="heading-3 text-2xl leading-tight text-warm-gray md:text-[32px] md:leading-none">
            {page.subtitle}
          </p>
          {page.heroBody && <p className="text-warm-gray">{page.heroBody}</p>}
          {page.ctaPrimaryLabel && page.ctaPrimaryLink && (
            <Button href={page.ctaPrimaryLink}>{page.ctaPrimaryLabel}</Button>
          )}
        </div>
      </section>

      {/* Company highlights: standalone career snapshots with no case study behind them (Ginny's call, 2026-10-09) */}
      {projects.length > 0 && (
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 -left-24 hidden xl:block">
            <div className="pointer-events-auto sticky top-[40vh]">
              <SectionDots ids={ids} labels={projects.map((p) => p.company)} />
            </div>
          </div>
          {page.companyIntro && <p className="pb-5 text-warm-gray md:pb-8">{page.companyIntro}</p>}
          {projects.map((project, i) => (
            <CompanyHighlight key={project.company} id={ids[i]} project={project} />
          ))}
        </div>
      )}

      {/* Other stuff */}
      {(page.otherHeading || (page.otherTiles && page.otherTiles.length > 0)) && (
        <section className="flex w-full flex-col items-center gap-6 pb-16 text-center md:pb-28">
          {page.otherHeading && <h2 className="heading-2 text-burnt-sienna">{page.otherHeading}</h2>}
          <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />
          {page.otherText && <p className="max-w-[420px] text-warm-gray">{page.otherText}</p>}
          <div className="flex flex-wrap justify-center gap-8">
            {page.otherTiles?.map((tile) => (
              <Link key={tile.label} href={tile.link} className="group flex flex-col items-center gap-3">
                <ImageSlot
                  src={tile.image}
                  alt={tile.imageAlt}
                  label={`${tile.label} preview`}
                  className="h-[170px] w-[260px] rounded-xl transition-opacity group-hover:opacity-90"
                  sizes="260px"
                />
                <span className="heading-5 text-sunset">{tile.label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
