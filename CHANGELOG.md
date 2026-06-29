# Changelog

All notable changes to this project are documented here.

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
