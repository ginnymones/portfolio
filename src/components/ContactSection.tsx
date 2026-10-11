import Image from "next/image";
import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/pages";
import { SocialLinks } from "@/components/SocialLinks";

// Figma: "get in touch - samp" (392:277) for 1024px and wider: sunset panel, warm-white text, 1192px wide, with the
// illustration popping out of the top-left corner. Below that (Figma "get in touch / mobile", 416:197) the panel is 358px wide with no illustration, 20px corners and smaller type.
// Edit the heading and copy in TinaCMS: Pages > Contact. Email and social links (shown as icon + label, email first): Site Settings. Substack stays in Site Settings but is left out of this panel.
export function ContactSection() {
  const settings = getSiteSettings();
  const page = getPageContent("contact");

  return (
    <section id="contact" className="w-full overflow-x-clip px-4 pb-10 pt-12 md:px-6 md:pb-20 md:pt-20 lg:pt-32">
      <div className="relative mx-auto max-w-[1200px] lg:[--art-left:-24px] min-[1340px]:[--art-left:-43px]">
        <div className="flex flex-col items-center gap-[18px] rounded-[20px] bg-sunset px-4 py-12 text-center text-warm-white md:gap-7 md:rounded-[24px] md:px-6 md:py-20 lg:pl-[calc(var(--art-left)+517px)] lg:pr-[max(24px,calc(100%-(var(--art-left)+517px)-496px))]">
          <h2 className="heading-1 text-4xl md:text-5xl">{page.heading || "Get in touch"}</h2>
          <p className="max-w-[460px] text-[15px] md:text-base">
            {page.subtitle || "Have a brand, a product, or a team that needs a creative lead? Say hola."}
          </p>
          <SocialLinks links={settings.socialLinks.filter((link) => !/substack/i.test(link.label))} email={settings.email} variant="panel" />
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Ginny Mones</p>
        </div>

        {/* Illustration: 107px above the panel, bottom-aligned, overhanging the panel's left edge (--art-left: 43px from 1340px
            wide, the 24px page gutter below that so the art is never cut off by the screen edge). The text column starts at
            the art's right edge (517px wide) and is centered in the 496px beside it, so the gap to the art stays fixed at any width. */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[var(--art-left)] -top-[107px] bottom-0 hidden lg:block">
          <Image
            src="/images/get-in-touch-art.png"
            alt=""
            width={1034}
            height={1234}
            sizes="517px"
            className="h-full w-auto max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
