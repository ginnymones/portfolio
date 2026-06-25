import { getSiteSettings } from "@/lib/site-settings";
import { getPageContent } from "@/lib/pages";

export function ContactSection() {
  const settings = getSiteSettings();
  const page = getPageContent("contact");

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <div className="bg-neutral-dark rounded-2xl p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
          {page.heading || "Let's work together"}
        </h2>
        <p className="text-neutral-warm text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {page.subtitle ||
            "Whether you have a project in mind, need design support, or just want to chat about ideas — I'm always open to new conversations."}
        </p>
        {page.ctaPrimaryLabel && page.ctaPrimaryLink && (
          <a
            href={page.ctaPrimaryLink}
            className="inline-block px-8 py-4 bg-accent-orange text-background font-medium rounded-lg hover:bg-accent-orange/90 transition-colors text-lg"
          >
            {page.ctaPrimaryLabel}
          </a>
        )}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {settings.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-warm hover:text-background transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
