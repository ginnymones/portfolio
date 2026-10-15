# ginnymones.com

Ginny Mones' portfolio: case studies, tools, and a career snapshot. Built with Next.js 15, Tailwind CSS v4, TinaCMS and Vercel. Live at https://ginnymones.com.

## Quick Start

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- CMS: http://localhost:3000/admin/index.html (runs in local mode when `.env` has no Tina credentials)

| Command | What it does |
|---|---|
| `npm run dev` | TinaCMS + Next dev server |
| `npm run dev:next` | Next dev server only, no CMS |
| `npm run build` | `tinacms build --skip-indexing && next build && next-sitemap` |
| `npx tsc --noEmit` | Type check (run before committing) |

Do not run `npm run build` while `npm run dev` is running; they share `.next`.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, company highlights, "I also make other stuff" tiles |
| `/works` | Case study gallery (three staggered columns, tag filter, Load more) |
| `/works/[slug]` | Case study: Challenge, Action, Results |
| `/tools` | Tool cards (Launch, Case study, Code) |
| `/tools/<name>` | Proxied tool apps: `mega-cp-calculator`, `quiz-randomizer`, `resume-lab` (rewrites in `next.config.ts`) |
| `#contact` | Get in touch panel at the bottom of every page |

`/about` redirects to `/#intro`.

## Adding a New Case Study

1. Copy `src/content/case-studies/_template.md`.
2. Rename it to the slug you want in the URL (for example `my-new-project.md`).
3. Fill in the frontmatter, write Challenge and Results in their fields and Action in the body.
4. Put images in `public/images/case-studies/` (compress them first, see below).
5. Set `status: "published"`. Drafts are hidden in production, even by direct URL.
6. It appears on `/works` automatically, newest first.

Or use the CMS: Case Studies > create new.

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `status` | Yes | `published` or `draft` |
| `title` | Yes | Case study title |
| `thumbnail` | Yes | Works card image |
| `headerImage` | Yes | Hero image beside the title |
| `summary` | Yes | Short description for the card (1-2 sentences) |
| `tags` | Yes | Tags on cards; the first one shows in the hero |
| `date` | Yes | `YYYY-MM-DD`, used for sorting |
| `client`, `role`, `years` | No | Hero meta (`years` falls back to the year of `date`) |
| `liveUrl` | No | "View live" button in the hero |
| `challenge` | No | Context plus what you set out to do; hidden when empty |
| `resultsStats`, `resultsCopy` | No | Up to three stats (value, label, icon) and closing paragraphs; hidden when both are empty |
| `links` | No | Relevant links buttons (`label`, `url`, `icon`) |
| `homepageOnly` | No | `true` hides it from Works, Related work and Previous / Next |

### Content Structure

Case studies have three sections: **Challenge**, **Action** and **Results**. Challenge and Results are frontmatter fields; the markdown body is Action, where `###` headings start blocks with an image beside the text. Older write-ups show entirely under Action. Full rules: [docs/CASE-STUDY-STRUCTURE.md](docs/CASE-STUDY-STRUCTURE.md).

## Adding a Tool

1. Copy a file in `src/content/tools/` and edit the frontmatter (`title`, `projectStatus`, `thumbnail`, `summary`, `tags`, `liveUrl`, `repoUrl`, `caseStudy`, `date`).
2. Put the 4:3 screenshot in `public/images/tools/`.
3. To serve the app under ginnymones.com, add rewrites in `next.config.ts`, and test on a Vercel preview first.

Tools sort newest first by `date`.

### Image Guidelines

- **Thumbnails**: 800 x 600px minimum, 4:3 (desktop crops to staggered ratios, so keep the subject centered)
- **Headers**: export at 2x of the 600 x 440px display size
- **Content images**: any size; click to open the lightbox
- **Formats**: progressive JPEG, PNG, SVG, WebP. Use WebM instead of GIF or large MP4
- Vercel image optimization is off (Hobby plan limits), so the committed file is what visitors download. Compress offline.

## Project Structure

```
src/
├── app/                    # Pages: page.tsx (home), works/, tools/, not-found.tsx, layout.tsx, globals.css
├── components/             # UI pieces; ui/ holds Button, Tag, ImageSlot, LoopVideo
├── content/
│   ├── case-studies/       # Markdown case studies (+ _template.md)
│   ├── tools/              # Markdown tool cards
│   ├── pages/              # JSON copy for home, works, tools, contact
│   └── site-settings.json  # Name, email, socials, Works filter tags
└── lib/                    # Content loaders and Action block parser
public/
├── images/                 # case-studies/, home/, tools/
├── videos/                 # Homepage loops and poster frames
└── branding/               # Logos
tina/
└── config.ts               # CMS schema (regenerate and commit tina/__generated__ after changes)
docs/                       # Design system, project spec, replication guide, agent workflows
```

## Design Tokens

Colors are defined in `src/app/globals.css` (`@theme`). Main ones:

- Page background: cream `#FFFCF7`
- Headings: burnt sienna `#B75220` (page titles), black (section titles)
- Accent: sunset `#CF5925`; buttons: sunshine `#F2B64E`, ochre `#C6802C`
- Body text: warm gray `#5A5756`; cards: warm white `#FEFBEF` with a khaki `#DAC6A3` border
- Fonts: Forum (headings), Google Sans Flex (body, labels, buttons)

Full token list, type styles and components: [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md). The Figma file is `TvM2qUTpe3HvmMmc7IyJlx`.

## Docs

- [docs/PROJECT-SPEC.md](docs/PROJECT-SPEC.md): architecture, content schema, file structure, gotchas
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md): tokens, type, components
- [docs/CASE-STUDY-STRUCTURE.md](docs/CASE-STUDY-STRUCTURE.md): Challenge, Action, Results
- [docs/REPLICATION-GUIDE.md](docs/REPLICATION-GUIDE.md): building your own from this structure
- [docs/AGENT-SKILLS.md](docs/AGENT-SKILLS.md): step-by-step workflows
- [CHANGELOG.md](CHANGELOG.md): what changed and when

## Deployment

The site deploys to Vercel from `main`; a push to `main` is a production deploy. Tina edits commit to GitHub and trigger a rebuild (about one to two minutes). The build needs `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` set in Vercel for the live CMS.

After changing `tina/config.ts`, run `npm run dev` or `npm run build` once and commit `tina/tina-lock.json` and `tina/__generated__/*` with the config change.
