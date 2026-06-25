import fs from "fs";
import path from "path";
import { BackgroundConfig } from "@/components/PageBackground";

const PAGES_DIR = path.join(process.cwd(), "src/content/pages");

export interface PageContent extends BackgroundConfig {
  title: string;
  heading?: string;
  headingAccent?: string;
  subtitle?: string;
  tagline?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

export function getPageContent(slug: string): PageContent {
  const filePath = path.join(PAGES_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { title: slug };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PageContent;
}
