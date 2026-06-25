"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-warm/20">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-foreground hover:text-accent-orange transition-colors"
        >
          Ginny Mones
        </Link>

        <ul className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href));

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent-orange"
                      : "text-neutral-dark hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
