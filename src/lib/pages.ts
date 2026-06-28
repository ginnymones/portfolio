import fs from "fs";
import path from "path";
import type { BackgroundConfig } from "@/components/PageBackground";

const PAGES_DIR = path.join(process.cwd(), "src/content/pages");

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ToolOrSkill {
  name: string;
  category?: string;
  proficiency?: "expert" | "advanced" | "intermediate" | "beginner";
}

// TinaCMS rich-text node structure
export interface RichTextNode {
  type: string;
  text?: string;
  children?: RichTextNode[];
}

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
  bio?: RichTextNode | string;
  experience?: ExperienceItem[];
  socialLinks?: SocialLink[];
  toolsAndSkills?: ToolOrSkill[];
}

export function getPageContent(slug: string): PageContent {
  const filePath = path.join(PAGES_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { title: slug };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PageContent;
}

/**
 * Converts TinaCMS rich-text JSON to plain HTML string.
 * Returns empty string if input is not a valid rich-text node.
 */
export function richTextToHtml(node: RichTextNode | string | undefined): string {
  if (!node) return "";
  if (typeof node === "string") return ""; // Plain strings handled separately by the page

  if (node.type === "text") {
    return node.text || "";
  }

  const childrenHtml = (node.children || []).map(richTextToHtml).join("");

  switch (node.type) {
    case "root":
      return childrenHtml;
    case "p":
      return `<p>${childrenHtml}</p>`;
    case "h1":
      return `<h1>${childrenHtml}</h1>`;
    case "h2":
      return `<h2>${childrenHtml}</h2>`;
    case "h3":
      return `<h3>${childrenHtml}</h3>`;
    case "ul":
      return `<ul>${childrenHtml}</ul>`;
    case "ol":
      return `<ol>${childrenHtml}</ol>`;
    case "li":
      return `<li>${childrenHtml}</li>`;
    case "blockquote":
      return `<blockquote>${childrenHtml}</blockquote>`;
    case "bold":
      return `<strong>${childrenHtml}</strong>`;
    case "italic":
      return `<em>${childrenHtml}</em>`;
    case "a":
      return `<a href="${(node as unknown as { url: string }).url}" target="_blank" rel="noopener noreferrer">${childrenHtml}</a>`;
    default:
      return childrenHtml;
  }
}
