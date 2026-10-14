import { Curve } from "@/components/Curve";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { MotionImageSlot } from "@/components/ui/MotionImageSlot";
import { Tag } from "@/components/ui/Tag";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import type { CompanyProject } from "@/lib/pages";

// Figma: "project / Amazon" etc. (357:41, mobile 364:116)
export function CompanyHighlight({ id, project }: { id: string; project: CompanyProject }) {
  // Optional: company highlights are standalone now, but a slug that points at an existing file still shows the button.
  const hasCaseStudy = !!project.caseStudy && !!getCaseStudyBySlug(project.caseStudy);

  return (
    <section id={id} className="flex w-full flex-col items-start gap-5 pb-16 md:gap-8 md:pb-28">
      <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />

      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-4">
        <Tag className="md:shrink-0">{project.company}</Tag>
        <h2 className="heading-2 text-[30px] leading-[1.15] text-neutral-black md:text-[40px] md:leading-none">
          {project.title}
        </h2>
      </div>

      {project.description && (
        <div className="flex w-full flex-col gap-5 text-warm-gray">
          {project.description.split(/\n{2,}/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {project.stats && project.stats.length > 0 && (
        <div
          className={`grid w-full grid-cols-1 gap-8 md:gap-x-8 md:gap-y-3 ${
            project.stats.length === 2 ? "md:max-w-[1000px] md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {project.stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="flex flex-col gap-[10px] pt-3 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-y-3 md:pt-0"
            >
              <p className="font-serif text-[44px] leading-none text-sunset md:text-5xl">{stat.value}</p>
              <p className="label text-dark-gray">{stat.label}</p>
              {stat.motion ? (
                <MotionImageSlot
                  motion={stat.motion}
                  alt={stat.imageAlt}
                  className="h-[200px] w-full rounded-xl md:h-[208px]"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              ) : (
                <ImageSlot
                  src={stat.image}
                  alt={stat.imageAlt}
                  label="Project image"
                  className="h-[200px] w-full rounded-xl md:h-[208px]"
                  sizes="(max-width: 768px) 100vw, 312px"
                />
              )}
              {stat.caption && <p className="text-warm-gray">{stat.caption}</p>}
              {stat.buttonLabel && (
                <div className="pt-2 md:pt-0">
                  {stat.buttonLink ? (
                    <Button
                      href={stat.buttonLink}
                      {...(/^https?:/.test(stat.buttonLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {stat.buttonLabel}
                    </Button>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full border border-ochre px-10 py-[14px] text-[18px] font-semibold uppercase leading-normal tracking-[0.05em] text-ochre">
                      {stat.buttonLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasCaseStudy && (
        <Button variant="text" href={`/works/${project.caseStudy}`}>
          Read case study
        </Button>
      )}
    </section>
  );
}
