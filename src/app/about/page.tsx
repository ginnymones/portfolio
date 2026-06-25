import type { Metadata } from "next";
import { getPageContent } from "@/lib/pages";
import { PageBackground } from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "About — Ginny Mones",
  description:
    "Learn more about Ginny Mones, a UX/UI designer passionate about solving real problems through design.",
};

export default function AboutPage() {
  const page = getPageContent("about");

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
        <div className="mb-16">
          <p className="text-lg text-neutral-dark leading-relaxed mb-6">
            I&apos;m a designer who believes that good design is invisible — it
            just works. With a background in product design and user experience, I
            focus on creating digital products that are both beautiful and
            functional.
          </p>
          <p className="text-lg text-neutral-dark leading-relaxed mb-6">
            My process combines user research, strategic thinking, and visual craft
            to deliver experiences that people love to use. Whether it&apos;s a
            complex SaaS platform or a consumer mobile app, I bring the same level
            of care and attention to detail.
          </p>
          <p className="text-lg text-neutral-dark leading-relaxed">
            When I&apos;m not designing, you can find me exploring new creative
            tools, sketching in my notebook, or hunting for the perfect cup of
            coffee.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            <ExperienceItem
              role="Senior UX Designer"
              company="Company Name"
              period="2024 — Present"
              description="Leading design for core product features, conducting user research, and mentoring junior designers."
            />
            <ExperienceItem
              role="UX/UI Designer"
              company="Previous Company"
              period="2022 — 2024"
              description="Designed end-to-end experiences for web and mobile products, collaborating closely with engineering and product teams."
            />
            <ExperienceItem
              role="Visual Designer"
              company="Earlier Company"
              period="2020 — 2022"
              description="Created brand identities, marketing materials, and digital interfaces for a variety of clients."
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Find Me Online
          </h2>
          <div className="flex flex-wrap gap-4">
            <SocialLink href="https://dribbble.com/ginnymones" label="Dribbble" />
            <SocialLink
              href="https://linkedin.com/in/ginnymones"
              label="LinkedIn"
            />
            <SocialLink
              href="https://behance.net/ginnymones"
              label="Behance"
            />
          </div>
        </div>
      </section>
    </PageBackground>
  );
}

function ExperienceItem({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div className="border-l-2 border-accent-orange/30 pl-6">
      <h3 className="font-semibold text-foreground">{role}</h3>
      <p className="text-sm text-accent-orange font-medium">{company}</p>
      <p className="text-sm text-neutral-warm mt-1">{period}</p>
      <p className="text-neutral-dark mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-2 border border-neutral-warm/30 rounded-lg text-sm font-medium text-neutral-dark hover:border-accent-orange hover:text-accent-orange transition-colors"
    >
      {label}
    </a>
  );
}
