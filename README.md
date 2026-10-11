# Portfolio Site

A minimalist portfolio site built with Next.js, Tailwind CSS, and markdown-based case studies.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Adding a New Case Study

1. Copy `src/content/case-studies/_template.md`
2. Rename it to your project slug (e.g., `my-new-project.md`)
3. Fill in the frontmatter (title, thumbnail, tags, etc.)
4. Write your content using markdown
5. Drop your images into `public/images/case-studies/`
6. The case study appears automatically on the Works page

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Case study title |
| `thumbnail` | Yes | Path to grid thumbnail image (4:3 ratio recommended) |
| `headerImage` | Yes | Path to full-width header image (16:9 ratio recommended) |
| `summary` | Yes | Short description for the card (1-2 sentences) |
| `tags` | Yes | Array of tags shown on cards |
| `client` | No | Client name |
| `date` | Yes | Publication date (YYYY-MM-DD), used for sorting |
| `liveUrl` | No | Link to live project |
| `role`, `years` | No | Hero meta (V2) |
| `situation`, `task` | No | STAR Situation and Task text (V2) |
| `resultsStats`, `resultsCopy` | No | STAR Results stats and closing paragraphs (V2) |
| `homepageOnly` | No | `true` hides the case study from Works, related and prev/next (V2; company highlights no longer use case studies) |

### Image Guidelines

- **Thumbnails**: 800×600px minimum, 4:3 aspect ratio
- **Headers**: 1600×900px minimum, 16:9 aspect ratio  
- **Content images**: Any size, will be responsive
- Supported formats: JPG, PNG, SVG, WebP, AVIF

### Content Structure

Case studies follow STAR (V2): **Situation**, **Task**, **Action** and **Results**. Situation, Task and Results are frontmatter fields; the markdown body is Action, where `###` headings start blocks with an image beside the text. Older write-ups still work and show entirely under Action. See [docs/CASE-STUDY-STRUCTURE.md](docs/CASE-STUDY-STRUCTURE.md).

You can add any markdown content to Action: images, videos (via embed), links, lists, etc.

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Home/splash page
│   ├── about/page.tsx      # About page
│   ├── works/page.tsx      # Works grid (paginated)
│   ├── works/[slug]/       # Individual case study
│   └── contact/page.tsx    # Contact page
├── components/             # Reusable components
├── content/case-studies/   # Your markdown case studies
└── lib/                    # Utility functions
public/
└── images/case-studies/    # Your images go here
```

## Design Tokens

- Background: `#FFFDF9`
- Text: `#333333`
- Accent Orange: `#D26D1F`
- Accent Yellow: `#F3C041`
- Neutral Warm: `#AFA29B`
- Neutral Dark: `#5A5756`
- Font: Google Sans Flex

## Deployment

Deploy to Vercel with zero config:

```bash
npx vercel
```

Or build for any host:

```bash
npm run build
npm start
```
