# Portfolio Site — Replication Guide

A guide for anyone who wants to build a portfolio site using this structure. This covers what to change, what to keep, and how the pieces fit together.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/ginnymones/portfolio.git my-portfolio
cd my-portfolio
npm install

# Run locally
npm run dev

# Visit http://localhost:3000
# Admin panel at http://localhost:3000/admin
```

---

## What You MUST Change

These are personal/unique to each site and will break or look wrong if left as-is:

| What | Where | Notes |
|------|-------|-------|
| Site name | `src/content/site-settings.json` → `name` | Appears in nav + footer |
| Email | `src/content/site-settings.json` → `email` | Contact CTA |
| Social links | `src/content/site-settings.json` → `socialLinks` | Footer + contact section |
| Copyright | `src/content/site-settings.json` → `copyright` | Footer |
| Metadata (title, description) | `src/app/layout.tsx` → `metadata` | SEO + browser tab |
| Favicon | `src/app/favicon.png` + `public/favicon.png` | 128x128 PNG minimum |
| Tina Cloud credentials | `.env` → `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` | Your own Tina project |
| Case studies | `src/content/case-studies/*.md` | Replace samples with your work |
| Images | `public/images/case-studies/` | Your actual project images |
| About page content | `src/content/pages/about.json` | Bio, experience, tools, links |
| Page headings/CTAs | `src/content/pages/*.json` | All editable via Tina admin |

---

## What You CAN Change (Styling & Structure)

These are design/layout decisions you're free to customize:

### Colors

Edit `src/app/globals.css` → `@theme` section:

```css
@theme {
  --color-background: #FFFDF9;      /* Change to your bg */
  --color-foreground: #333333;      /* Main text */
  --color-accent-orange: #D26D1F;   /* Primary accent */
  --color-accent-yellow: #F3C041;   /* Secondary accent */
  --color-neutral-warm: #AFA29B;    /* Muted elements */
  --color-neutral-dark: #5A5756;    /* Dark sections */
}
```

### Font

1. Swap the Google Fonts `<link>` in `src/app/layout.tsx`
2. Update `--font-sans` in `globals.css`

### Contact Section

Currently: dark rounded card, 80% viewport width (`w-[80vw]`) on desktop, full-width on mobile. Sits above the footer on every page, anchored as `#contact`.

You can change:
- Width: edit `w-[80vw]` in `src/components/ContactSection.tsx`
- Background: change `bg-neutral-dark` to any color/style
- Border radius: change `rounded-2xl`
- Padding: change `p-10 md:p-16`
- Make it page-specific: remove from `layout.tsx` and add to individual pages instead
- Remove it entirely: delete from `layout.tsx` and remove the nav `#contact` link

Note: This is NOT a separate page — it's a section in the layout with `id="contact"`. The nav links to `#contact` which scrolls to it.

### Navigation

- Links: edit the `navLinks` array in `src/components/Navigation.tsx`
- Mobile menu style: compact dropdown (solid bg, drop shadow, 14px text) — adjust as needed
- Sticky behavior: remove `sticky top-0` if you want it to scroll away

### Case Study Grid

- Columns: `lg:grid-cols-3` in `src/components/WorksGrid.tsx` (change to 2 or 4)
- Items per page: change `ITEMS_PER_PAGE` in `WorksGrid.tsx`
- Card aspect ratio: `aspect-[4/3]` in `CaseStudyCard.tsx`
- Filter tags: managed from Tina admin → Site Settings → Work Tags. Add/remove/reorder anytime.
- Filter behavior: client-side, instant. Only shows tags that have at least one assigned case study.

### Case Study Template

The body structure (Problem → Solution → Results) is a recommendation, not enforced. Write whatever sections you want in the markdown body.

### Flexible Backgrounds

Every page and case study supports: still image, MP4 video, solid color, or gradient — with an overlay for readability. Configure per-page in the JSON or per-study in the frontmatter.

### Footer

Currently minimal (copyright only). Add back social links, a tagline, or additional nav if you want — edit `src/components/Footer.tsx`.

### Back to Top Button

- Appears after 400px scroll — change threshold in `BackToTop.tsx`
- Style: dark bg, rounded, right-aligned — fully customizable
- Remove entirely: delete from `layout.tsx`

---

## What You Should NOT Change

These are structural/architectural decisions that keep things working:

| What | Why |
|------|-----|
| Content file locations (`src/content/`) | Tina CMS schema expects files here |
| Tina schema structure (`tina/config.ts`) | Matches content file format; changing breaks admin panel |
| `site-settings.json` shape | Read by multiple components — change shape = update all consumers |
| `status` field on case studies | Editorial workflow depends on this for draft filtering |
| Image paths starting with `/` | Next.js serves from `public/`; relative paths won't resolve |
| `package.json` build script order | `tinacms build && next build` — Tina must generate files before Next.js builds |
| `.env` variable names | Tina SDK expects these exact names |

---

## How to Add a New Page

1. Create `src/app/your-page/page.tsx`
2. Create `src/content/pages/your-page.json` (copy structure from another page JSON)
3. Add fields to `tina/config.ts` → pages collection if needed
4. Add to `navLinks` in `Navigation.tsx`
5. Wrap page content in `<PageBackground>` for background support

---

## How to Add a Case Study

1. Copy `src/content/case-studies/_template.md`
2. Rename to your slug: `my-project.md` (lowercase, hyphens between words, no special characters)
3. Fill in the frontmatter (title, thumbnail, tags, date, etc.)
4. Set `status: "published"` when ready to go live (use `"draft"` while writing)
5. Write markdown body content
6. Drop images in `public/images/case-studies/`
7. Done — it appears on the Works page automatically

Or use the Tina admin panel → Case Studies → create new (slug auto-generated from title, editable before save).

### Image Specifications

| Image | Aspect Ratio | Recommended Size | Notes |
|-------|-------------|-----------------|-------|
| Thumbnail | 4:3 | 800 × 600px | Shown on Works grid cards |
| Header | 16:9 | 1600 × 900px | Top of case study detail page |
| Body images | Any | Any | Clickable (lightbox opens on click) |

- Header images are always masked to 16:9 with rounded corners and center-crop (`object-cover`)
- Keep focal content centered — edges may be cropped on different screen sizes
- Supported formats: JPG, PNG, WebP, SVG

### Image Naming Convention

```
public/images/case-studies/
├── [slug]-thumb.jpg        # Thumbnail
├── [slug]-header.jpg       # Header image
├── [slug]-01.jpg           # Body images
├── [slug]-mobile.jpg       # Optional variants
└── ...
```

### URL Slug Best Practices

- Lowercase, hyphens between words: `100-days-of-ui-user-profile`
- Keep hyphens between all words (Google treats them as word separators)
- Aim for 3–6 words
- Match key terms from your title for SEO

### Adding Relevant Links (YAML frontmatter)

Add a `links` array in the frontmatter to show styled buttons with icons at the bottom of the case study:

```yaml
links:
  - label: "View on Dribbble"
    url: "https://dribbble.com/shots/..."
    icon: "dribbble"
  - label: "View on Behance"
    url: "https://www.behance.net/..."
    icon: "behance"
  - label: "Live App"
    url: "https://your-app.vercel.app"
    icon: "globe"
  - label: "GitHub Repo"
    url: "https://github.com/..."
    icon: "github"
  - label: "Figma File"
    url: "https://figma.com/..."
    icon: "figma"
  - label: "npm Package"
    url: "https://npmjs.com/..."
    icon: "npm"
  - label: "Watch Demo"
    url: "https://youtube.com/..."
    icon: "play"
  - label: "Documentation"
    url: "https://docs.example.com"
    icon: "link"
```

**Available icon values:** `github`, `figma`, `dribbble`, `behance`, `npm`, `globe`, `play`, `link`

### Using Bento Gallery

Wrap images in `:::bento` / `:::` markers for a bento grid layout:

```markdown
:::bento
![Image 1](/images/case-studies/img-1.jpg)
![Image 2](/images/case-studies/img-2.jpg)
![Image 3](/images/case-studies/img-3.jpg)
:::
```

Layout adapts based on count: 2 = side by side, 3/5/6 = first image spans 2 rows, 4 = 2×2 grid.

---

## Deployment

### First Time

1. Push code to GitHub
2. Create a Tina Cloud project at [app.tina.io](https://app.tina.io), connect your repo
3. Copy Client ID + Token into `.env` and your hosting platform's env vars
4. Deploy to Vercel: connect GitHub repo in Vercel dashboard or run `npx vercel`
5. Visit `your-site.com/admin` to confirm Tina works

### Ongoing

Edits in Tina admin → commit to GitHub → Vercel auto-redeploys → live in ~1-2 min.

---

## Reference Documents

- **[PROJECT-SPEC.md](./PROJECT-SPEC.md)** — Full technical spec (architecture, content schema, design tokens, file structure)
- **[AGENT-SKILLS.md](./AGENT-SKILLS.md)** — Step-by-step workflows for common tasks (add pages, deploy, customize, troubleshoot)
- **[PENDING-TASKS.md](./PENDING-TASKS.md)** — Current status of what's done vs remaining

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Favicon not showing | Hard refresh (Cmd+Shift+R). Ensure 128x128+ PNG. |
| Vercel deploy fails with vulnerability | Upgrade `next-mdx-remote` to v6+: `npm install next-mdx-remote@latest` |
| Push rejected | Tina committed from admin. Run `git pull --rebase origin main` then push again. |
| Tina admin shows no content | Check that content files exist in `src/content/` and match the schema paths in `tina/config.ts` |
| Case study not appearing | Check `status` is `"published"` (not `"draft"`) and `date` field is valid |
| Background not rendering | Confirm `backgroundType` is set to something other than `"none"` and the corresponding field (image/video/color) is filled in |
