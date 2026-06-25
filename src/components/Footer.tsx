import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";

export function Footer() {
  const settings = getSiteSettings();

  return (
    <footer
      id="contact"
      className="bg-neutral-dark text-background mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {settings.footerHeading}
            </h2>
            <p className="text-neutral-warm leading-relaxed max-w-md">
              {settings.footerDescription}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${settings.email}`}
              className="text-accent-yellow hover:text-accent-orange transition-colors font-medium"
            >
              {settings.email}
            </a>
            <div className="flex flex-wrap gap-6 mt-2">
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
        </div>

        <div className="border-t border-neutral-warm/30 mt-12 pt-8 flex items-center justify-between">
          <p className="text-neutral-warm text-sm">
            &copy; {new Date().getFullYear()} {settings.copyright}
          </p>
          <Link
            href="/works"
            className="text-sm text-neutral-warm hover:text-background transition-colors"
          >
            View Works
          </Link>
        </div>
      </div>
    </footer>
  );
}
