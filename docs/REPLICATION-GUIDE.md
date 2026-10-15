# Portfolio Site: Replication Guide (V2)

How to build your own portfolio from this structure: what to change, what to keep, and how the pieces fit. It describes the V2 site (ginnymones.com). For the full architecture see [PROJECT-SPEC.md](./PROJECT-SPEC.md); for tokens and components see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

---

## Quick start

```bash
git clone https://github.com/ginnymones/portfolio.git my-portfolio
cd my-portfolio
npm install
npm run dev        # TinaCMS + Next dev server
```

- Site: http://localhost:3000
- CMS: http://localhost:3000/admin/index.html
- With no Tina credentials in `.env`, the CMS runs in local mode (edits write straight to the files).
- `npm run dev:next` starts the site without the CMS.

Before committing, run `npx tsc --noEmit` and `npm run build`. Do not run `npm run build` while `npm run dev` is running: they share the `.next` folder and clash.

---

## What you must change

| What | Where | Notes |
|---|---|---|
| Site name, email, social links | `src/content/site-settings.json` | Email and socials feed the Get in touch panel |
| Domain | `metadataBase` in `src/app/layout.tsx`, `siteUrl` in `next-sitemap.config.js`, the old-domain redirect in `next.config.ts` | Search for `ginnymones.com` |
| Title, description, social image | `metadata` in `src/app/layout.tsx`, `public/og-image.png` (1200 x 630) | Used for tabs, search and link previews |
| Favicon | `src/app/favicon.png` and `public/favicon.png` | 128 x 128 PNG or larger |
| Logo | `public/branding/` and the `Image` in `Navigation.tsx` | The UI uses one logo variant |
| Page copy | `src/content/pages/home.json`, `works.json`, `tools.json`, `contact.json` | All editable in Tina |
| Case studies | `src/content/case-studies/*.md` | Delete the samples, keep `_template.md` |
| Tools | `src/content/tools/*.md` | Delete the samples |
| Images and video | `public/images/`, `public/videos/` | See "Image weight" below |
| Tina credentials | `.env`: `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` | Your own Tina Cloud project |
| Tool proxies and redirects | `next.config.ts` | Remove the `rewrites()` for tools you do not have; edit `redirects()` |

---

## What you can change

### Colors and fonts

Colors are tokens in `src/app/globals.css` under `@theme`:

```css
@theme {
  --color-sunset: #CF5925;        /* accent: tags, numbers, panel fill */
  --color-burnt-sienna: #B75220;  /* page headings */
  --color-cream: #FFFCF7;         /* page background */
  /* ...see DESIGN-SYSTEM.md for the full palette */
}
```

Change a value and every utility that uses it (`bg-sunset`, `text-sunset`, `border-sunset`) updates. Use the token classes in components, not raw hex. Do not use the legacy aliases (`accent-orange`, `neutral-dark`, and so on); they are being removed.

Fonts: swap the Google Fonts `<link>` in `layout.tsx` and `--font-sans` / `--font-serif` in `globals.css`. The heading styles (`.heading-1` to `.heading-5`) assume a font with one weight; if yours has bold, remove `font-synthesis: none` only if you want that.

### Get in touch panel

`src/components/ContactSection.tsx` sits in the root layout, so it shows on every page, anchored as `#contact` (the nav "Contact" link scrolls to it). Heading and copy: Tina > Pages > Contact. Socials: Site Settings. The illustration (`public/images/get-in-touch-art.png`) only shows from 1024px up; delete the image block to remove it. Remove the component from `layout.tsx` and the `#contact` nav link to drop the panel.

### Navigation

Edit the `navLinks` array in `src/components/Navigation.tsx`; the same array feeds the desktop bar and the phone drawer. Bar heights (170px to 70px on desktop, 88px to 64px on phones) and the spacer under it are in the same file; keep the spacer equal to the full bar height plus 40px.

### Works gallery

- Column heights: the `STAGGER` array in `WorksGrid.tsx`.
- Items per click: `PAGE_SIZE` in `WorksGrid.tsx` (six).
- Filter chips: Tina > Site Settings > Work Tags. A tag only shows once a case study uses it. Tags match exactly (case-sensitive).
- Order: newest first by `date`. Do not add a featured override without asking.

### Case study template

Three sections: **Challenge**, **Action**, **Results**. Challenge and Results are frontmatter fields and hide when empty; the markdown body is Action. Older free-form write-ups still render under Action. Details: [CASE-STUDY-STRUCTURE.md](./CASE-STUDY-STRUCTURE.md).

### Backgrounds

Pages and case studies can take a still image, looping video, solid color or gradient, plus an overlay. The V2 pages leave it at `none`.

---

## What not to change

| What | Why |
|---|---|
| Content locations under `src/content/` | The Tina schema points at these paths |
| `tina/config.ts` structure | It must match the content files; changing it needs regenerated files (see below) |
| `status` on case studies and tools | Draft hiding in production depends on it |
| Image paths starting with `/` | Files are served from `public/` |
| Build script order in `package.json` | `tinacms build --skip-indexing && next build && next-sitemap` |
| `.env` variable names | The Tina SDK expects these exact names |
| Hardcoded text in JSX | Everything visible should come from JSON or markdown so Tina can edit it |

---

## How to add a page

1. Create `src/app/your-page/page.tsx`.
2. Create `src/content/pages/your-page.json` (copy the shape of `works.json`) and read it with `getPageContent("your-page")`.
3. Add any new fields to the pages collection in `tina/config.ts`, then regenerate (see "Tina schema changes").
4. Add the link to `navLinks` in `Navigation.tsx`.
5. Wrap the page in `PageBackground` if you want background support, and use a `max-w-[1000px]` (reading) or `max-w-[1200px]` (wide) container with `px-6 xl:px-0`.
6. Add a dated entry to `CHANGELOG.md`.

---

## How to add a case study

1. Copy `src/content/case-studies/_template.md` to `<slug>.md` (lowercase, hyphens, three to six words; the slug is the URL).
2. Fill in the frontmatter: `title`, `thumbnail`, `headerImage`, `summary`, `tags`, `date`, plus `role`, `years`, `client` as needed.
3. Write **Challenge** in `challenge` and **Results** in `resultsStats` and `resultsCopy`. Write Action in the body.
4. Set `status: "published"` when it is ready (use `"draft"` while writing; drafts are hidden in production, even by direct URL).
5. Add images under `public/images/case-studies/`.
6. It appears on `/works` automatically, newest first.

Or use Tina > Case Studies > create new.

### Image specs

| Image | Shape | Notes |
|---|---|---|
| Thumbnail | 4:3, at least 800 x 600px | Works card; phones show 4:3, desktop crops to a staggered ratio, so keep the subject centered |
| Header | About 600 x 440px on the page (export at 2x) | Hero image beside the title |
| Body images | Any | Click to open the lightbox |

### Writing Action

- `###` starts a block. A stand-alone image is paired with the text next to it (image left, text right on desktop; image first on phones).
- An image with no text runs full width, captioned by its alt text.
- Images on consecutive lines stack in one column. A `***` line starts a new block without a heading; a `+++` line after an image keeps the following text under that image.
- Wrap images in `:::bento` / `:::` for a gallery: 2 = side by side, 3, 5 or 6 = the first spans two rows, 4 = a 2 x 2 grid. A gallery can hold `.mp4` or `.webm` clips.
- A line like `![Description](/images/case-studies/clip.mp4)` (or `.webm`) renders a video player. A `clip-thumb.png` or `.jpg` in the same folder is its poster automatically.

### Relevant links

```yaml
links:
  - label: "Live App"
    url: "https://your-app.vercel.app"
    icon: "globe"
```

Icons: `github`, `figma`, `dribbble`, `behance`, `npm`, `globe`, `play`, `link`.

---

## How to add a tool

1. Create `src/content/tools/<slug>.md` (copy an existing one). Fields: `title`, `status`, `projectStatus` (`live`, `beta`, `in-progress`), `thumbnail` (4:3 screenshot in `public/images/tools/`), `summary`, `tags`, `liveUrl`, `repoUrl`, `caseStudy`, `date`.
2. `caseStudy` is only linked if that case study file exists.
3. To serve the tool under your domain, add rewrites in `next.config.ts`. If the app is built with a matching `basePath`, add a separate rule for the bare path (no trailing slash) or the app redirects in a loop.
4. Test on a Vercel preview before it goes to production.

---

## Tina schema changes

Whenever you edit `tina/config.ts` (add a field or collection):

1. Run `npm run dev` or `npm run build` once. It regenerates `tina/tina-lock.json` and `tina/__generated__/*`.
2. Commit those files together with `tina/config.ts`.
3. Push; wait for Tina Cloud to reindex (use Reindex in the branch menu if it does not).

If you skip step 2, the live CMS will not see the new schema, or the deploy fails with a schema mismatch.

---

## Image weight (Vercel Hobby)

Vercel image optimization is turned off here (`images.unoptimized: true`), because the Hobby plan caps transformations (about 5,000, then a 402 error). So the files you commit are the files visitors download:

- Export JPEGs as progressive, at the size they display (2x for retina).
- Use WebM instead of GIF or large MP4. A 58 MB demo video became 3.5 MB.
- Give looping clips a `<name>-poster.jpg` so a still shows until playback starts (phones in Low Power Mode may block autoplay).
- Keep `public/images` small; it was about 92 MB at launch.

---

## Deployment

### First time

1. Push the code to GitHub.
2. Create a Tina Cloud project at https://app.tina.io and connect the repo.
3. Put the Client ID and Token in `.env` and in the Vercel environment variables.
4. Import the repo in Vercel (framework: Next.js; build command from `package.json`).
5. Add your domain in Vercel and point DNS at it.
6. Open `your-site.com/admin/index.html`, log in, make an edit and confirm it redeploys.

### Ongoing

Edit in Tina (or locally) → commit to `main` → Vercel redeploys in about one to two minutes. Pushing to `main` is a production deploy. Use a branch preview for anything that touches rewrites, redirects or the proxy rules.

---

## Reference documents

- [PROJECT-SPEC.md](./PROJECT-SPEC.md): architecture, content schema, file structure
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md): tokens, type, components
- [CASE-STUDY-STRUCTURE.md](./CASE-STUDY-STRUCTURE.md): Challenge, Action, Results and Action block rules
- [AGENT-SKILLS.md](./AGENT-SKILLS.md): step-by-step workflows for common tasks
- `V2 Assets/PENDING.md` (local only): what is done and what is left

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Favicon not showing | Hard refresh (Cmd+Shift+R); use a 128px or larger PNG |
| Push rejected | Tina committed from the admin. `git pull --rebase origin main`, then push |
| Tina admin shows no content | Check the files exist in `src/content/` and match the paths in `tina/config.ts` |
| Case study missing from Works | Check `status` is `published`, `homepageOnly` is not `true`, and `date` is valid |
| Draft visible in dev but 404 in production | Expected: drafts are hidden when `NODE_ENV` is `production` |
| Tool path loops or redirects forever | Add a bare-path rewrite (no trailing slash) for apps built with a `basePath` |
| Tina indexing fails after a push | Check frontmatter quotes (`icon: "globe"`, not `icon: "globe`), then Reindex |
| Video box is blank on a phone | Add a `-poster.jpg`; Low Power Mode and data saver can block autoplay |
| Dev server shows odd build errors after a build | Stop dev, delete `.next`, restart (build and dev clash) |
