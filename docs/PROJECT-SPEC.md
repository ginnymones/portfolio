# ginnymones.com: Project Spec (V2)

## Purpose

Ginny Mones' portfolio: case studies, a tools page, and a short career snapshot on the homepage. Content is editable through a visual CMS (TinaCMS) without touching code. The site is live at https://ginnymones.com (V2 launched 2026-10-15). V1 is kept as git tags `v1-pre-revamp` and `v1-live-before-v2`.

The visual source of truth is Figma (file `TvM2qUTpe3HvmMmc7IyJlx`). See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for tokens and components.

---

## Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router), React 19 | Static generation |
| Styling | Tailwind CSS v4 | Tokens in `src/app/globals.css` (`@theme`) |
| CMS | TinaCMS (Cloud) | Git-backed; edits commit to GitHub |
| Content | Markdown (case studies, tools) and JSON (pages, site settings) | `src/content/` |
| Hosting | Vercel (Hobby plan) | Deploys from `main`; a push to `main` is a production deploy |
| Fonts | Forum (headings), Google Sans Flex (everything else) | Google Fonts `<link>` in `layout.tsx` |
| Icons | Font Awesome (brand and solid, SVG) | Social links, case study link buttons |
| Analytics | Vercel Analytics | `<Analytics />` in `layout.tsx` |
| Sitemap | `next-sitemap` | Runs after `next build`; also writes `robots.txt` |

Vercel image optimization is off (`images.unoptimized` in `next.config.ts`) because of the Hobby plan's transformation limits. Compress images before adding them (see Gotchas).

---

## Site structure

```
HOME (/)                    Hero, company highlights, "I also make other stuff" tiles
WORKS (/works)              Case study gallery: 3 staggered columns, tag filter, Load more
  └─ CASE STUDY (/works/[slug])   Challenge, Action, Results
TOOLS (/tools)              Hero and a two-column grid of tool cards
  └─ /tools/<name>          Proxied tool apps (see "Tools and proxies")
#contact                    Get in touch panel, at the bottom of every page (not a route)
404                         not-found page
```

`/about` no longer exists: it redirects permanently to `/#intro`. Old case study URLs `/works/anim-motion-graphics` and `/works/dev-figma-to-email-builder` redirect to `/works/anim-joiiio` and `/works/dev-email-design-system`. The old Vercel address `inginnyus.vercel.app` redirects to ginnymones.com with the path kept. All redirects are in `next.config.ts`.

Navigation links (Works, Tools, Contact) are the `navLinks` array in `src/components/Navigation.tsx`.

### Homepage

Sections, top to bottom (Figma `homepage / hi-fi` 357:13, mobile 364:96):

1. **Hero** (`#intro`): portrait illustration in a circle, heading, subtitle, intro paragraph, primary button.
2. **Company highlights**: an intro line, then one section per company (Amazon, Elevation, TBWA\SMP). Each has a tag, headline, description, and one to three stat tiles (number, label, image or looping video, caption, optional button). Highlights are standalone: there are no company case studies behind them (decided 2026-10-09). The `caseStudy` field is optional and normally empty.
3. **"I also make other stuff"**: a heading, curve, short text and linked preview tiles (Works, Tools).

All of it comes from `src/content/pages/home.json`.

### Works

`/works` lists published case studies newest first, six at a time, with **Load more** (adds six per click, resets when the filter changes). Filters are single-select chips built from `workTags` in site settings (only tags with at least one study show). `?tag=` deep-links a filter. Studies marked `homepageOnly` are left out.

### Tools

`/tools` lists the files in `src/content/tools/`, newest first by `date` (standing rule: both `/works` and `/tools` sort strictly newest-first; no featured or pinned override). Each card shows a status dot, tags, summary and the buttons that apply: Launch, Case study, Code.

### Get in touch

The `ContactSection` panel is in the root layout, so it appears on every page. Heading and copy: Pages > Contact. Email and social links: Site Settings. Substack stays in Site Settings but is hidden in the panel.

---

## Content architecture

### Site settings (JSON)

`src/content/site-settings.json`, editable in Tina under Site Settings:

- `name`, `email` (contact email is **hola@ginnymones.com**), `copyright` (only the unused `Footer` reads it)
- `workTags[]`: the Works filter list
- `socialLinks[]`: `{label, url}` pairs, shown as icon over label (Email first)
- `footerHeading`, `footerDescription`: legacy fields from V1, no longer read by the panel (it uses Pages > Contact)

### Pages (JSON)

`src/content/pages/<page>.json` for `home`, `works`, `tools`, `contact` (and a leftover `about`). Common fields: `title`, `heading`, `headingAccent`, `subtitle`, `tagline`, CTA labels and links, and the background fields (type, image, video, color, gradient, overlay).

Home also holds `portrait`, `portraitAlt`, `heroBody`, `companyIntro`, `companyProjects[]` (company, title, description, optional `caseStudy`, `stats[]` with value, label, image, imageAlt, motion, caption, buttonLabel, buttonLink), `otherHeading`, `otherText`, `otherTiles[]`.

`about.json` and the About-only Tina fields (`experience`, `toolsAndSkills`, `bio`) are unused now and are waiting for a decision to remove them (see `V2 Assets/PENDING.md`). The `motion` stat field and `MotionImageSlot` are also unused since the real videos replaced the CSS stand-in.

### Case studies (Markdown)

`src/content/case-studies/<slug>.md`. `_template.md` is the starter. There are 19 published-or-draft files; `status: "draft"` hides a study in production, including by direct URL.

```yaml
status: "published"        # "draft" hides it in production
title: "Project title"
thumbnail: "/images/..."   # Works card (4:3 on phones, staggered ratios on desktop)
thumbnailAlt: ""
headerImage: "/images/..." # Hero image beside the title block (600x440 on the page)
headerImageAlt: ""
summary: "One or two sentences"
tags: ["UX/UI Design"]     # first tag shows in the hero
client: "Client"           # optional
role: "UX/UI Designer"     # hero meta
years: "2018 – 2022"       # hero meta; falls back to the year of `date`
date: "YYYY-MM-DD"         # sort order
homepageOnly: false        # true hides it from Works, Related work and Previous / Next
liveUrl: "https://..."     # "View live" text button in the hero
challenge: ""              # context plus what you set out to do
resultsStats:              # up to three: {value, label, icon?}
  - value: "500%"
    label: "More agency revenue"
resultsCopy: ""            # closing paragraphs under the stats
links:                     # Relevant links buttons: {label, url, icon}
  - label: "Live App"
    url: "https://..."
    icon: "globe"
# plus the background fields shared with pages
```

The markdown body is the **Action** section. Layout rules, list syntax and the code map are in [CASE-STUDY-STRUCTURE.md](CASE-STUDY-STRUCTURE.md).

### Tools (Markdown)

`src/content/tools/<slug>.md`, loaded by `src/lib/tools.ts`:

```yaml
status: "published"        # or "draft" (hidden in production)
title: "Mega CP Calculator"
thumbnail: "/images/tools/mega-cp-calculator.png"   # 4:3 screenshot
thumbnailAlt: ""
summary: "One sentence"
tags: ["Web App"]
projectStatus: "live"      # live | beta | in-progress
liveUrl: "/tools/mega-cp-calculator"
repoUrl: ""
caseStudy: "dev-mega-cp-calculator"   # only linked if that case study file exists
date: "2026-09-01"
featured: false            # stored but no longer affects sort order
```

Current tools: Pokémon Collection Tracker, Quiz Randomizer, Resume Lab, Mega CP Calculator, Figma to HTML Email Builder, Workload Tracker.

### Flexible backgrounds

Pages and case studies share a background config rendered by `PageBackground.tsx`: none, still image, looping video, solid color or gradient, plus an overlay (opacity 0 to 100 and a color) for readability. The V2 pages mostly use `none`.

---

## Tools and proxies

Each tool stays its own Vercel project; `next.config.ts` rewrites make them appear under ginnymones.com:

| Path | Destination | Notes |
|---|---|---|
| `/tools/mega-cp-calculator/*` | `mega-cp-calculator.vercel.app` | Path prefix stripped |
| `/tools/quiz-randomizer` and `/*` | `quiz-randomizer-demo.vercel.app/tools/quiz-randomizer` | The demo deployment, not the private family app. Built with a matching `basePath` |
| `/tools/resume-lab` and `/*` | `resume-style-tool.vercel.app/tools/resume-lab` | Built with a matching `basePath` |

The bare paths for the two `basePath` apps have their own rules because a trailing slash makes those apps redirect back in a loop. The Workload Tracker card links to the demo workspace at `/w/demo`. The Pokémon Collection Tracker is not under `/tools` yet.

---

## Key features

- **Case study sections**: Challenge, Action, Results; empty sections are hidden; Action images sit left with text on the right, with `###` blocks, `:::bento` galleries and inline video.
- **Previous / Next and Related work**: newest-first order; up to three related studies ranked by shared tags, then recency. Both skip `homepageOnly` studies.
- **Relevant links**: per-study buttons with icons (`github`, `figma`, `dribbble`, `behance`, `npm`, `globe`, `play`, `link`).
- **Image lightbox**: click a case study image to see it full screen; Escape or a click outside closes it.
- **Looping video**: `.mp4` or `.webm` in an image field plays as a silent loop with a poster and pause button. Videos load only near the screen.
- **Lazy images**: every image in case study text loads lazily; the header, logo and homepage portrait load first.
- **Navigation**: fixed bar that shrinks on scroll; slide-out drawer on phones.
- **Section dots** on the homepage (from 1280px) mark the company in view.
- **Back to top** after 400px of scroll.
- **Drafts**: hidden in production (`NODE_ENV === "production"`), visible in local dev.
- **Social preview**: `public/og-image.png` (Figma `social-preview` 375:108), declared in `layout.tsx` metadata with Open Graph and Twitter tags.
- **Git-backed CMS**: every Tina edit is a commit.

---

## Deployment flow

1. Edit content in Tina (`/admin/index.html`) or in the files.
2. Tina commits to GitHub; a local push goes to `main`.
3. Vercel rebuilds (`tinacms build --skip-indexing && next build && next-sitemap`) in about one to two minutes.
4. The site is live.

Pushing to `main` is a production deploy; check with Ginny first. Use a Vercel preview (push a branch) for anything that changes rewrites or redirects: two bugs in the launch only showed on Vercel (a proxy loop on bare tool paths, and drafts reachable by URL) and are fixed in commit `62737d1`.

---

## File structure

```
portfolio/
├── docs/                    # These docs + CASE-STUDY-STRUCTURE.md
├── public/
│   ├── admin/               # Tina admin (generated)
│   ├── branding/            # Logos (sunset variant is the one in the UI)
│   ├── downloads/           # Email Design System demo zip
│   ├── guides/              # Email Design System guide (static HTML)
│   ├── images/              # case-studies/, home/, tools/, get-in-touch-art.png, hero-portrait.png
│   ├── videos/              # Homepage loops and posters
│   ├── favicon.png, og-image.png
│   └── ginny-404@2x.png, ginny.svg   # unused, queued for deletion
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Fonts, metadata, Navigation, ContactSection, BackToTop, Analytics
│   │   ├── globals.css      # @theme tokens, type styles, prose, stat-motion keyframes
│   │   ├── page.tsx         # Home
│   │   ├── not-found.tsx    # 404
│   │   ├── works/page.tsx, works/[slug]/page.tsx
│   │   └── tools/page.tsx
│   ├── components/
│   │   ├── ui/              # Button, Tag, ImageSlot, LoopVideo, MotionImageSlot (unused)
│   │   ├── ActionSection, BentoGallery, Breadcrumbs, CaseStudyCard, CaseStudyLinks,
│   │   │   CaseStudyNav, CompanyHighlight, ContactSection, Curve, Lightbox,
│   │   │   Navigation, PageBackground, RelatedCaseStudies, SectionDots,
│   │   │   SocialLinks, ToolCard, ToolsGrid, WorksGrid, BackToTop
│   │   └── Footer.tsx, Character.tsx   # unused, queued for deletion
│   ├── content/
│   │   ├── case-studies/    # 19 markdown files + _template.md
│   │   ├── tools/           # 6 markdown files
│   │   ├── pages/           # home, works, tools, contact (about unused)
│   │   └── site-settings.json
│   └── lib/
│       ├── case-studies.ts  # Loader, drafts, related and adjacent helpers
│       ├── action-blocks.ts # Action markdown to blocks
│       ├── tools.ts         # Tools loader
│       ├── pages.ts         # Page JSON reader
│       ├── site-settings.ts
│       └── stat-motion.ts   # Unused CSS stat animation data
├── tina/
│   ├── config.ts            # Schema: pages, siteSettings, tools, caseStudies
│   ├── tina-lock.json, __generated__/   # Commit with any config change
├── V2 Assets/               # Local only: PENDING.md, source media, backups (not committed)
├── CHANGELOG.md             # Dated entry for every visible change
├── next.config.ts           # Rewrites (tool proxies), redirects, image settings
└── next-sitemap.config.js
```

`CLAUDE.md`, `V2 Assets/` and `_to_delete/` are local only and are never committed.

---

## Reuse checklist (for another portfolio)

1. Clone the repo and run `npm install`.
2. Replace the colors in `src/app/globals.css` (`@theme`) and the fonts in `layout.tsx`.
3. Update `src/content/site-settings.json`, `src/content/pages/*.json` and the metadata in `layout.tsx`.
4. Replace the case study and tool markdown files and the images under `public/`.
5. Replace the favicon and `og-image.png`, and the domain strings (`metadataBase`, `next-sitemap.config.js`, redirects).
6. Remove or edit the tool rewrites and redirects in `next.config.ts`.
7. Create a Tina Cloud project; set `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` locally and on Vercel.
8. Deploy to Vercel; open `/admin`, make an edit and confirm it redeploys.

---

## Gotchas and lessons learned

- **Tina schema sync**: after changing `tina/config.ts`, run `npm run dev` or `npm run build` once and commit `tina/tina-lock.json` and `tina/__generated__/*` with the config change. Otherwise Tina Cloud reports a schema mismatch and the live CMS won't see the new fields. `npm run build` skips Tina indexing (`--skip-indexing`) so it can run without credentials.
- **YAML frontmatter**: one missing quote breaks Tina Cloud indexing for the whole branch. Re-check quotes before pushing.
- **Tina Cloud reindex**: use the branch menu in the Tina dashboard, then Reindex. "Refresh Branches" does not reindex.
- **Git conflicts from Tina**: use `git pull --rebase origin main` before pushing.
- **Vercel Hobby limits**: image transformations are capped (about 5,000; overflow returns 402), so optimization is off. Compress offline: progressive JPEGs, WebM for video, no big GIFs. A progressive re-export took ten JPEGs from about 18 MB to 3 MB.
- **Vercel security**: deploys are blocked for vulnerable dependencies; keep `next-mdx-remote` at 6 or later if it is ever added.
- **Proxied tools**: a trailing slash on a `basePath` app redirects back and loops. Keep the bare-path rules in `next.config.ts`.
- **Production-only bugs**: `npm run build` and `npm run dev` share `.next` and can clash; run one at a time. Test rewrites and redirects on a Vercel preview.
- **Shared data**: text used in two or more places lives in `site-settings.json`.
- **All visible text is CMS-editable**: never hardcode page text in JSX.
- **Forum has one weight**: never fake a bold.
- **Write numbers** zero to nine as words and 10 and above as numerals in copy.
- **Favicon**: do not change it without asking (decided 2026-10-08).
