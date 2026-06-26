import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BackgroundConfig } from "@/components/PageBackground";

const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

export interface CaseStudyLink {
  label: string;
  url: string;
  icon?: "github" | "figma" | "dribbble" | "behance" | "globe" | "link" | "play" | "npm";
}

export interface CaseStudyMeta extends BackgroundConfig {
  slug: string;
  title: string;
  thumbnail: string;
  headerImage: string;
  summary: string;
  tags: string[];
  client: string;
  date: string;
  liveUrl?: string;
  links?: CaseStudyLink[];
  status?: "draft" | "published";
}

export interface CaseStudy extends CaseStudyMeta {
  content: string;
}

function parseBackgroundFields(data: Record<string, unknown>): BackgroundConfig {
  return {
    backgroundType: (data.backgroundType as BackgroundConfig["backgroundType"]) || "none",
    backgroundImage: (data.backgroundImage as string) || undefined,
    backgroundVideo: (data.backgroundVideo as string) || undefined,
    backgroundColor: (data.backgroundColor as string) || undefined,
    gradientFrom: (data.gradientFrom as string) || undefined,
    gradientTo: (data.gradientTo as string) || undefined,
    gradientDirection: (data.gradientDirection as string) || undefined,
    overlayOpacity: (data.overlayOpacity as number) ?? 50,
    overlayColor: (data.overlayColor as string) || "#FFFDF9",
  };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const studies = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(CASE_STUDIES_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || "Untitled",
      thumbnail: data.thumbnail || "/images/case-studies/placeholder.svg",
      headerImage: data.headerImage || data.thumbnail || "/images/case-studies/placeholder.svg",
      summary: data.summary || "",
      tags: data.tags || [],
      client: data.client || "",
      date: data.date || "",
      liveUrl: data.liveUrl,
      links: data.links || [],
      status: data.status || "published",
      ...parseBackgroundFields(data),
    };
  });

  // Filter out drafts in production
  const filtered = process.env.NODE_ENV === "production"
    ? studies.filter((s) => s.status !== "draft")
    : studies;

  // Sort by date, newest first
  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "Untitled",
    thumbnail: data.thumbnail || "/images/case-studies/placeholder.svg",
    headerImage: data.headerImage || data.thumbnail || "/images/case-studies/placeholder.svg",
    summary: data.summary || "",
    tags: data.tags || [],
    client: data.client || "",
    date: data.date || "",
    liveUrl: data.liveUrl,
    links: data.links || [],
    status: data.status || "published",
    content,
    ...parseBackgroundFields(data),
  };
}

/**
 * Get related case studies based on shared tags, sorted by recency.
 * Excludes the current study and returns up to `limit` results.
 */
export function getRelatedCaseStudies(
  currentSlug: string,
  currentTags: string[],
  limit: number = 3
): CaseStudyMeta[] {
  const all = getAllCaseStudies().filter((s) => s.slug !== currentSlug);

  // Score by number of shared tags
  const scored = all.map((study) => {
    const sharedTags = study.tags.filter((tag) => currentTags.includes(tag));
    return { study, score: sharedTags.length };
  });

  // Sort by score (most shared tags first), then by date (newest first)
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.study.date).getTime() - new Date(a.study.date).getTime();
  });

  return scored.slice(0, limit).map((s) => s.study);
}

/**
 * Get previous and next case studies for navigation.
 */
export function getAdjacentCaseStudies(currentSlug: string): {
  prev: CaseStudyMeta | null;
  next: CaseStudyMeta | null;
} {
  const all = getAllCaseStudies();
  const index = all.findIndex((s) => s.slug === currentSlug);

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
