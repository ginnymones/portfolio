# Changelog

All notable changes to this project are documented here.

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
