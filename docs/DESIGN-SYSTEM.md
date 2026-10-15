# ginnymones.com: Design System (V2)

The reference for the V2 look. Figma is the source of truth: file `TvM2qUTpe3HvmMmc7IyJlx` ("2026-Resume"), page "Resume + Website Rework", frame `design-system` (node `321:3`). Token names below match the code, so Figma variables, CSS variables and Tailwind classes all use the same words.

Tokens live in `src/app/globals.css` (`@theme`). Type styles and the `label` style live in the same file.

---

## Naming convention

```
Figma: color/brand/sunset   CSS: --color-sunset   Tailwind: bg-sunset, text-sunset, border-sunset
```

Tailwind v4 turns every `--color-*` variable in `@theme` into utility classes, so `--color-warm-gray` gives `text-warm-gray`, `bg-warm-gray` and so on. Use the token classes, never raw hex, in components.

---

## Colors

### Brand

| Figma | Hex | CSS variable | Tailwind | Usage |
|---|---|---|---|---|
| `brand/burnt-sienna` | `#B75220` | `--color-burnt-sienna` | `text-burnt-sienna` | Page headings, secondary and text button hover, tools hero circle (at 30%) |
| `brand/sunset` | `#CF5925` | `--color-sunset` | `bg-sunset`, `text-sunset` | Accents, tags, stat numbers, section labels, contact panel fill, primary button hover |
| `brand/ochre` | `#C6802C` | `--color-ochre` | `text-ochre`, `border-ochre` | Secondary and text buttons, links in case study prose |
| `brand/deep-yellow` | `#DD9334` | `--color-deep-yellow` | `text-deep-yellow` | Reserved |
| `brand/sunshine` | `#F2B64E` | `--color-sunshine` | `bg-sunshine` | Primary button fill, "Beta" status dot |

### Neutrals

| Figma | Hex | CSS variable | Tailwind | Usage |
|---|---|---|---|---|
| `neutrals/khaki` | `#DAC6A3` | `--color-khaki` | `bg-khaki`, `border-khaki` | Image placeholders, card borders, dividers |
| `neutrals/black` | `#000000` | `--color-neutral-black` | `text-neutral-black` | Section headings, curve strokes |
| `neutrals/warm-gray` | `#5A5756` | `--color-warm-gray` | `text-warm-gray` | Body copy, breadcrumbs |
| `neutrals/dark-gray` | `#333333` | `--color-dark-gray` | `text-dark-gray` | Primary button text, labels, prose text |
| `neutrals/light-gray` | `#B2ABA4` | `--color-light-gray` | `text-light-gray` | Disabled states, breadcrumb separators |
| `neutrals/warm-white` | `#FEFBEF` | `--color-warm-white` | `bg-warm-white`, `text-warm-white` | Cards, text on the sunset panel |
| `neutrals/white` | `#FAFAFA` | `--color-neutral-white` | `text-neutral-white` | Text on a hovered primary button |
| `neutrals/cream` | `#FFFCF7` | `--color-cream` | `bg-cream` | Page background |

### Status

| Figma | Hex | CSS variable | Usage |
|---|---|---|---|
| `neutrals/forest` | `#47D856` | `--color-forest` | Tool status dot: Live |
| `neutrals/crimson` | `#DA3131` | `--color-crimson` | In the palette, not used on the site yet |

Tool status dots: Live = forest, Beta = sunshine, In progress = sunset (decided 2026-10-08).

### Temporary V1 aliases

These old names still exist in `@theme` and point at V2 colors. They are being retired (tracked in `V2 Assets/PENDING.md`). Do not use them in new code.

| Alias | Points at | Still used by |
|---|---|---|
| `background` | `cream` | `Navigation` (`bg-background`), `body`, `SocialLinks` |
| `foreground` | `dark-gray` | `body` text color |
| `accent-orange` | `sunset` | `SocialLinks` |
| `accent-yellow` | `sunshine` | `BentoGallery`, `Lightbox` |
| `neutral-warm` | `light-gray` | `SocialLinks`, unused `Footer` |
| `neutral-dark` | `warm-gray` | `SocialLinks` |

### Usage in short

Page background is cream. Cards are warm white with a khaki border. Headings are burnt sienna (page titles) or black (section titles). Accents, tags and stat numbers are sunset. The Get in touch panel is a sunset fill with warm-white text.

---

## Typography

Two Google Fonts, loaded in `src/app/layout.tsx`:

| Role | Font | CSS variable |
|---|---|---|
| Headings | **Forum** (one weight, Regular) | `--font-serif` |
| Body, labels, buttons | **Google Sans Flex** (400, 500, 600, 700) | `--font-sans` |

Forum has a single weight, so the code sets `font-synthesis: none` and never bolds it. Use size and color for emphasis.

### Text styles

| Figma style | Class | Size | Notes |
|---|---|---|---|
| `heading/1` | `.heading-1` | 48px | Forum, sentence case, line height 1, balanced wrapping |
| `heading/2` | `.heading-2` | 40px | Forum, sentence case |
| `heading/3` | `.heading-3` | 32px | Forum, sentence case |
| `heading/4` | `.heading-4` | 24px | Forum, uppercase, 5% tracking (case study section labels) |
| `heading/5` | `.heading-5` | 20px | Forum, uppercase, 5% tracking (homepage tile labels) |
| `body` | default on `body` | 16px | Google Sans Flex Regular, line height 150%, 3% tracking |
| `label` | `.label` | 14px | Google Sans Flex SemiBold, uppercase, 3% tracking. Nav, tags, stat labels, captions |

Plain `h1` to `h6` get the Forum base styles automatically (`@layer base`). The `.heading-*` classes are for text that is not a heading element. Because both are in layers, Tailwind utilities such as `text-[30px]` and `leading-tight` override them, which the code uses for smaller phone sizes.

Wrapping: headings use `text-wrap: balance`; paragraphs and list items use `text-wrap: pretty`. Rule: never leave a single word alone on the last line (no orphans).

### Case study prose

Inside `.prose` (case study Action text): h2 32px, h3 24px (both Forum, black), paragraphs 16px at 150% in dark gray, lists with visible markers, images at 12px radius, links in ochre (hover burnt sienna), blockquotes with a 3px sunset left border.

---

## Layout

| Name | Width | Used for |
|---|---|---|
| Wide container | 1200px max | Nav, Works grid, Related work, Get in touch panel |
| Reading container | 1000px max | Homepage, Tools page, case study body |

Figma desktop frames are 1440 wide. The Get in touch and nav frames are still 1192px wide, 8px narrower than the 1200px cap (open item in `PENDING.md`).

Side gutters: 24px on phones (`px-6`), and `xl:px-0` once the viewport is wide enough that the container no longer touches the edges.

### Breakpoints

| Name | Width | Tailwind |
|---|---|---|
| Phone | below 768px | default |
| Tablet | 768px and up | `md:` |
| Desktop | 1024px and up | `lg:` |
| Wide | 1280px and up | `xl:` |
| Panel art overhang | 1340px and up | `min-[1340px]:` |

Illustrations that only appear on desktop (Get in touch art, Tools hero art) show from 1024px and up.

### Grids

| Page | Layout |
|---|---|
| Works | Three independent columns with staggered cover heights (tall, short, medium), 30px gap. Phones: one column |
| Tools | Two-column card grid. Phones: one column |
| Homepage company stats | Three columns, or two when a company has two stats |

---

## Radius and shadow

| Use | Value |
|---|---|
| Buttons, tags, filter chips | Full pill (`rounded-full`) |
| Case study card images, prose images, stat images | 12px (`rounded-xl`) |
| Tool cards | 16px (`rounded-2xl`) |
| Get in touch panel | 20px phone, 24px from 768px (`rounded-[20px]`, `md:rounded-[24px]`) |
| Nav shadow after scrolling | `0 4px 16px rgba(0,0,0,0.08)` |
| Back to top | `shadow-md` |
| Mobile drawer | `-8px 0 24px rgba(0,0,0,0.15)` |

---

## Components

### Buttons (`src/components/ui/Button.tsx`)

All buttons are sans-serif, 18px SemiBold, uppercase, 5% tracking. Figma's "active" variant is the same as hover.

| Variant | Default | Hover | Disabled |
|---|---|---|---|
| `primary` | Sunshine fill, dark gray text, pill, 40px x 14px padding | Sunset fill, neutral white text | Light gray fill, warm white text |
| `secondary` | Ochre 1px outline and text, pill | Burnt sienna outline and text | Light gray outline and text |
| `text` | Ochre text, underlined (1px, 10px offset) | Burnt sienna | Light gray |

A button with an `http(s):` or `mailto:` link renders a plain `<a>`; internal paths use `next/link`. Without `href` it is a `<button>`.

### Tag (`ui/Tag.tsx`)

Outline pill: 1px sunset border, sunset `label` text, 14px x 6px padding, no wrapping. Figma `tag` (357:193).

### Curve (`Curve.tsx`)

The hand-drawn accent under section titles and under the active or hovered nav link. Two variants, `fancy` and `simple`, exported from Figma with the stroke set to `currentColor`. Do not redraw. Nav and drawer curves are 2px strokes. The `fancy` curve sits at 216 x 10.65px under titles.

### Navigation (`Navigation.tsx`)

| Property | Desktop | Phone |
|---|---|---|
| Bar | Fixed, 170px tall with a 70px logo at the top | 88px tall |
| After scrolling about 60px | 70px tall, logo scales to about 44px, light drop shadow | 64px tall |
| Hysteresis | Compacts past 60px, expands again below 10px | same |
| Spacer | Non-moving, 210px (bar + 40px) | 128px |
| Links | `label` style, curve under the active page | hamburger, three static bars |

The logo is always the **sunset** variant (`public/branding/logo-sunset.svg`). The bar animates with transform and height only. Motion is switched off under `prefers-reduced-motion`.

### Mobile drawer

Full-height slide-out from the right, 280px wide, always mounted and moved with `transform` (no body scroll lock). Links are Forum 32px, burnt sienna, right-aligned with extra right padding, with a 103.68 x 4px curve under the current page. Escape closes it; focus moves in on open and back to the hamburger on close. Figma `mobile menu / drawer (open)` (399:121) and the `nav-mobile` component (401:313).

### Case study card (`CaseStudyCard.tsx`)

Image in a khaki 12px-radius box (4:3 on phones, staggered ratio from 768px). On hover or keyboard focus a sunset overlay with warm-white text fades in over the image.

### Tool card (`ToolCard.tsx`)

16px radius, khaki border, warm-white fill. Screenshot on top (220px phone, 250px desktop, anchored to the top edge), then a row with the status dot and label (ochre `label`) followed by the tags, a `heading-3` title (turns sunset on card hover), the summary, and buttons: **Launch** (primary), **Case study** (text), **Code** (text), each shown only when set.

### Homepage company highlight (`CompanyHighlight.tsx`)

Curve, then a tag and a 40px Forum headline, description paragraphs (a blank line starts a new paragraph), then the stat tiles: a 48px Forum number in sunset, a `label`, a 208px-tall image or looping video, a caption, and an optional button or outlined tag. Dots to the left of the section (`SectionDots.tsx`, Figma 357:167) mark which highlight is in view, from 1280px up.

### Image slot and looping video (`ui/ImageSlot.tsx`, `ui/LoopVideo.tsx`)

`ImageSlot` is the stat, tile and thumbnail frame: khaki background, shows a label when no image is set. If the image path ends in `.mp4` or `.webm` it plays as a silent loop, with `<name>-poster.jpg` as the poster. Videos play only while near the screen and have a pause button.

### Get in touch panel (`ContactSection.tsx`)

Sunset fill, warm-white text, up to 1200px wide, 20px (phone) or 24px (from 768px) corners. From 1024px up an illustration pops out of the top-left corner (107px above the panel) and the text column sits beside it. Below 1024px there is no illustration. Order: heading, copy, social links as icon over label (Email first, Substack hidden), copyright. Figma masters: `get in touch - samp` (392:277) and `get in touch / mobile` (416:197).

### Breadcrumbs, previous / next, related work

Breadcrumbs: 14px, warm gray, light gray separators, hover sunset. Previous / Next: two-column row under a khaki top border, `label` in sunset above a Forum 20 to 24px title. Related work: up to three cards ranked by shared tags, then recency.

### Back to top (`BackToTop.tsx`)

Appears after 400px of scroll. The primary button style, bottom-right (16px from edges on phones, 32px from 768px), about 30% smaller below 768px so it does not cover the copyright line.

### 404 (`not-found.tsx`)

"404" in Forum burnt sienna, curve, one line of copy, and two buttons (View my work, See my tools). Not yet drawn in Figma beyond the `404 / mobile` frame.

---

## Motion and accessibility

- Transitions use transform and opacity; layout properties are avoided.
- `prefers-reduced-motion` turns off the nav and drawer transitions and the CSS stat animations. Homepage clips still autoplay (decided 2026-10-11) but have a pause button.
- Interactive controls have `aria-label` or visible text; the drawer uses `inert` when closed; decorative art uses `aria-hidden` and empty alt text.
- A full keyboard, focus and contrast pass is still open in `PENDING.md`.

---

## Figma organization

```
Page: Resume + Website Rework (321:2)
├── design-system (321:3): colors, text styles, buttons, nav, nav-mobile, curve
├── homepage / hi-fi (357:13) and homepage / mobile (364:96)
├── case study / hi-fi (357:171) and case study / mobile (409:135)
├── works / hi-fi (359:48) and works / mobile (410:139)
├── tools / hi-fi (359:152), tools / mobile (411:145), tools hero (421:238)
├── 404 / mobile (411:331)
├── get in touch - samp (392:277) and get in touch / mobile (416:197): masters
├── mobile menu / drawer (open) (399:121)
├── social-preview (375:108): exported to public/og-image.png
├── logo component sets (346:343, 346:355, 346:370, 346:379)
└── case studies / desktop (all, from site content) (526:2): one frame per case study
```

Figma has no frames yet for the 404 page on desktop, Back to top, or the Relevant links buttons (open items in `PENDING.md`).

---

## Token quick reference

| Figma | CSS variable | Tailwind |
|---|---|---|
| `brand/burnt-sienna` | `--color-burnt-sienna` | `text-burnt-sienna` |
| `brand/sunset` | `--color-sunset` | `bg-sunset`, `text-sunset` |
| `brand/ochre` | `--color-ochre` | `text-ochre` |
| `brand/sunshine` | `--color-sunshine` | `bg-sunshine` |
| `neutrals/khaki` | `--color-khaki` | `bg-khaki`, `border-khaki` |
| `neutrals/warm-gray` | `--color-warm-gray` | `text-warm-gray` |
| `neutrals/dark-gray` | `--color-dark-gray` | `text-dark-gray` |
| `neutrals/light-gray` | `--color-light-gray` | `text-light-gray` |
| `neutrals/warm-white` | `--color-warm-white` | `bg-warm-white`, `text-warm-white` |
| `neutrals/cream` | `--color-cream` | `bg-cream` |
| `neutrals/forest` | `--color-forest` | `bg-forest` |
| `heading/1` to `heading/5` | none | `.heading-1` to `.heading-5` |
| `label` | none | `.label` |
