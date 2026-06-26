# Portfolio Site — Project Spec

## Purpose

A reusable, minimalist portfolio site template for showcasing design work as case studies. Built for speed of deployment and ease of content management — non-technical users should be able to add/edit case studies and page content through a visual CMS without touching code.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js (App Router) | Static generation, fast builds, Vercel-native |
| Styling | Tailwind CSS v4 | Utility-first, rapid customization |
| CMS | TinaCMS (Cloud) | Visual editor, Git-backed, no database |
| Content format | Markdown (case studies) + JSON (pages + site settings) | Easy to template, version-controlled |
| Hosting | Vercel | Zero-config deploys, auto-rebuild on Git push |
| Font | Google Sans Flex (variable) | Clean geometric sans, variable weight support |

---

## Site Structure

```
HOME (/)           → Splash/hero page with CTA
ABOUT (/about)     → Bio, work experience, tools & skills, social links
WORKS (/works)     → Case study grid (3 cols, 6 per page, paginated)
  └─ CASE STUDY (/works/[slug]) → Individual case study with breadcrumbs + lightbox
#CONTACT           → Persistent section on every page (not a separate route), anchored via id
```

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFDF9` | Page background |
| Foreground | `#333333` | Primary text |
| Accent Orange | `#D26D1F` | Primary accent, links, CTAs |
| Accent Yellow | `#F3C041` | Secondary accent (rare) |
| Neutral Warm | `#AFA29B` | Muted text, borders |
| Neutral Dark | `#5A5756` | Body text, footer background |

### Typography

- Font: Google Sans Flex (400, 500, 600, 700)
- Headings: 600-700 weight
- Body: 400 weight
- Scale: Tailwind defaults (text-sm through text-7xl)

### Design Principles

- Minimalist — content-first, no visual clutter
- Warm — soft background, warm neutrals
- Accessible — proper contrast ratios, semantic HTML, ARIA labels
- Responsive — mobile-first, 3-col grid collapses gracefully

---

## Content Architecture

### Site Settings (JSON — Global)

Location: `src/content/site-settings.json`

Single source of truth for data shared across multiple components (Footer, Contact, Works):
- `name` — site/brand name
- `email` — contact email
- `copyright` — footer copyright text
- `footerHeading` — heading text in contact section
- `footerDescription` — paragraph text in contact section
- `workTags[]` — array of tag strings used for Works page filtering
- `socialLinks[]` — array of {label, url} pairs

Editable in Tina admin under "Site Settings" collection.

### Case Studies (Markdown)

Location: `src/content/case-studies/[slug].md`

Frontmatter schema:
```yaml
status: "published"               # "draft" | "published" — drafts hidden in production
title: "Project Title"            # Required
thumbnail: "/images/..."          # 4:3 ratio, for grid card
headerImage: "/images/..."        # 16:9 ratio, for detail page
summary: "Short description"      # 1-2 sentences for card
tags: ["Tag 1", "Tag 2"]          # Shown on cards + detail
client: "Client Name"             # Optional
date: "YYYY-MM-DD"                # Required, used for sort order
liveUrl: "https://..."            # Optional, shown as link
backgroundType: "none"            # none | image | video | color | gradient
backgroundImage: ""               # For image backgrounds
backgroundVideo: ""               # For video backgrounds
backgroundColor: ""               # For solid color
gradientFrom: ""                  # Gradient start
gradientTo: ""                    # Gradient end
gradientDirection: "to bottom"    # Gradient direction
overlayOpacity: 50                # 0-100
overlayColor: "#FFFDF9"           # Overlay tint color
```

Body content structure:
1. **Problem Statement** — The challenge
2. **Solution** — Approach, process, key decisions
3. **Results & Impact** — Measurable outcomes

### Pages (JSON)

Location: `src/content/pages/[page].json`

Fields managed via Tina CMS:
- Title, heading, subtitle, tagline
- CTA labels and links
- Background configuration (image/video/color/gradient + overlay)
- Bio (rich text) — About page
- Work Experience (repeatable list) — About page
- Tools & Skills (repeatable list, grouped by category) — About page
- Social Links (repeatable list) — About page

---

## Flexible Background System

Applicable to all pages and individual case studies.

| Type | Input | Rendering |
|------|-------|-----------|
| None | — | Default page background color |
| Image | Upload via Tina media manager | Full-bleed `background-image`, cover |
| Video | MP4 path in `/public/videos/` | Muted, looping `<video>`, object-fit cover |
| Solid Color | Hex value | CSS `background-color` |
| Gradient | From/To hex + direction | CSS `linear-gradient` |

**Overlay**: Semi-transparent layer between background and content. Adjustable opacity (0-100) and color. Ensures text readability regardless of background choice.

---

## Key Features

- **Previous / Next navigation**: Navigate between case studies at the bottom of each detail page
- **Related case studies**: 3 related works shown below content, ranked by shared tags + recency
- **Relevant links**: Per-study link buttons with icons (GitHub, Figma, Dribbble, etc.) — managed via Tina
- **Social links with icons**: Font Awesome brand icons (Dribbble, LinkedIn, Behance) in contact section
- **Tag-based filtering**: Works page has a filter bar (All + defined tags). Tags managed from Tina admin. Client-side, instant.
- **Pagination**: Client-side, 6 items per page, works alongside tag filtering. Resets to page 1 on filter change.
- **Mobile navigation**: Hamburger menu with compact dropdown (14px text, solid bg, drop shadow)
- **Back to top button**: Appears after 400px scroll, up arrow + text, rounded corners, fixed bottom-right
- **Image lightbox**: Click any case study image to view full-screen with Escape/click-outside to dismiss
- **Lazy loading**: Case study cards use IntersectionObserver, render skeleton until visible
- **Breadcrumbs**: Case study pages show Home > Works > Title
- **Editorial workflow**: Draft/Published status per case study — drafts hidden from production
- **Shared site settings**: Single JSON for name, email, socials, footer text — used by Footer + Contact + anywhere needed
- **Tools & Skills**: Repeatable, categorized list on About page (with proficiency levels)
- **Static generation**: All pages pre-rendered at build time
- **Git-backed CMS**: All edits create commits, full version history
- **Image optimization**: Next.js Image component with AVIF/WebP support
- **Favicon**: Place `favicon.png` (128x128 recommended) in `src/app/` and `public/`, declared in layout metadata

---

## Deployment Flow

1. Edit content in Tina CMS admin (`/admin`)
2. Tina commits changes to GitHub repo
3. Vercel detects push, rebuilds site (~1-2 min)
4. Site is live with new content

---

## File Structure

```
portfolio/
├── public/
│   ├── admin/              # Tina CMS admin panel (auto-generated)
│   ├── favicon.png         # Site favicon (128x128)
│   ├── images/case-studies/ # Case study images
│   ├── uploads/            # Tina media uploads
│   └── videos/             # Background videos
├── src/
│   ├── app/
│   │   ├── favicon.png     # Next.js auto-detected favicon
│   │   ├── layout.tsx      # Root layout with nav, contact section, footer, back-to-top
│   │   ├── page.tsx        # Home
│   │   ├── about/page.tsx  # About
│   │   ├── works/page.tsx  # Works grid
│   │   └── works/[slug]/   # Case study detail
│   ├── components/
│   │   ├── BackToTop.tsx   # Scroll-to-top button
│   │   ├── Breadcrumbs.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── ContactSection.tsx # #contact CTA section (80vw desktop, full mobile)
│   │   ├── Footer.tsx      # Minimal footer (copyright only)
│   │   ├── Lightbox.tsx    # Image lightbox for case studies
│   │   ├── Navigation.tsx  # Desktop + mobile hamburger nav
│   │   └── PageBackground.tsx
│   ├── content/
│   │   ├── case-studies/   # Markdown case study files
│   │   ├── pages/          # JSON page content (includes contact.json for the section)
│   │   └── site-settings.json # Global settings (name, email, socials)
│   └── lib/
│       ├── case-studies.ts # Case study reader + pagination + draft filtering
│       ├── pages.ts        # Page content reader + rich text parser
│       └── site-settings.ts # Site settings reader
├── tina/
│   └── config.ts           # TinaCMS schema definition
├── .env                    # Tina Cloud credentials
├── next.config.ts
├── tailwind config (via CSS)
└── package.json
```

---

## Reuse Checklist (for future portfolio sites)

1. Clone the repo
2. Update colors in `src/app/globals.css` (@theme section)
3. Update font in layout.tsx and globals.css
4. Update `src/content/site-settings.json` (name, email, socials, footer copy)
5. Replace placeholder content in `src/content/pages/*.json`
6. Replace case study markdown files
7. Update favicon (128x128 PNG in `src/app/` and `public/`)
8. Update metadata in `layout.tsx` (title, description, icons)
9. Create new Tina Cloud project, get Client ID + Token
10. Set env vars locally (`.env`) and on Vercel
11. Deploy to Vercel
12. Test `/admin` panel, make an edit, confirm redeploy works
13. Done — client can self-manage from `/admin`

---

## Gotchas & Lessons Learned

- **Favicon**: Must be 128x128+ PNG. Place in both `src/app/favicon.png` (Next.js auto-detect) and declare in metadata `icons: { icon: "/favicon.png" }`. Hard-refresh needed to clear browser cache.
- **Vercel security**: Blocks deploys for vulnerable dependencies. Always use `next-mdx-remote@6+`.
- **TinaCMS + React 19**: Peer dependency warnings are harmless — Tina works fine with React 19.
- **Git conflicts from Tina**: When Tina commits from the admin panel while you're also pushing locally, use `git pull --rebase` to resolve.
- **Mobile nav**: Keep text at 14px, use solid background (not translucent), add drop shadow. Full-screen overlays feel oversized on mobile.
- **Shared data**: Any text that appears in 2+ places (social links, email, name) must live in `site-settings.json` — never duplicate across components.
- **Editorial workflow**: Use `status: "draft"` / `"published"` in frontmatter. Filter drafts in production via `process.env.NODE_ENV === "production"`.
- **Tina schema sync**: After modifying `tina/config.ts`, you MUST run `npx tinacms dev --command "echo done"` locally, then commit the updated `tina/__generated__/` files. Deploy will fail with "schema mismatch" otherwise.
- **All content must be CMS-editable from day one**: Never hardcode page text in JSX. Wire everything to JSON/markdown content files during initial scaffold.
