# Agent Skills: Portfolio Site Workflows (V2)

Step-by-step recipes for an AI agent (or a person) working on this repo. Read [PROJECT-SPEC.md](./PROJECT-SPEC.md) first for the architecture and [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for tokens.

## Ground rules (apply to every skill)

- **Figma is the source of truth** (file `TvM2qUTpe3HvmMmc7IyJlx`). Ginny edits it between sessions, so re-read the frame before changing code; do not guess spacing or copy.
- **Never hardcode page text in JSX.** Wire it to JSON or markdown so Tina can edit it.
- **Text used in two or more places lives in `site-settings.json`.**
- **Ask before** changing the content schema, adding a dependency, removing a page, touching the favicon, or pushing. A push to `main` is a production deploy.
- **Do not invent numbers.** Every stat must come from Ginny's resume or her CMS content.
- Write numbers zero to nine as words and 10 and above as numerals in copy you draft.
- Use token classes (`bg-sunset`, `text-warm-gray`), never raw hex. Do not use the legacy aliases (`accent-orange`, `neutral-dark`, ...).
- Headings are Forum with one weight: never fake a bold. No orphans (a single word alone on the last line).
- Log every visible change in `CHANGELOG.md` (newest first, `## [YYYY-MM-DD] — Title`, then Added / Changed / Removed / Notes).
- Keep `V2 Assets/PENDING.md` and the Notion page "ginnymones.com V2 revamp: pending items" in sync: update both whenever an item is added, checked off, decided or reworded.
- Never commit `CLAUDE.md`, `V2 Assets/`, `_to_delete/` or `tsconfig.tsbuildinfo`.
- Verify UI changes in a browser at about 1440px and at phone width (390px), not only with `tsc`.

---

## Skill: Sync a page or case study from Figma

**Trigger**: Ginny edited a Figma frame and wants the site to match.

**Steps**:
1. Read the frame with the Figma tools (`get_metadata`, then `get_design_context` for the node). Node ids are in the Figma table in `V2 Assets/CLAUDE.md`.
2. Compare text, lists, bold, layout, images, and desktop against mobile. Skip hidden layers.
3. Compare images byte for byte (export from Figma, compare with the file in `public/`) before replacing any.
4. Update the content file (`home.json` or the case study markdown), not the JSX.
5. Case studies: put context in `challenge`, outcomes in `resultsStats` / `resultsCopy`, the rest in the body (Action). See [CASE-STUDY-STRUCTURE.md](./CASE-STUDY-STRUCTURE.md).
6. Update the CHANGELOG and the pending list (both places).

Read before any bulk write to Figma: confirm the target node and index first; tool returns are limited to about 20 KB.

---

## Skill: Add a case study

**Trigger**: Ginny has a new write-up.

**Steps**:
1. Copy `src/content/case-studies/_template.md` to `<slug>.md` (lowercase, hyphens).
2. Fill in the frontmatter: `title`, `thumbnail`, `headerImage` (with alt text), `summary`, `tags` (first tag shows in the hero), `role`, `years`, `date`.
3. Write `challenge`, `resultsStats` (up to three) and `resultsCopy`; empty sections are hidden.
4. Write Action in the body with `###` blocks and images (image left, text right).
5. Set `status: "draft"` while writing; publish by setting it to `"published"`.
6. Compress images first (see "Add media"). Check the card, hero and Related work at 1440 and 390px.
7. If a tool should link to it, set `caseStudy` in `src/content/tools/<tool>.md` to the slug.
8. If the study replaces or renames an old one, add a permanent redirect in `next.config.ts`.

---

## Skill: Add or edit a tool

**Trigger**: A new tool for `/tools`, or a change to an existing card.

**Steps**:
1. Create or edit `src/content/tools/<slug>.md`: `title`, `status`, `projectStatus`, `thumbnail` (4:3 screenshot in `public/images/tools/`), `summary`, `tags`, `liveUrl`, `repoUrl`, `caseStudy`, `date`.
2. Status dot: live = forest, beta = sunshine, in progress = sunset.
3. Order is strictly newest-first by `date`. Do not add a featured or pinned override.
4. To serve a tool under ginnymones.com, add rewrites in `next.config.ts` (see PROJECT-SPEC "Tools and proxies"). For apps with a matching `basePath`, add a separate bare-path rule so the trailing-slash redirect cannot loop.
5. Test any rewrite or redirect change on a Vercel preview before production.
6. The Quiz Randomizer card points at the demo deployment, never the private family app.

---

## Skill: Edit homepage company highlights

**Trigger**: Update a stat, caption, image or button on the homepage.

**Steps**:
1. Edit `companyProjects` in `src/content/pages/home.json` (or Tina > Pages > Home).
2. A blank line inside `description` starts a new paragraph. A company with two stats uses a two-column grid.
3. A stat image field accepts `.mp4` / `.webm`: it plays as a silent loop. Add `<name>-poster.jpg` next to the video.
4. A stat with `buttonLabel` and `buttonLink` shows a button; a label alone shows an outlined tag.
5. Highlights are standalone: leave `caseStudy` empty unless a case study should be linked.
6. Check every number against Ginny's resume.

---

## Skill: Add a page

**Trigger**: A new route.

**Steps**:
1. Create `src/app/<page>/page.tsx` using the 1000px reading container or the 1200px wide container with `px-6 xl:px-0`.
2. Create `src/content/pages/<page>.json` with all visible text; read it with `getPageContent`.
3. Add new fields to `tina/config.ts` if needed, then regenerate and commit the Tina files (see "Sync Tina schema").
4. Add the link to `navLinks` in `Navigation.tsx` (one array feeds the desktop bar and the drawer).
5. Draw it in Figma first if it is a new design, get Ginny's OK, then build.
6. Check the page at 1440, 1024, 768 and 390px; confirm no sideways scroll.

---

## Skill: Add CMS fields

**Trigger**: Something hardcoded should become editable.

**Steps**:
1. Decide where it lives: a page JSON for one page, `site-settings.json` for shared data.
2. Ask Ginny first (schema change).
3. Add the field to the right collection in `tina/config.ts`, add the data to the content file, and read it in the component.
4. Regenerate and commit the Tina files with the config change.

**Field types**: `string`, `string` with `ui: { component: "textarea" }`, `rich-text`, `image`, `number`, `datetime`, `boolean`, `string` with `options` (dropdown), and `object` with `list: true` (repeatable group).

---

## Skill: Sync Tina schema

**Trigger**: `tina/config.ts` changed, or a deploy fails with a schema mismatch.

**Steps**:
1. Run `npm run dev` (or `npm run build`) once. It regenerates `tina/tina-lock.json` and `tina/__generated__/*`.
2. `git status tina/` should show the changes.
3. Commit them together with `tina/config.ts`.
4. After the push, wait for Tina Cloud to reindex; use Reindex in the branch menu if needed. "Refresh Branches" does not reindex.

A single missing quote in frontmatter breaks indexing for the whole branch; check quotes before pushing.

---

## Skill: Add media (images and video)

**Trigger**: New images or clips for case studies or the homepage.

Vercel image optimization is off (Hobby plan limits), so the committed file is the downloaded file.

**Steps**:
1. JPEG: export progressive, at display size (2x for retina). PNG only when you need transparency.
2. Video: use WebM (or a short MP4). No big GIFs.
3. Give homepage loops a `<name>-poster.jpg` in the same folder.
4. Put case study files in `public/images/case-studies/`, tool screenshots in `public/images/tools/`, homepage files in `public/images/home/<company>/`, videos in `public/videos/`.
5. Always write alt text (empty alt only for decoration).
6. Do not delete unused media (Nissan, Alaska, `amz-mandogrogu`, old GIFs) without Ginny's OK; offer, don't act.

---

## Skill: Change design tokens

**Trigger**: New colors, fonts or type styles.

**Steps**:
1. Colors: edit `@theme` in `src/app/globals.css`. Keep the Figma names (`color/brand/sunset` is `--color-sunset`).
2. Fonts: edit the Google Fonts `<link>` in `layout.tsx` and `--font-sans` / `--font-serif`.
3. Type styles: `.heading-1` to `.heading-5` and `.label` in `globals.css`.
4. Update [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) and the Figma `design-system` frame (321:3).
5. To retire a legacy alias, migrate its users first (listed in DESIGN-SYSTEM.md), then delete it.

---

## Skill: Edit the navigation or the mobile drawer

**Trigger**: New link, spacing or behavior change.

**Notes**:
- Desktop bar: 170px with a 70px logo at the top, 70px after about 60px of scroll (back to full below 10px). Phone: 88px then 64px. The spacer under it never changes.
- Animate with transform and opacity only; honor `prefers-reduced-motion`.
- Drawer: 280px, slides in from the right, always mounted, `inert` when closed, Escape closes it, focus moves in and back out, no body scroll lock.
- Active link and hover use the 2px `simple` curve.
- Draw new nav or menu designs in Figma first, then build.

---

## Skill: Deploy

**Trigger**: Ginny says go.

**Steps**:
1. `npx tsc --noEmit` and `npm run build` pass (not while `npm run dev` is running).
2. Check `git status`: no `CLAUDE.md`, `V2 Assets/`, `_to_delete/`, `tsconfig.tsbuildinfo`, secrets or large unoptimized media.
3. For rewrite, redirect or proxy changes: push a branch and test the Vercel preview first.
4. Commit with the attribution trailer the session requires; push only after Ginny confirms.
5. After the deploy, spot-check live pages, redirects, proxied tools (`/tools/mega-cp-calculator`, `/tools/quiz-randomizer`, `/tools/resume-lab`) and that drafts return 404.
6. Update the CHANGELOG and both pending lists.

**Common issues**:
- Tina build fails without credentials: set `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` in Vercel (the build script skips indexing, but the live CMS needs them).
- Push rejected after a Tina edit: `git pull --rebase origin main`, then push.
- Favicon not showing: hard refresh; 128px or larger.
- Proxy loop on a tool path: bare-path rewrite missing (see "Add or edit a tool").
- Draft reachable in production: it should 404; check `status` handling in `case-studies.ts`.

---

## Skill: Manage site settings and work tags

**Where**: Tina > Site Settings (`src/content/site-settings.json`).

- `name`, `email` (hola@ginnymones.com for anything public; inginnyusdev@gmail.com is only for the tools), `socialLinks` (feeds the Get in touch panel; Substack stays here but is hidden in the panel).
- `workTags`: the Works filter chips. A tag appears only when at least one case study uses it; matching is exact and case-sensitive.
- Adding a new global field: add it to the JSON, to the `SiteSettings` interface in `src/lib/site-settings.ts`, and to the `siteSettings` collection in `tina/config.ts`, then sync the Tina schema.

---

## Skill: Relevant links on a case study

**Trigger**: Add GitHub, Figma, demo or other buttons to a study.

Add a `links` array to the frontmatter (or Tina > Case Studies > Relevant Links):

```yaml
links:
  - label: "View on GitHub"
    url: "https://github.com/..."
    icon: "github"
```

Icons: `github`, `figma`, `dribbble`, `behance`, `npm`, `globe`, `play`, `link`. Component: `src/components/CaseStudyLinks.tsx`.

---

## Skill: Update the pending list

**Trigger**: Any item on the V2 pending list changes.

**Steps**:
1. Edit the Notion page (https://app.notion.com/p/3f305d704c66819cb839d6bc438ab277, under Daily To-Dos) with `notion-update-page`.
2. Edit `V2 Assets/PENDING.md` the same way. If Notion is unreachable, say so and update the local file.
3. Log visible changes in `CHANGELOG.md`.
4. Keep each line in the form `- [ ] Task` with the **owner** (Ginny, Claude or Both) and **effort** (XS under 5 min, S 5 to 15, M 15 to 60, L 1 to 3 hours, XL half a day or more).
