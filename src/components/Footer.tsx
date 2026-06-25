import { getSiteSettings } from "@/lib/site-settings";

export function Footer() {
  const settings = getSiteSettings();

  return (
    <footer className="border-t border-neutral-warm/20 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-neutral-warm text-sm text-center">
          &copy; {new Date().getFullYear()} {settings.copyright}
        </p>
      </div>
    </footer>
  );
}
