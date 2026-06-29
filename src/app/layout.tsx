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
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Ginny Mones — Creative Problem Solver",
  description: "Ginny's creative journey and experiments, all in portfolio.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Ginny Mones — Creative Problem Solver",
    description: "Ginny's creative journey and experiments, all in portfolio.",
    url: "https://inginnyus.vercel.app",
    siteName: "Ginny Mones",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ginny Mones — Creative Problem Solver",
    description: "Ginny's creative journey and experiments, all in portfolio.",
    images: ["/og-image.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
