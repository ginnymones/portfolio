import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { BackToTop } from "@/components/BackToTop";
import { Character } from "@/components/Character";

export const metadata: Metadata = {
  title: "Ginny Mones — Creative Problem Solver",
  description: "Design portfolio showcasing case studies and creative work.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <ContactSection />
        <Footer />
        <Character />
        <BackToTop />
      </body>
    </html>
  );
}
