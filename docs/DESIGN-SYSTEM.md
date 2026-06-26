# Inginnyus Portfolio — Design System

Use this as the reference for building out the Figma board. Token names here match the code exactly — use the same names in Figma (as style/variable names) so design and code speak the same language.

---

## Naming Convention

Figma variables and styles should follow this pattern to stay in sync with the codebase:

```
Category/Name
```

Examples:
- `Color/Background`
- `Color/Accent Orange`
- `Font/Sans`
- `Spacing/16`
- `Radius/XL`

In code, these map to CSS variables like `--color-background`, Tailwind classes like `bg-background`, `text-accent-orange`, `rounded-xl`, `px-4` (16px), etc.

---

## Colors

Create these as **Figma Variables** (or Color Styles) with the exact names below.

| Figma Variable Name | Hex | CSS Variable | Tailwind Class | Usage |
|---------------------|-----|-------------|----------------|-------|
| `Color/Background` | `#FFFDF9` | `--color-background` | `bg-background` | Page background, overlays |
| `Color/Foreground` | `#333333` | `--color-foreground` | `text-foreground` | Headings, primary text |
| `Color/Accent Orange` | `#D26D1F` | `--color-accent-orange` | `text-accent-orange`, `bg-accent-orange` | CTA buttons, links, active nav, tags |
| `Color/Accent Yellow` | `#F3C041` | `--color-accent-yellow` | `text-accent-yellow` | Hover states (rare), email link in footer |
| `Color/Neutral Warm` | `#AFA29B` | `--color-neutral-warm` | `text-neutral-warm` | Muted text, borders, breadcrumbs |
| `Color/Neutral Dark` | `#5A5756` | `--color-neutral-dark` | `text-neutral-dark`, `bg-neutral-dark` | Body text, dark sections (contact, footer bg) |

### Opacity Variants Used

| Token | Value | Usage |
|-------|-------|-------|
| `Accent Orange / 10%` | `#D26D1F` at 10% | Tag pill backgrounds |
| `Accent Orange / 30%` | `#D26D1F` at 30% | Experience border-left |
| `Neutral Warm / 15%` | `#AFA29B` at 15% | Card tag backgrounds |
| `Neutral Warm / 20%` | `#AFA29B` at 20% | Header border, nav border |
| `Neutral Warm / 30%` | `#AFA29B` at 30% | Button borders, social link borders, pagination borders |

---

## Typography

**Font Family:** Google Sans Flex (variable font)  
**Figma:** Install "Google Sans Flex" or use Google Fonts plugin  
**Fallback Stack:** system-ui, sans-serif

### Type Scale

| Figma Style Name | Size | Weight | Line Height | Tailwind | Usage |
|-----------------|------|--------|-------------|----------|-------|
| `Heading/Hero` | 72px (4.5rem) | 700 | 1.1 | `text-7xl font-bold` | Home page heading (desktop) |
| `Heading/Hero Mobile` | 48px (3rem) | 700 | 1.1 | `text-5xl font-bold` | Home page heading (mobile) |
| `Heading/Page` | 36px (2.25rem) | 700 | 1.2 | `text-4xl font-bold` | Page titles (About, Works) |
| `Heading/Section` | 24px (1.5rem) | 600 | 1.3 | `text-2xl font-semibold` | Section headings (Experience, Tools) |
| `Heading/Card` | 18px (1.125rem) | 600 | 1.4 | `text-lg font-semibold` | Case study card titles |
| `Heading/Prose H2` | 28px (1.75rem) | 600 | 1.3 | Prose `.prose h2` | Case study body H2 |
| `Heading/Prose H3` | 20px (1.25rem) | 600 | 1.4 | Prose `.prose h3` | Case study body H3 |
| `Body/Large` | 18px (1.125rem) | 400 | 1.75 | `text-lg` | Bio text, subtitles |
| `Body/Default` | 16px (1rem) | 400 | 1.75 | `text-base` | Prose paragraphs, descriptions |
| `Body/Small` | 14px (0.875rem) | 500 | 1.5 | `text-sm font-medium` | Nav links, meta text, tags, buttons |
| `Body/XSmall` | 12px (0.75rem) | 500 | 1.5 | `text-xs font-medium` | Tag pills, card tags |

### Weight Reference

| Figma Weight | CSS | Tailwind |
|-------------|-----|----------|
| Regular | 400 | `font-normal` |
| Medium | 500 | `font-medium` |
| SemiBold | 600 | `font-semibold` |
| Bold | 700 | `font-bold` |

---

## Spacing

Based on Tailwind's default 4px grid. Use as Figma spacing variables or an Auto Layout reference.

| Figma Token | Value | Tailwind | Usage |
|-------------|-------|----------|-------|
| `Spacing/1` | 4px | `p-1`, `gap-1` | — |
| `Spacing/2` | 8px | `p-2`, `gap-2` | Tag pill padding, small gaps |
| `Spacing/3` | 12px | `p-3`, `gap-3` | — |
| `Spacing/4` | 16px | `p-4`, `gap-4`, `px-4` | Nav padding, button padding, card gaps |
| `Spacing/5` | 20px | `p-5`, `py-5` | Card content padding |
| `Spacing/6` | 24px | `p-6`, `px-6` | Page horizontal padding, nav py |
| `Spacing/8` | 32px | `p-8`, `gap-8` | Grid gaps, section spacing |
| `Spacing/10` | 40px | `p-10` | Contact section padding (mobile) |
| `Spacing/12` | 48px | `p-12` | — |
| `Spacing/16` | 64px | `p-16`, `py-16` | Contact section padding (desktop), page top/bottom |
| `Spacing/20` | 80px | `py-20` | Contact section vertical spacing |

---

## Border Radius

| Figma Token | Value | Tailwind | Usage |
|-------------|-------|----------|-------|
| `Radius/SM` | 4px | `rounded` | — |
| `Radius/MD` | 6px | `rounded-md` | — |
| `Radius/LG` | 8px | `rounded-lg` | Buttons, social links, filter pills, pagination |
| `Radius/XL` | 12px | `rounded-xl` | Cards, header images, case study images |
| `Radius/2XL` | 16px | `rounded-2xl` | Contact section card |
| `Radius/Full` | 9999px | `rounded-full` | Tag pills |

---

## Shadows

| Figma Token | Value | Tailwind | Usage |
|-------------|-------|----------|-------|
| `Shadow/SM` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` | Case study cards (default) |
| `Shadow/MD` | `0 4px 6px rgba(0,0,0,0.07)` | `shadow-md` | Case study cards (hover) |
| `Shadow/LG` | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` | Mobile nav dropdown |

---

## Layout / Containers

| Figma Frame Name | Max Width | Tailwind | Usage |
|-----------------|-----------|----------|-------|
| `Container/Content` | 896px | `max-w-4xl` | About page, case study detail, contact section |
| `Container/Wide` | 1152px | `max-w-6xl` | Works grid, nav |

### Grid

| Property | Value | Usage |
|----------|-------|-------|
| Columns (desktop) | 3 | Works page grid |
| Columns (tablet) | 2 | Works page grid |
| Columns (mobile) | 1 | Works page grid |
| Gap | 32px (`gap-8`) | Between grid cards |

### Breakpoints

| Name | Width | Tailwind Prefix |
|------|-------|----------------|
| Mobile | < 768px | Default (no prefix) |
| Tablet | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |

---

## Components

### Navigation Bar

| Property | Value |
|----------|-------|
| Height | ~64px (py-4 + content) |
| Background | `Color/Background` at 80% opacity + backdrop blur |
| Border bottom | 1px `Color/Neutral Warm` at 20% |
| Position | Sticky top |
| Logo/Name | `text-xl font-semibold` (will be replaced by SVG logo, 32px height) |
| Links | `Body/Small` (14px medium) |
| Active link | `Color/Accent Orange` |
| Inactive link | `Color/Neutral Dark` → hover `Color/Foreground` |
| Mobile hamburger | 3 lines, 24px wide, animates to X |
| Mobile menu | Solid `Color/Background`, `shadow-lg`, 14px text, compact dropdown |

### Case Study Card

| Property | Value |
|----------|-------|
| Border radius | `Radius/XL` (12px) |
| Background | White (#FFFFFF) |
| Shadow | `Shadow/SM` → `Shadow/MD` on hover |
| Image aspect ratio | 4:3 |
| Image fit | `object-cover` (center crop) |
| Image hover | Scale 1.05, 500ms transition |
| Content padding | 20px (`p-5`) |
| Title | `Heading/Card` (18px semibold) |
| Summary | `Body/Small` (14px), 2-line clamp |
| Tags | `Body/XSmall` (12px), `rounded-full`, `Neutral Warm/15%` bg |

### Case Study Header Image

| Property | Value |
|----------|-------|
| Aspect ratio | 16:9 |
| Recommended size | 1600 × 900px |
| Max rendered width | 896px (container) |
| Border radius | `Radius/XL` (12px) |
| Fit | `object-cover` (center crop) |

### Buttons — Primary

| Property | Value |
|----------|-------|
| Background | `Color/Accent Orange` |
| Text | `Color/Background` (white-ish) |
| Font | 16px medium |
| Padding | 12px 32px (`py-3 px-8`) |
| Border radius | `Radius/LG` (8px) |
| Hover | 90% opacity |

### Buttons — Secondary

| Property | Value |
|----------|-------|
| Background | Transparent |
| Border | 1px `Color/Neutral Warm` at 40% |
| Text | `Color/Foreground` |
| Font | 16px medium |
| Padding | 12px 32px (`py-3 px-8`) |
| Border radius | `Radius/LG` (8px) |
| Hover | Border + text → `Color/Accent Orange` |

### Filter Pills (Works Page)

| Property | Value |
|----------|-------|
| Inactive | 1px border `Neutral Warm/30%`, `Color/Neutral Dark` text |
| Active | `Color/Accent Orange` bg, `Color/Background` text, medium weight |
| Font | `Body/Small` (14px) |
| Padding | 8px 16px (`py-2 px-4`) |
| Border radius | `Radius/LG` (8px) |

### Contact Section

| Property | Value |
|----------|-------|
| Max width | 896px (`max-w-4xl`) |
| Background | `Color/Neutral Dark` |
| Border radius | `Radius/2XL` (16px) |
| Padding | 40px mobile, 64px desktop |
| Heading | 36px bold, `Color/Background` |
| Body | 18px, `Color/Neutral Warm` |
| CTA button | Primary button style, 18px text, larger padding (16px 32px) |

### Back to Top Button

| Property | Value |
|----------|-------|
| Background | `Color/Foreground` |
| Text | `Color/Background` |
| Font | `Body/Small` (14px medium) |
| Padding | 10px 16px |
| Border radius | 12px |
| Position | Fixed, bottom-right (32px from edges) |
| Hover | Background → `Color/Accent Orange` |
| Content | Up arrow SVG (16×16) + "Back to top" text |

### Breadcrumbs

| Property | Value |
|----------|-------|
| Font | `Body/Small` (14px) |
| Color | `Color/Neutral Warm` |
| Separator | " / " at 50% opacity |
| Current page | `Color/Foreground`, medium weight |
| Link hover | `Color/Accent Orange` |

### Footer

| Property | Value |
|----------|-------|
| Border top | 1px `Neutral Warm/20%` |
| Padding | 24px vertical (`py-6`) |
| Text | `Body/Small` (14px), `Color/Neutral Warm`, centered |

---

## Figma Organization Suggestion

```
Page 1: Design System
├── Frame: Colors (swatches with variable names)
├── Frame: Typography (type scale samples)
├── Frame: Spacing & Layout (grid, containers, breakpoints)
├── Frame: Components
│   ├── Navigation (desktop + mobile)
│   ├── Case Study Card (default + hover)
│   ├── Buttons (primary + secondary + filter pills)
│   ├── Contact Section
│   ├── Back to Top
│   ├── Breadcrumbs
│   └── Footer
└── Frame: Image Specs (aspect ratios, sizes, radius)
```

---

## Token Name Mapping Quick Reference

| Figma | Code (CSS Variable) | Tailwind Class |
|-------|---------------------|----------------|
| Color/Background | `--color-background` | `bg-background` |
| Color/Foreground | `--color-foreground` | `text-foreground` |
| Color/Accent Orange | `--color-accent-orange` | `bg-accent-orange`, `text-accent-orange` |
| Color/Accent Yellow | `--color-accent-yellow` | `text-accent-yellow` |
| Color/Neutral Warm | `--color-neutral-warm` | `text-neutral-warm` |
| Color/Neutral Dark | `--color-neutral-dark` | `bg-neutral-dark`, `text-neutral-dark` |
| Radius/LG | `border-radius: 8px` | `rounded-lg` |
| Radius/XL | `border-radius: 12px` | `rounded-xl` |
| Radius/2XL | `border-radius: 16px` | `rounded-2xl` |
| Spacing/6 | `24px` | `px-6`, `p-6` |
| Spacing/8 | `32px` | `gap-8`, `p-8` |
| Container/Content | `max-width: 896px` | `max-w-4xl` |
| Container/Wide | `max-width: 1152px` | `max-w-6xl` |
