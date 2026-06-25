import fs from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "src/content/site-settings.json");

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  name: string;
  email: string;
  copyright: string;
  socialLinks: SocialLink[];
}

export function getSiteSettings(): SiteSettings {
  const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
  return JSON.parse(raw) as SiteSettings;
}
