# Agent Skills — Portfolio Site Builder

## Skill: Scaffold Portfolio Site

**Trigger**: User wants a new portfolio/case-study site

**Steps**:
1. Confirm design preferences: colors, font, layout style
2. Create Next.js project with App Router + Tailwind CSS v4
3. Set up page structure: Home, About, Works (grid + detail), Contact
4. Create `site-settings.json` for shared data (name, email, socials, footer text)
5. Create content system: Markdown for case studies, JSON for pages — all CMS-editable from the start
6. Implement PageBackground component (image/video/color/gradient + overlay)
7. Implement mobile hamburger nav (14px text, solid bg, drop shadow)
8. Add BackToTop button (up arrow + text, 10px+ padding, rounded corners)
9. Add image lightbox for case study content images
10. Set up TinaCMS with schema for pages, case studies, and site settings
11. Add editorial workflow (draft/published status on case studies)
12. Create sample case studies with template
13. Add favicon (128x128 PNG in `src/app/` + `public/`, declared in metadata)
14. Verify build passes
15. Guide deployment (GitHub → Tina Cloud → Vercel)

**Key decisions to confirm with user**:
- Number of nav items / pages
- Case study structure (what sections)
- Grid layout (items per row, per page)
- CMS preference (Tina vs alternatives)
- Hosting preference
- Social links and contact details

**Critical rules**:
- NEVER hardcode page text in JSX — wire all content to JSON/markdown from the start
- Use `site-settings.json` for any data appearing in 2+ places
- Always include mobile nav in initial scaffold
- Always add `status` field to case studies for editorial workflow
- Upgrade `next-mdx-remote` to v6+ before first deploy to Vercel

---

## Skill: Add New Page to Portfolio

**Trigger**: User wants to add a page (e.g., Services, Testimonials)

**Steps**:
1. Create page component in `src/app/[page]/page.tsx`
2. Add JSON content file in `src/content/pages/[page].json` with ALL text content (never hardcode)
3. Add fields to Tina schema in `tina/config.ts`
4. Add nav link in `Navigation.tsx` (both desktop and mobile menu)
5. Wire up PageBackground support
6. Verify build

---

## Skill: Add CMS Fields

**Trigger**: User wants to make more content editable via Tina

**Steps**:
1. Identify what's currently hardcoded vs CMS-managed
2. Decide: does this data belong in a page JSON, or in site-settings.json (if shared)?
3. Add fields to the appropriate collection in `tina/config.ts`
4. Add corresponding data to the JSON/markdown content file
5. Update the page component to read from content instead of hardcoded values
6. Verify the field appears in Tina admin panel

**Field types available**:
- `string` — single line text
- `string` with `component: "textarea"` — multi-line
- `rich-text` — WYSIWYG editor
- `image` — file upload with drag-and-drop
- `number` — numeric input
- `datetime` — date picker
- `boolean` — toggle
- `object` (list: true) — repeatable groups (e.g., experience items, skills)
- `string` with `options` — dropdown select

**When to use site-settings.json vs page JSON**:
- Site settings: data used by 2+ components/pages (email, socials, name, footer text)
- Page JSON: data specific to a single page (heading, bio, CTA text)

---

## Skill: Configure Flexible Backgrounds

**Trigger**: User wants to change page backgrounds

**Steps**:
1. Ensure PageBackground component is wrapping the page
2. Ensure background fields exist in the content file
3. Guide user through Tina admin:
   - Select background type from dropdown
   - Upload image or provide video path
   - Set overlay opacity for readability (recommend 40-60)
4. For videos: file goes in `public/videos/`, reference as `/videos/filename.mp4`
5. For images: upload via Tina media manager or place in `public/images/`

---

## Skill: Deploy Portfolio Site

**Trigger**: User is ready to go live

**Pre-requisites**:
- GitHub repo created and code pushed
- Tina Cloud account with project connected to repo

**Steps**:
1. Verify `next-mdx-remote` is v6+ (Vercel blocks vulnerable versions)
2. Get Client ID and Token from Tina Cloud dashboard
3. Add to `.env` locally and as Vercel env vars
4. Ensure `package.json` build script is: `"build": "tinacms build && next build"`
5. Push to GitHub
6. Connect repo in Vercel (or run `npx vercel`)
7. Verify deployment succeeds
8. Test `/admin` panel login on live site
9. Confirm edit → commit → redeploy flow works

**Common issues**:
- `next-mdx-remote` vulnerability blocks deploy → upgrade to v6+
- Tina build fails without credentials → ensure env vars are set in hosting platform
- Peer dependency warnings (React 19 vs Tina's React 18 deps) → safe to ignore, they're warnings not errors
- Push rejected after Tina admin edit → use `git pull --rebase` to resolve
- Favicon not showing → hard refresh (Cmd+Shift+R), ensure 128x128+ size, declared in layout metadata

---

## Skill: Customize Design Tokens

**Trigger**: User wants different colors/fonts for a new site

**Steps**:
1. Edit `src/app/globals.css` → `@theme` section for colors
2. Edit `src/app/layout.tsx` → Google Fonts link
3. Update `globals.css` → `--font-sans` variable
4. Update component classes if using specific color names
5. Update `site-settings.json` (name, footer text)
6. Rebuild and verify

---

## Skill: Set Up Editorial Workflow

**Trigger**: User wants draft/publish control over case studies

**How it works**:
- Each case study has a `status` field: `"draft"` or `"published"`
- In development (`NODE_ENV !== production`): all studies visible (for preview)
- In production: only `"published"` studies appear on the site
- User sets status in Tina admin via a dropdown field

**Implementation**:
- Frontmatter: `status: "published"` or `status: "draft"`
- `getAllCaseStudies()` filters out drafts when `process.env.NODE_ENV === "production"`
- Tina schema includes `status` as a required field with options

---

## Skill: Manage Shared Site Settings

**Trigger**: User wants to update social links, email, footer text, or site name

**Where to edit**: Tina admin → Site Settings collection → site-settings.json

**Fields available**:
- Site Name
- Contact Email
- Copyright Text
- Footer Heading
- Footer Description
- Social Links (repeatable: label + URL)

**What reads from site settings**:
- Footer component (heading, description, email, socials, copyright)
- Contact page (social links)
- Any future component that needs global data

**Adding a new global field**:
1. Add field to `src/content/site-settings.json`
2. Add to `SiteSettings` interface in `src/lib/site-settings.ts`
3. Add field to `siteSettings` collection in `tina/config.ts`
4. Use `getSiteSettings()` in the consuming component

---

## Skill: Handle Git Conflicts from Tina Cloud

**Trigger**: Push rejected because Tina committed changes from the admin panel

**Steps**:
1. Run `git pull --rebase origin main`
2. If conflicts: resolve, then `git rebase --continue`
3. Push again: `git push origin main`

**Prevention**: Pull before starting local work if you've recently edited in the admin panel.

---

## Skill: Add Favicon

**Trigger**: User provides a favicon file

**Requirements**:
- PNG format, 128x128 pixels minimum (16x16 is too small for modern browsers)
- Place in both `src/app/favicon.png` (Next.js auto-detection) and `public/favicon.png`
- Declare explicitly in layout metadata: `icons: { icon: "/favicon.png" }`

**If favicon doesn't show after deploy**:
- Hard refresh (Cmd+Shift+R) — browsers cache favicons aggressively
- Verify file is at least 128x128
- Check that metadata declaration is present in layout.tsx

---

## Skill: Mobile Navigation

**Trigger**: Always included in initial scaffold

**Implementation details**:
- Hamburger icon: 3 animated lines → X on open (CSS transitions)
- Menu panel: drops down from nav bar (not full-screen overlay)
- Text size: 14px (`text-[14px]`)
- Background: solid base color (`bg-background`), not translucent
- Drop shadow: `shadow-lg` on the panel
- Auto-close on route change
- Body scroll locked when open
- Accessible: `aria-label`, `aria-expanded` on toggle button


---

## Skill: Manage Work Tags (Filtering)

**Trigger**: User wants to add, remove, or reorder tags for the Works filter bar

**Where to edit**: Tina admin → Site Settings → Work Tags

**How it works**:
- `workTags` in `site-settings.json` defines the list of tags that appear in the filter bar
- Only tags that have at least one case study assigned will actually show in the UI
- Tags are matched exactly (case-sensitive) — "UX/UI Design" ≠ "ux/ui design"
- A case study can have multiple tags and will appear under each matching filter

**Adding a new tag**:
1. Add the tag string to `workTags` in site settings (via Tina admin or JSON file)
2. Assign the tag to one or more case studies (in their `tags` frontmatter array)
3. It appears in the filter bar automatically on next build

**Current defined tags**:
- Illustration
- Graphic Design
- UX/UI Design
- Product Design
- Animation
- Development

**Architecture**:
- Tags stored in: `src/content/site-settings.json` → `workTags[]`
- Filter component: `src/components/WorksGrid.tsx` (client-side, receives tags as props)
- Tags passed from server: `src/app/works/page.tsx` reads settings and passes to WorksGrid


---

## Skill: Sync Tina Schema After Config Changes

**Trigger**: Deploy fails with "local GraphQL schema doesn't match remote" error

**Root cause**: You changed `tina/config.ts` (added/removed fields) but didn't regenerate and commit the `tina/__generated__/` files. Tina Cloud compares against these committed files.

**Steps**:
1. Run locally: `npx tinacms dev --command "echo done"` (starts and stops, regenerating files)
2. Check: `git status tina/` — you should see changes in `tina/__generated__/`
3. Commit: `git add tina/ && git commit -m "Regenerate Tina schema files"`
4. Push: `git push origin main`
5. Wait ~30s for Tina Cloud to re-index, then redeploy

**Critical rule**: Every time you modify `tina/config.ts` (add fields, change collections, rename types), you MUST regenerate and commit the generated files before deploying.

---

## Skill: Add Relevant Links to Case Studies

**Trigger**: User wants to add external links (GitHub, Figma, demo, etc.) to a case study

**How it works**:
- Each case study has a `links` array in frontmatter
- Links appear below the content as styled buttons with icons
- Editable via Tina admin (Case Studies → select study → Relevant Links)

**Frontmatter format**:
```yaml
links:
  - label: "View on GitHub"
    url: "https://github.com/..."
    icon: "github"
  - label: "Live Demo"
    url: "https://..."
    icon: "globe"
```

**Available icons**: `github`, `figma`, `dribbble`, `behance`, `npm`, `globe` (website), `play` (demo/video), `link` (generic)

**Component**: `src/components/CaseStudyLinks.tsx`
