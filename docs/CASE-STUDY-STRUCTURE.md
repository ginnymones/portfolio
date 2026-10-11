# Case Study Structure (V2, STAR)

Applies to the V2 revamp (branch `v2-revamp`). Figma: file `TvM2qUTpe3HvmMmc7IyJlx`, frame `case study / hi-fi` (node `357:171`). There is no Figma mobile frame for case studies yet; the stacked mobile layout is a proposal.

V1 case studies were one free-form markdown body (Problem Statement, Solution, Results & Impact). V2 uses STAR: **Situation, Task, Action, Results**. A V1 write-up needs no edits to keep working.

## Page layout

| Section | Source | Notes |
|---|---|---|
| Breadcrumbs | route + `title` | Home / Works / Title |
| Hero | `headerImage`, `tags[0]`, `title`, `summary`, `client`, `role`, `years`, `liveUrl` | 600x440 image beside a 352px title block. Years falls back to the year of `date`. `liveUrl` shows as a "View live" text button |
| Situation | `situation` | Full-width paragraphs. Hidden when empty |
| Task | `task` | Full-width paragraphs. Hidden when empty |
| Action | markdown body | See "Writing Action" below. Hidden when empty |
| Results | `resultsStats`, `resultsCopy` | Up to three stats (number, icon, label), then closing paragraphs. Hidden when both are empty |
| Relevant links | `links` | Secondary buttons |
| Previous / Next | other listed case studies | Newest-first order, same as Works |
| Related work | other listed case studies | Up to three, ranked by shared tags then recency |

`homepageOnly: true` case studies skip Previous / Next and Related work, and are excluded from the lists that feed them.

## Frontmatter (new fields)

| Field | Type | Description |
|---|---|---|
| `role` | string | Hero meta, e.g. `UX/UI Designer, Digital Account Director` |
| `years` | string | Hero meta, e.g. `2018 – 2022`. Optional |
| `situation` | string | STAR Situation. A blank line starts a new paragraph |
| `task` | string | STAR Task. Same paragraph rule |
| `resultsStats` | list of `{ value, label, icon? }` | The stat tiles, e.g. `500%` / `More agency revenue`. `icon` is an optional image; a khaki circle shows without it |
| `resultsCopy` | string | Closing paragraphs under the stats |
| `homepageOnly` | boolean | Hides a case study. (Originally for company case studies; the company homepage sections are now standalone highlights with none.) Hidden from the Works listing, Related work and Previous / Next. Still reachable by URL and from the home page |

All existing fields (`title`, `status`, `thumbnail`, `headerImage`, `summary`, `tags`, `client`, `date`, `liveUrl`, `links`, background fields) are unchanged. The body field is labelled **Action** in the CMS. `src/content/case-studies/_template.md` is the starter.

## Writing Action

Action is the markdown body. `src/lib/action-blocks.ts` splits it into blocks:

- A `###` heading starts a block.
- The first stand-alone image in a block becomes its side image. Blocks with an image and text sit side by side, and every such block flips sides.
- A block with an image but no text runs full width. The image's alt text (or the heading, if there is no alt text) is the caption.
- Anything before the first `###` is an intro block with no heading.
- A block with no image is full-width prose.
- `:::bento` galleries, inline videos (`.mp4` / `.webm`) and the image lightbox still work.
- `##` headings in older write-ups are not block separators; they render as headings inside the prose.

Put design decisions in Action as their own `###` blocks.

## Existing case studies

Their whole body shows under Action. Situation, Task and Results are empty until filled in, and empty sections do not render. Gallery-only pieces (Nissan, Chansey, Anim) keep their images in Action. Move write-ups into the STAR fields as they are rewritten.

## Code map

- `src/app/works/[slug]/page.tsx`: page layout
- `src/lib/case-studies.ts`: loader, `parseMeta`, `getListedCaseStudies` (excludes `homepageOnly`), related and adjacent helpers
- `src/lib/action-blocks.ts`: Action markdown to blocks
- `src/components/ActionSection.tsx`: alternating layout
- `tina/config.ts`: `caseStudy` collection fields. After changing it, run `npm run dev` or `npm run build` and commit `tina/tina-lock.json` and `tina/__generated__/*` with the config change
