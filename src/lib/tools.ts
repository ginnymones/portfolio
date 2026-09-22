import fs from "fs";
import path from "path";
import matter from "gray-matter";

const TOOLS_DIR = path.join(process.cwd(), "src/content/tools");
const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

export type ToolStatus = "live" | "beta" | "in-progress";

export interface Tool {
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  summary: string;
  tags: string[];
  projectStatus: ToolStatus;
  liveUrl?: string;
  repoUrl?: string;
  caseStudy?: string; // slug of a /works case study
  date: string;
  featured: boolean;
  status: "draft" | "published";
}

export function getAllTools(): Tool[] {
  if (!fs.existsSync(TOOLS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const tools = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(TOOLS_DIR, filename), "utf-8"));

    return {
      slug,
      title: data.title || "Untitled",
      thumbnail: data.thumbnail || "/images/case-studies/placeholder.svg",
      thumbnailAlt: data.thumbnailAlt || "",
      summary: data.summary || "",
      tags: data.tags || [],
      projectStatus: data.projectStatus || "live",
      liveUrl: data.liveUrl || undefined,
      repoUrl: data.repoUrl || undefined,
      // Only link a case study that actually exists, so /tools never has a dead link
      caseStudy:
        data.caseStudy && fs.existsSync(path.join(CASE_STUDIES_DIR, `${data.caseStudy}.md`))
          ? data.caseStudy
          : undefined,
      date: data.date || "",
      featured: Boolean(data.featured),
      status: data.status || "published",
    } satisfies Tool;
  });

  // Hide drafts in production, like case studies
  const visible =
    process.env.NODE_ENV === "production"
      ? tools.filter((t) => t.status !== "draft")
      : tools;

  // Newest first, matching case studies
  return visible.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
