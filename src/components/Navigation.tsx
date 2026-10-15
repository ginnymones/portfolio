"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Curve } from "@/components/Curve";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close the drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Compact bar after scrolling. Two thresholds (60 down, 10 up) so it doesn't flicker at the edge.
  useEffect(() => {
    const onScroll = () => setScrolled((prev) => (prev ? window.scrollY > 10 : window.scrollY > 60));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the drawer; focus moves into it on open and back to the hamburger on close
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      wasOpen.current = true;
      return () => document.removeEventListener("keydown", onKeyDown);
    }
    if (wasOpen.current) {
      menuButtonRef.current?.focus();
      wasOpen.current = false;
    }
  }, [isOpen]);

  const isActive = (href: string) =>
    href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      {/*
        The bar is fixed, not sticky, so it can shrink on scroll without moving the page: the spacer below holds
        its full height (88px phone, 170px desktop) plus 40px of breathing room, and never changes.
        Full: 170px on desktop (logo 70px). After scrolling: 70px (logo about 44px). Phone: 88px -> 64px.
        The logo shrinks with transform: scale (no reflow) and the bar's height is the only layout change, so
        the animation stays smooth. A soft drop shadow replaces the old line once the bar is compact.
      */}
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-cream transition-shadow duration-300 ease-out motion-reduce:transition-none ${
          scrolled ? "shadow-[0_4px_16px_rgba(0,0,0,0.08)]" : "shadow-[0_4px_16px_rgba(0,0,0,0)]"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:px-20 min-[1360px]:px-0 ${
            scrolled ? "h-16 md:h-[70px]" : "h-[88px] md:h-[170px]"
          }`}
        >
          <Link
            href="/"
            aria-label="Ginny Mones, home"
            className={`block origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              scrolled ? "scale-[0.74] md:scale-[0.63]" : "scale-100"
            }`}
          >
            <Image
              src="/branding/logo-sunset.svg"
              alt="Ginny Mones"
              width={100}
              height={70}
              priority
              className="h-[49px] w-auto md:h-[70px]"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="label group relative block w-20 pb-3 text-center text-burnt-sienna">
                  {label}
                  {/* Hover shows the same curve as the active state */}
                  <Curve
                    variant="simple"
                    strokeWidth={2}
                    className={`absolute bottom-0 left-1/2 h-[6px] w-[42px] -translate-x-1/2 transition-opacity ${
                      isActive(href) ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger. The drawer covers it when open, so it stays three static bars (no morph to an X). */}
          <button
            ref={menuButtonRef}
            type="button"
            className="-mr-2 flex size-10 flex-col items-center justify-center gap-[6px] md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <span className="block h-0.5 w-[26px] rounded-[1px] bg-burnt-sienna" />
            <span className="block h-0.5 w-[26px] rounded-[1px] bg-burnt-sienna" />
            <span className="block h-0.5 w-[26px] rounded-[1px] bg-burnt-sienna" />
          </button>
        </nav>

        {/*
          Mobile drawer (Figma "mobile menu / drawer (open)", 399:121). Always in the page and moved with
          transform/opacity only, so opening and closing never reflows the layout. The page is not scroll-locked;
          the scrim catches touches instead.
        */}
        <div id="mobile-drawer" className="md:hidden" inert={!isOpen}>
          <div
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-30 touch-none bg-dark-gray/45 transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
              isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />
          <aside
            aria-label="Menu"
            className={`fixed right-0 top-0 z-40 flex h-dvh w-[280px] flex-col overscroll-contain bg-cream px-6 pb-8 shadow-[-8px_0_24px_rgba(0,0,0,0.15)] transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "visible translate-x-0" : "invisible translate-x-full"
            }`}
          >
            <div className="flex h-[88px] shrink-0 items-center justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex size-10 items-center justify-center"
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <path d="M4 4L22 22M22 4L4 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-burnt-sienna" />
                </svg>
              </button>
            </div>
            {/* Extra right padding (16px on top of the drawer's 24px) so the curves don't crowd the edge */}
            <ul className="flex flex-col items-end gap-6 pr-4 pt-5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(href) ? "page" : undefined}
                    className="group relative block h-[42px] text-right font-serif text-[32px] leading-[32px] text-burnt-sienna"
                  >
                    {label}
                    {/* Figma "nav-mobile" (401:313): curve 103.68 x 4, 2px stroke, 8px under the text, centred under
                        the word. Shown for the current page (active) and on hover/focus (hover). */}
                    <Curve
                      variant="simple"
                      strokeWidth={2}
                      className={`absolute left-1/2 top-[40px] h-1 w-[103.68px] -translate-x-1/2 transition-opacity ${
                        isActive(href) ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </header>
      <div aria-hidden="true" className="h-[128px] md:h-[210px]" />
    </>
  );
}
