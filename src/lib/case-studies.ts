import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BackgroundConfig } from "@/components/PageBackground";

const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

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
    status: data.status || "published",
    content,
    ...parseBackgroundFields(data),
  };
}

export function getPaginatedCaseStudies(page: number, perPage: number = 6) {
  const all = getAllCaseStudies();
  const totalPages = Math.ceil(all.length / perPage);
  const start = (page - 1) * perPage;
  const studies = all.slice(start, start + perPage);

  return {
    studies,
    totalPages,
    currentPage: page,
    total: all.length,
  };
}
