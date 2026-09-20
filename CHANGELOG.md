# Changelog

All notable changes to this project are documented here.

---

## [2026-09-21] — Tools Page

### Added
- **`/tools` page** — standalone page for hosting apps, plugins, and coding projects. Hero with the ginny-lab character on the left and heading/subtitle on the right, followed by a filterable 3-column card grid
- **Tools content collection** — one Markdown file per tool in `src/content/tools/`, managed from Tina admin ("Tools"). Fields: title, screenshot, summary, tags, project status (Live / Beta / In progress), live URL, code URL, optional case study slug, date, featured
- **Tool cards** — status badge, tags, and Launch / Case study / Code links (each shown only when set). Image and title open the live app, falling back to the case study or repo
- **Tag filter** — deep-linkable via `?tag=` (e.g. `/tools?tag=Tracker`); tabs only show tags that at least one tool uses
- **Hero background controls** — the `tools` page entry uses the same image / video / color / gradient fields as other pages (default: none, flat background)
- **Nav link** — "Tools" added after "Works"
- Seeded with Pokémon Collection Tracker, Workload Tracker, Figma to HTML Email Builder, and Mega CP Calculator

### Changed
- `/tools` hero now uses the home page's placement: viewport-height, vertically centered, `max-w-5xl` container, 320px character, 64px gap
- Mini corner character is now hidden on `/tools` (the hero has its own character), same as on the home page
- `tina/tina-lock.json` and `tina/__generated__/` regenerated for the new Tools collection

### Notes
- Tools stay listed in `/works` as case studies; `/tools` has its own screenshots in `public/images/tools/` and only links a case study if the file exists, so it works on its own
- Mega CP Calculator has no case study yet; add its slug in the CMS once written

---

## [2026-06-29] — Video Support in Case Studies

### Added
- **Inline video player** — `.mp4` and `.webm` files referenced with image syntax now render as `<video>` elements with native browser controls (play/pause, audio, progress bar)
- **Auto poster/thumbnail** — if a file named `[video-name]-thumb.png` (or `.jpg`) exists alongside the video, it's automatically used as the poster image
- No autoplay, no loop — user initiates playback

### Usage
```markdown
![Video description](/images/case-studies/my-video.mp4)
```
Place `my-video-thumb.png` in the same folder for an automatic thumbnail.

### Changed
- anim-motion-graphics case study: Joiiio gif moved to single line, mp4 on next line (out of bento)

---

## [2026-06-29] — Content Updates

### Changed
- Updated case study content: dev-collection-tracker, dev-designer-to-vibe-developer-starter-pack, dev-figma-to-email-builder, dev-workload-tracker
- Home page heading: "Hi, I'm Ginny." → "Hi, I'm Ginny!"

### Removed
- social-alaska case study

---

## [2026-06-29] — SEO, Analytics, Alt Text & Cleanup

### Added
- **SEO Sitemap** — auto-generates `sitemap.xml` and `robots.txt` on build via `next-sitemap`
- **Vercel Analytics** — privacy-friendly page view tracking (no cookies)
- **Image alt text fields** — Thumbnail Alt Text and Header Image Alt Text in Tina admin per case study

### Removed (cleanup)
- 11 old sample SVG images (ecommerce-*, fintech-*, healthcare-*) — no longer referenced
- Unused `@keyframes hop` CSS animation (replaced by wave)
- Unused `ginny-404.png` 1x version (only @2x is used)

---

## [2026-06-29] — Character Wave, Custom 404, Open Graph

### Added
- **Character arm wave** — right arm (viewer's right) waves on click with CSS keyframe animation
- **Custom 404 page** — character illustration + "Uh-oh, looks like this page blasted off again." + navigation buttons
- **Open Graph + Twitter card metadata** — title, description, og-image.png for social sharing
- **Idle blink** on character (eyes close every 3-5s)
- **Staggered hero entrance** — text elements fade in sequentially on home page load
- **Cards fade up on scroll** — case study cards animate in from below when entering viewport
- `wave`, `fadeUp`, `hop` CSS keyframe animations

### Changed
- Character SVG updated with reworked arm structure for proper wave animation
- Site title: "Ginny Mones — Creative Problem Solver"
- Site description: "Ginny's creative journey and experiments, all in portfolio."
- Social links centered in contact section

---

## [2026-06-27] — Case Study Updates & Branding Tag

### Added
- "Branding" tag added to workTags in site settings
- New case studies: Calculator, App Icon, User Profile, Branding MHW:PH, Sketches Chansey
- Live links added to case studies via `links` frontmatter field
- Bento gallery component (`:::bento` / `:::` markers in markdown)
- Supports 1-6 images with automatic layout (2-col base, first image spans 2 rows for 3/5/6)
- Lightbox works on bento images

### Fixed
- Bento gallery parser: handles remark wrapping markers + images in single `<p>` tag
- Pagination flicker: removed opacity fade transition that caused visual flash
- Mobile pagination scroll: defers scroll to next animation frame after React re-render
- Works consistently on both desktop and mobile

---

## [2026-06-26] — Case Study Content & Image Fixes

### Fixed
- Missing closing quote in `collection-tracker.md` frontmatter (`icon: "globe"`) that broke Tina Cloud indexing
- Renamed image files to shorter, consistent names (removed `header-` prefix from inline images)
- Fixed image references in collection-tracker, designer-to-vibe-dev, and figma-to-email-builder case studies

### Note
- When Tina Cloud indexing fails, you must click the ⋮ menu next to the branch → "Reindex" (not "Refresh Branches")
- Always validate YAML frontmatter quotes before pushing — a single missing quote breaks the entire Tina Cloud index

---

## [2026-06-26] — Case Study Enhancements: Nav, Related, Links, Social Icons

### Added
- **Previous / Next navigation** at the bottom of each case study (based on date order)
- **Related Case Studies** section (3 max, ranked by shared tags then recency)
- **Relevant Links** section with icon support (GitHub, Figma, Dribbble, Behance, npm, Website, Demo, Generic)
- `links` field in case study frontmatter (managed via Tina admin)
- **Social links with Font Awesome brand icons** (Dribbble, LinkedIn, Behance auto-detected from label)
- Font Awesome packages (`@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`)
- Reusable `<SocialLinks />` component with light/dark variants

### Changed
- Contact section social links now use icon + text format
- Case study detail page restructured: content → links → prev/next nav → related work

### Fixed
- Tina Cloud schema mismatch error (`CaseStudyLinks` type) — resolved by regenerating and committing `tina/__generated__/` files
- Added `--skip-indexing` flag to `tinacms build` command for faster deploys

---

## [2026-06-26] — Improved Slug Generation

### Changed
- Slugify logic now cleanly handles em-dashes, en-dashes, and special characters
- Produces single-hyphen slugs (e.g., "100 Days of UI Challenge — User Profile" → `100-days-of-ui-challenge-user-profile`)
- Filename field remains editable in Tina admin for manual override

---

## [2026-06-26] — Code Cleanup

### Removed
- `next-mdx-remote` dependency (unused — remark/remark-html handles rendering)
- `getPaginatedCaseStudies()` server-side function (replaced by client-side pagination in WorksGrid)
- Empty `public/images/case-studies/placeholder.jpg` (0-byte file)
- Accidentally committed `inginnyus.pixil` design file

### Note
- Pagination still works — it's handled client-side in the WorksGrid component (6 per page, works with tag filtering)

---

## [2026-06-26] — Tag Filtering & Tina-Managed Tags

### Added
- Tag-based filtering on the Works page (All + per-tag views)
- `workTags` field in site settings — manage available tags from Tina admin
- WorksGrid client component with instant client-side filtering + pagination

### Changed
- Works page pagination is now client-side (no page reload on filter/page change)
- Tags on case studies should use the defined list from site settings for consistency

---

## [2026-06-26] — Contact as Section & Simplified Footer

### Changed
- Contact is now a `#contact` section in the global layout (not a separate `/contact` page)
- Footer simplified to copyright line only
- Nav "Contact" link scrolls to `#contact` anchor
- Contact section is 80% viewport width on desktop, full-width on mobile

### Removed
- `/contact` route and page component

---

## [2026-06-26] — Mobile Nav, Lightbox, Editorial Workflow & More

### Added
- Mobile hamburger navigation (14px text, solid bg, drop shadow, compact dropdown)
- Back to Top button (up arrow + text, appears after 400px scroll)
- Image lightbox for case study images (click to enlarge, Escape to close)
- Tools & Skills section on About page (repeatable, grouped by category)
- Editorial workflow: draft/published status on case studies
- Shared site settings JSON (name, email, socials, footer text — single source of truth)
- Footer heading and description editable via Tina

### Changed
- Footer and Contact page now read social links from site-settings.json
- About page fully driven by CMS content (bio, experience, tools, links)

---

## [2026-06-25] — Flexible Backgrounds & TinaCMS

### Added
- TinaCMS integration with visual admin panel at `/admin`
- Flexible background system (image, video, solid color, gradient + overlay)
- Per-page and per-case-study background configuration
- Page content managed via JSON files editable in Tina
- About page: rich text bio, repeatable work experience, social links

---

## [2026-06-25] — Initial Release

### Added
- Next.js 15 with App Router
- Tailwind CSS v4 with custom design tokens
- Home splash page with CTA
- About page with bio, experience, social links
- Works page with 3-column grid, 6 per page, pagination
- Case study detail pages with breadcrumbs
- Markdown-based case studies with frontmatter
- Case study template file (`_template.md`)
- Google Sans Flex font
- Lazy-loaded case study cards (IntersectionObserver)
- Static generation for all pages
- Vercel deployment
