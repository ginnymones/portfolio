# Changelog

All notable changes to this project are documented here.

---

## [2026-10-15] — Faster Joiiio page and lazy-loaded images

### Changed
- Site title and description (browser tab, search results and link previews): the title is now "Ginny Mones - Creative Direction, UX/UI Design, Team Management" and the description "A creative leader with 16+ years of experience. Explore case studies in UX/UI, branding and product design, plus the tools I've built." (`src/app/layout.tsx`). Previously "Creative Problem Solver" and a placeholder description.
- Homepage videos (Elevation x2, TBWA\SMP) now show a still poster frame until they start playing (`public/videos/*-poster.jpg`, `LoopVideo.tsx`, `ImageSlot.tsx`). Before, a blank khaki box showed whenever autoplay was slow or blocked (for example iPhone Low Power Mode or data saver).
- Anim (Joiiio): the 36 MB "How can my top be replaced?" GIF in the gallery is replaced by a silent looping WebM (`anim-joiiio-howcanmytop.webm`, 0.8 MB, 1080x1080, 8.7 s). It only downloads when it nears the screen and has the same pause button as the homepage videos. The GIF file is still in the repo.
- Galleries (`:::bento`) can now hold a `.mp4` or `.webm`, which plays as a lazy silent loop (`BentoGallery.tsx`). Bento blocks are now found before video images are converted, so a video in a gallery is no longer mistaken for a plain video.
- Anim (Joiiio): the main video is now `anim-joiiio-general.webm` (2.7 MB, 1200x628, 27 s, with sound) instead of the 22 MB MP4. The page lists the MP4 as a fallback source for browsers that can't play WebM; it is only downloaded if the WebM fails. The existing `-thumb.png` poster is still used.
- Image weight: ten large JPEGs were re-exported as progressive JPEGs at the same dimensions, about 18 MB down to 3 MB with no visible change (100 Days of UI headers and mobile shots, the Landing Page full-page capture, and the Chansey header). File names are unchanged. `amz-mandogrogu.jpg` (139 KB) was added next to the original 2.6 MB PNG, which is kept; nothing uses either yet.
- Every image in rendered case study text now loads lazily (`loading="lazy"`, `decoding="async"`). The case study header image loads right away (`priority`), as do the logo and homepage portrait; all other images load as they near the screen.

---

## [2026-10-14] — Homepage Amazon stats and case studies re-synced from Figma

### Added
- Amazon section, new stat "100+ orders within 3 hours of launch" with the Amazon Kids Tablets carrying case image (`public/images/home/amazon/tablet-case.jpg`) and a "View product page" button linking to the Amazon listing. It replaces the "53% faster than industry standard" stat, which is gone from the Figma frame.
- Case study `amazon-slack-automation` now has its real content from Figma: Challenge (numbered list and bullets), Action (full-width form image with caption, beside-text Slack message image), the three Results stats and Results bullets. Still a draft: the header and thumbnail are template placeholders in Figma too.

### Changed
- Homepage Amazon: description is now two paragraphs (the interview-loop line sits in its own paragraph, as in Figma) and mentions Q1 2026; the Workbench stat caption reads "...through agentic coding, contributing to ~20% more volumes approved within one week."; its tag reads "Details Confidential". `CompanyHighlight.tsx` renders a blank line in a description as a new paragraph.
- Case study titles now follow the Figma hero headings (this also changes the breadcrumb, Works card, tab title and related links): Rebrand "The Ginny Mones 2026 Rebrand, Part 1", MHW:PH, Collection Tracker "Pokémon Card Collection Tracker", Starter Pack, Mega CP "Mega Evolution Combat Power (CP) Calculator", Quiz Randomizer, Resume Lab, Workload Tracker, Chansey "Pokemon Sketches", Email Design System. The `[DEV]`, `[BRAND]` and `[ILLUS]` prefixes are gone from these.
- Quiz Randomizer and Resume Lab bullets are regular weight (no bold lead-ins), as in Figma.
- Anim case study rewritten from the Figma frame: new title "JOIIIO parts replacement video demonstration", client Joiiio, a Challenge and Action write-up, a new still of the vector jeep (`anim-joiiio-howcanmytop-still.png`), the intro-ad video and a two-image gallery. The Tender Bites GIFs were removed from the page (files kept). Header and thumbnail now point at the existing `.png`; the old `.jpg` path was broken.
- Chansey Sketches shows "2025" as in Figma, and the intro line "Some Chansey sketches that I've done over the years." was removed because the Figma frame no longer has it. An Action made only of images and galleries now shows no "Action" heading (`works/[slug]/page.tsx`), as in the Figma frame.
- Anim case study renamed from `anim-motion-graphics` to `anim-joiiio` (URL `/works/anim-joiiio`; the Figma frame is renamed too). Image file names keep the old prefix.
- Homepage company descriptions now run the full column width (1000px) as in Figma; they were capped at 720px (`CompanyHighlight.tsx`).
- Homepage: TBWA\SMP livestream caption now reads "Handled camerawork for the livestream coverage and ..." (Figma edit). The "I also make other stuff" tiles now have images: Works uses the 100 Days of UI Checkout header (added in Figma), Tools uses the Mega CP Calculator screenshot (`home.json` `otherTiles`).
- Amazon Slack case study: the header and card image are now the Slack time-request form (the image set in Figma, `amz_meter01.jpg`); before, both pointed at a missing placeholder file, so no header showed on desktop or mobile.
- Anim: the "Given this, I knew what I had to work on first" image is now the cropped jeep as in the Figma frame (`anim-joiiio-howcanmytop-still.png`, exported from the frame at 2x). The video uses its `anim-joiiio-general-thumb.png` poster, which was replaced with the new thumbnail.
- Figma (homepage desktop and mobile): typos fixed ("Procter & Gamble", "journey."), Tools preview now shows the Mega CP Calculator image, and the mobile Works and Tools tiles show their images too.
- Tool cards and case study "Live App" links for Mega CP Calculator, Quiz Randomizer and Resume Lab point at `ginnymones.com/tools/<tool>` (proxied in `next.config.ts`); Workload Tracker points at the demo workspace `/w/demo`.

### Notes
- Social Nissan is set to `status: "draft"` (hidden in production) while Ginny finishes it; its Figma Challenge is an unfinished sentence ("While Nissan began their") and was not applied. The `social-alaska` frame has no content file, and neither frame was touched.
- Figma: the Email Design System card in the Tools frames (desktop 359:152, mobile 411:145) now matches the site (new title and summary, Beta status, Launch button), the Works card title reads "Email Design System — Figma Plugin", and the breadcrumb in 17 case study frames now reads the hero heading (Nissan and Alaska left alone).

---

## [2026-10-13] — Email Design System: guide, demo zip and case study update

### Added
- How-to guide for the rebuilt plugin, a standalone page at `/guides/email-design-system.html` (`public/guides/`). Portfolio cream and orange, Forum and Google Sans Flex, light by default with a Dark mode toggle, install steps for the zip demo, troubleshooting.
- Demo download `public/downloads/Email-Design-System-demo.zip` (manifest, built plugin, read-me), linked from install step one of the guide.
- Case study `dev-figma-to-email-builder`: addendum at the bottom, "Update: Rebuilt as the Email Design System (October 2026)", with what changed, module thumbnails, restyle and a link to the guide and zip. Three new images `public/images/case-studies/figma-to-email-builder-v2-*.png`. Original STAR text and results untouched.

### Changed
- Content synced from the Figma case study frames (Figma is the source of truth), 2026-10-14: Amazon Slack (title, summary, client, Action text), Anim (title), Social Nissan (title), Rebrand (tech stack as five paragraphs), MHW:PH (new Action paragraphs, new Results with three stats), Collection Tracker (task paragraph moved from Challenge to the start of Action, Results wording, new block order), Starter Pack (Challenge wording, "Key considerations" line, closing paragraph, four Results lines), Mega CP Calculator (task paragraphs moved from Challenge to the start of Action, third stat 148 and a fifth Results line), Quiz Randomizer, Resume Style Tool and Workload Tracker (the "Key Design Decisions" heading is gone, as in Figma).
- Email Design System case study now uses the images from its Figma frame: `figma-to-email-builder-hero.jpg` (header and Works card thumbnail), `-a1.jpg`, `-a2.jpg`, `-a3.jpg` (checked byte-for-byte against the Figma fills). It was still pointing at the old plugin screenshots.
- Results on Quiz Randomizer, Resume Style Tool and Workload Tracker are now bullet lists, as in Figma.
- Lists in case study Action text (bullets and numbered lists) now show their markers on desktop and mobile; Tailwind's reset had removed them (`globals.css`). Challenge and Results lists already did. Leftover icon circles deleted from the MHW:PH, Email Design System and Starter Pack frames in Figma.
- Case study Results stats no longer show the khaki placeholder circle when a stat has no icon (the Figma frames have no icon circles any more). A stat with an icon image still shows it (`works/[slug]/page.tsx`). Icon circles also removed from the desktop and mobile case study templates in Figma.
- Font weight and text re-synced from Figma (2026-10-14): SemiBold lead-ins mirrored as bold on Collection Tracker; em dashes in the Collection Tracker and Starter Pack bullets; Results lines on Quiz Randomizer, Resume Style Tool and Workload Tracker lose their trailing periods; hidden Figma layers (MHW:PH third stat, Collection Tracker Results, Starter Pack stat) removed from the content.
- Rebrand images updated from the Figma frame: `branding-ginny-group.png`, `branding-ginny-tinacms.png`, `branding-ginny-details.png` and the header `branding-ginny-header.jpg` (card thumbnail too) were replaced with exports of the Figma images (2x). All other case study images were checked byte-for-byte against the Figma fills and already match.
- Challenge and Results text now support lists: a block whose lines all start with `- ` renders as a bullet list, and one that starts with `1. `, `2. ` as a numbered list (`works/[slug]/page.tsx`). Applied where Figma uses list formatting: Mega CP Challenge bullets, Amazon Slack numbered items, Results lists on Rebrand, MHW:PH, Collection Tracker, Starter Pack, Mega CP and Email Design System, and the Rebrand tech stack bullets.
- Action text: consecutive image lines (no blank line between) form an image stack, one column of images beside the text, each caption from its alt text. Used on Mega CP Calculator to match Figma (`action-blocks.ts`, `ActionSection.tsx`).
- Case study `dev-figma-to-email-builder` is replaced by `dev-email-design-system` (file renamed, content rewritten from the new Figma frame: new Challenge, Action, Results and stats 13 / 7 / 8). The tool card is now titled "Email Design System" (summary trimmed) and links to `dev-email-design-system` and the guide. The old case study (original write-up) is parked in `_to_delete/dev-figma-to-email-builder.md`. The how-to guide and demo zip links moved to Relevant links. The old "Update" sections and their v2 images are no longer used by the page (image files still in `public/images/case-studies/`).
- Action text: a `+++` line after a full-width image keeps the text that follows in the same block, under the caption (`action-blocks.ts`, `ActionSection.tsx`). Used for the closing line on 100 Days Sign Up, matching Figma.
- Case study layout aligned with the Figma frames: heading-to-text gap in Action blocks is now 20px (was 12), Challenge paragraph gap 20px (was 16). Block order fixed on 100 Days Checkout, Sign Up and User Profile, and on Workload Tracker (two images shared one paragraph, so its Key Design Decisions row and the recurring-templates image did not render as in Figma).
- Case study structure is now **Challenge, Action, Results** (was STAR). "Situation" is renamed Challenge and any Task text is folded into the end of the Challenge, in the Figma frames (all 20 desktop frames, the `case study / hi-fi` template and the mobile case study frame) and in the content: `situation` and `task` frontmatter fields are gone, replaced by `challenge` in 11 case studies plus `_template.md`. Page code (`works/[slug]/page.tsx`), loader (`case-studies.ts`), Tina schema (`tina/config.ts`) and docs updated. Challenge and Results still hide when empty.
- Case study Action text: a `***` line now ends an image + text row so the following paragraphs run full width (`src/lib/action-blocks.ts`). Used on 100 Days of UI Landing Page to match Figma: header image beside the first three paragraphs, the next two full width, then the mobile and full desktop images.
- 100 Days of UI case studies (all six): passive and third-person phrasing rewritten to first person, active voice. Wording only, no change to the message. Mirrored in the Figma desktop frames (section 526:2). The six `.md` files were then re-synced from the Figma frames: each now has `challenge` and `task` as separate sections, Action text and image captions match Figma, and typos were fixed.
- Email Design System guide footer: "Created by Ginny Mones" now links to https://ginnymones.com.
- Tool card "Figma to HTML Email Builder" (`src/content/tools/figma-to-email-builder.md`): status Beta, new thumbnail `public/images/tools/email-design-system.png`, summary updated, "Launch" now opens the guide. Title, case study link and date unchanged.

### Notes
- A draft of a separate "Email Design System" tool card is parked in `_to_delete/` (not part of the site).
- The guide is a static file with its images embedded. To update it, replace the file and the zip together.

---

## [2026-10-12] — Case studies moved into STAR

### Changed
- 100 Days of UI studies (all six) now use a single **Challenge** section instead of Situation + Task, following Ginny's rework of the app-icon frame in Figma. New `challenge` field (`case-studies.ts`, `works/[slug]/page.tsx`, `tina/config.ts`); the old Task text is merged into Challenge in the five studies that had one, wording unchanged. App Icon Challenge and Action text now match her Figma wording. The Figma frames for the other five were updated the same way (Task frame hidden, as on app-icon). Action is unchanged.
- `role` (and `years` where it is a range) added to every case study from the Figma hero meta: 100 Days of UI = UX/UI Designer, Amazon Slack = Production Manager, Project Owner, Joiiio animations = Art Director, Rebrand = Art Director, Copywriter, Developer, MHW:PH = Art Director, Copywriter, the dev tools = Product Designer, Developer, Chansey = Illustrator, Nissan = Art Director.

### Added
- Amazon "53% Reduction in unaccounted time" stat: "Read Case Study" button linking to `/works/amazon-slack-automation` (`home.json`). The study is still `status: draft`, so the link only works locally until it is published.

### Added
- Figma only: all 19 case studies recreated at desktop width (section `case studies / desktop (all, from site content)`, node 526:2 in the 2026 Resume file). No code change.

### Changed
- Case study Action images now always sit on the LEFT with the text on the right (was alternating, then briefly right). Every stand-alone image in a block pairs with its neighbouring text, so write-ups with several images and no `###` headings (Rebrand, 100 Days of UI) get the same layout instead of inline images. On phones the image comes first. `ActionSection.tsx`, `docs/CASE-STUDY-STRUCTURE.md` and `_template.md` updated. The Figma case study frame (357:171) may still show the alternating layout.
- 15 case studies (100 Days of UI x six, Pokémon Collection Tracker, Vibe Coding Starter Pack, Figma to Email Builder, Mega CP Calculator, Quiz Randomizer, Resume Lab, Workload Tracker, Ginny Mones 2026 Rebrand, MHW:PH) re-sorted from Problem / Solution / Results into `situation`, `task`, Action (body) and `resultsStats` / `resultsCopy`. Wording is Ginny's own, only moved. Tasks are only filled where the write-up already had a goal or brief sentence; Results tiles only use numbers already in the write-up.
- Landing Page study: RingConn link moved to a "Original RingConn Gen 2 page" link button, since Situation/Task text is plain.
- Calculator study: removed a stray pasted fragment ("lutions are often the most simple ones...") from the end of the Solution.
- `_template.md` and `amazon-slack-automation.md`: multi-paragraph STAR fields now use `|-` blocks. A blank line inside a quoted YAML string does not start a new paragraph.
- Originals backed up in `V2 Assets/backups/case-studies-2026-10-12/` (local only).

---

## [2026-10-11] — Homepage buttons, links and Figma edits

### Added
- Optional button under each company stat (`buttonLabel`, `buttonLink`; TinaCMS: Pages > Home > Company Highlights > Stats). With a link it is the primary button and opens in a new tab; without a link it is a static outlined tag (used for "Confidential").
- Links: Elevation "View Live site" (coffeebean.com.ph, jewelmer.com); TBWA\SMP "View Live work" (Oishi livestream video, engagement post). Amazon "Confidential" tags on the 53% faster and ~20% stats.
- TBWA\SMP engagement image `public/images/home/tbwa/engagement.jpg` (from the Figma frame).

### Changed
- Copy synced from Figma 357:13: Amazon "Higher approval rate" and Workbench caption, Elevation "Cart conversions month-on-month" and caption, TBWA\SMP livestream caption, "100+ Comments and shares in 24 hours", "I also make other stuff" text.
- Stat grid reserves a fifth row so buttons line up across columns.
- Phones: buttons stack under the caption in the single-column layout (same content as desktop).

### Removed
- MediaCom section (removed from the Figma homepage). Still in the `staging` commit if it comes back.

### Notes
- Amazon "Read Case Study" button (53% reduction in unaccounted time) is in Figma but its link is still to follow, so it is not shown yet. Add `Read case study` + link to that stat in the CMS or `home.json` when ready.
- Figma mobile frame 364:96 is out of date (old copy, Amazon only, no buttons); the site itself is one responsive layout.

---

## [2026-10-11] — Homepage synced from Figma, real videos in stat slots

### Added
- Stat images can be a `.mp4` or `.webm`: it autoplays as a silent loop that only loads and plays when scrolled near (`LoopVideo`, used by `ImageSlot`), including with reduced motion on, with a small pause/play button. Pick the file in the existing Image field, no schema change.
- Videos in `public/videos/`: `amz_armani.mp4` (Amazon, faster than industry standard), `elev_grewportfolio.mp4` and `elev_addtocart.mp4` (Elevation).
- Amazon stat images `public/images/home/amazon/unaccounted-time.jpg` and `workbench.jpg`.

### Changed
- Copy re-synced from Figma 357:13: Amazon and Elevation titles and descriptions, new first Amazon stat (53% reduction in unaccounted time), Elevation caption, TBWA\SMP description (70% budget shift), "snapshot" intro line.
- TBWA\SMP and MediaCom now show two stats each (the third was removed in Figma).
- Elevation stats use the videos instead of the CSS animation.

### Notes
- `MotionImageSlot`, `src/lib/stat-motion.ts` and the Tina "Animation" field are now unused and can be removed.
- Figma numbers (3310.60 minutes, 10% uplift, 70% shift) verified by Ginny, 2026-10-11.

---

## [2026-10-11] — Elevation stat images animated

### Added
- Animated image stacks for two Elevation stats (Figma `elev_grewportfolio` 486:174, 12s boomerang; `elev_addtocart` 493:831, 7s loop). Screenshots fade out in turn, opacity only, and stay still for visitors who prefer reduced motion.
- `Animation` field on each company stat in TinaCMS (Pages > Home > Company Highlights > Stats). Presets live in `src/lib/stat-motion.ts`.

### Changed
- Elevation now shows two stats (500% more agency revenue, +5% cart conversions) instead of three; "30+ Websites delivered and managed" was removed. A company with exactly two stats lays them out in two columns (max 1000px), matching the 482px Figma frames; everyone else stays at three.

### Notes
- New frames are in `public/images/home/elevation/` (JPEG, 1400px max).
- The animation is a CSS stand-in. Ginny plans to export it from Figma as a single file and load it into the layout, which would replace `MotionImageSlot` and `src/lib/stat-motion.ts`.
- Not yet checked playing in a browser (headless screenshots don't advance CSS animations). Alt text on both stats is a draft.

## [2026-10-09] — Homepage copy synced from Figma, company highlights stay standalone

### Added
- A fourth company highlight, MediaCom (Figma 439:271), and a short line above the highlights: "Below is a snapshot of my career journey so far." The line is editable in TinaCMS (Pages > Home > Company Highlights Intro Line).

### Changed
- Hero heading now ends with "!", the subtitle with a period, and the intro paragraph lists Procter & Gamble, Diageo, Jollibee Foods Corporation, The Coffee Bean and Tea Leaf, and Jewelmer. Amazon headline and description, and the Elevation "Websites delivered and managed" label, match the updated Figma.
- Company highlights (Amazon, Elevation, TBWA\SMP, MediaCom) will not get case studies. The Case Study Slug field stays optional and stays empty.

### Notes
- MediaCom stat captions are still the TBWA\SMP placeholder text from Figma; they need rewriting.

## [2026-10-09] — Smaller Back to top button on phones

### Changed
- Below 768px the Back to top button is about 30% smaller (13px label, 11px arrow, tighter padding, 16px from the edges) so it no longer covers the copyright line at the bottom of the page. Desktop is unchanged.

## [2026-10-08] — In progress dot and old domain redirect

### Changed
- "In progress" tool status dot is now sunset (was light gray).
- `inginnyus.vercel.app` requests redirect permanently (308) to `https://ginnymones.com`, keeping path and query. Only takes effect once this branch is deployed and ginnymones.com points at the deployment.

## [2026-10-08] — Max container width 1200px, Get in touch spacing

### Changed
- Wide containers (Get in touch panel, Works grid, related-work row) cap at 1200px; the nav bar caps at 1200px too (was 1440px) and drops its side padding from 1360px wide so the logo lines up with the content. The 1000px reading containers are unchanged.
- Get in touch: the illustration overhangs the panel by 43px from 1340px wide (24px below). The text column starts at the art's right edge and is centered in the 496px beside it, so the gap to the art is the same at every width (it grew at 1024-1339px before).

## [2026-10-08] — Tools page hero illustration

### Added
- Tools hero from Figma (421:238) at 1024px and wider: 400px portrait with the head popping out of a 30% burnt-sienna circle, heading and subtitle beside it (`public/images/tools/tools-hero-art.png`).

### Changed
- Below 1024px the tools intro stays as in the mobile frame (heading, curve, subtitle, no illustration).

## [2026-10-08] — Get in touch panel: icon + label socials

### Changed
- Contact panel follows Figma "get in touch / mobile" (416:197): the large email line is gone; Email is now the first social item, and each item is an icon over a small semibold label (no outlined circles). Applied to all breakpoints, with slightly larger icons/labels and wider gaps from 768px.
- LinkedIn uses the boxed mark; items hover to sunshine.

### Notes
- Substack is left out of the panel (it isn't in the Figma frame) but stays in Site Settings and the other social link lists.

## [2026-10-07] — V2 revamp: tokens, fonts and contact email (staging branch `v2-revamp`, not live)

### Added
- New V2 color palette (13 tokens) and Forum heading font in `src/app/globals.css`
- Heading styles (`.heading-1` to `.heading-5`) and `.label` style from the Figma text styles

### Changed
- Nav rebuilt to the Figma spec: gradient logo, Works / Tools / Contact, hand-drawn curve under the active page. About removed from the nav
- Contact panel rebuilt as a sunset panel with Forum heading, circled social badges (LinkedIn, Behance, Dribbble, Substack) and the copyright line inside it
- Page background is now cream; old orange, yellow and neutral tokens point at their V2 equivalents
- Body text is 16px, 150% line height, 3% letter spacing; headings use Forum and never fake a bold
- Contact email is now hola@ginnymones.com (site settings and contact page)

### Home page (rebuilt to Figma 357:13 / mobile draft 364:96)
- Hero with an illustration slot (khaki placeholder circle), intro, "View my work" button
- Company highlights (Amazon, Elevation, TBWA\\SMP) with stats, image slots and a section-dots indicator; the "Read case study" button only appears once a case study slug is set and the file exists
- "I also make other stuff" section with Works and Tools tiles
- All copy lives in `src/content/pages/home.json` and is editable in TinaCMS (new fields on the Pages collection: portrait, heroBody, companyProjects, otherHeading, otherText, otherTiles). Copy and stats are the Figma placeholders and still need Ginny's rewrite
- New shared `ui/ImageSlot`, `SectionDots`, `CompanyHighlight`

### Case study template (STAR, Figma 357:171)
- New layout: hero (image, tag, title, summary, curve, Client / Role / Years), then Situation, Task, Action and Results. Sections with no content are hidden
- Action is the case study body. A `###` heading starts a block; an image inside a block sits beside its text and alternates sides; a lone image runs full width with its alt text as the caption
- Existing write-ups were not edited: their whole body shows under Action (Situation, Task and Results stay empty until filled in)
- New optional CMS fields on Case Studies: role, years, situation, task, resultsStats (number, label, icon), resultsCopy, homepageOnly. The body field is relabelled "Action"
- `homepageOnly` hides a case study from the Works listing, related and prev/next; it stays reachable by URL and from the home page
- Mobile layout is a proposal (stacked); Figma has no case study mobile frame yet
- Breadcrumbs, Previous / Next and Related work are kept (they are not in the Figma frame, by Ginny's decision), restyled to V2 tokens. Relevant Links are kept too
- Structure documented in `docs/CASE-STUDY-STRUCTURE.md`; `README.md` and `docs/PROJECT-SPEC.md` updated
- `_template.md` rewritten for the STAR structure

### Works page (Figma 359:48)
- Gallery column gap is 30px (Figma has 24px; widened at Ginny's request because the columns looked squished)
- Intro (Forum heading, curve, subtitle), pill filter chips (active chip filled sunset) and a three-column staggered gallery. Items are dealt round-robin across the columns so newest-first reads across; cover heights follow the Figma pattern (tall / short / medium, then short / tall / medium). Two columns on tablet, one on phone (4:3 covers)
- Tile hover/focus: cover fills with sunset showing the summary and "View case study →", and the title turns sunset. Touch devices tap straight through
- "Load more" (text button) replaces 1 / 2 / 3 paging: 6 at a time, resets when the filter changes. The `?tag=` deep link still works
- `CaseStudyCard` rebuilt for the new tile and also used by Related work
- Contact panel is now full width (it had shrunk to its content inside the flex layout)

### Tools page (Figma 359:152)
- Intro (Forum "Tools I've built", curve, subtitle) and a two-column card grid, 32px apart. The old hero character is gone
- Cards: app preview on top (anchored to the top of the screenshot), status dot + label, tag pills, Forum title, summary, then "Launch" (primary button) and "Case study" (text button). "Code" shows as a text button when a repo URL is set. Cards in a row share a height
- Status dots: Live is deep yellow (Figma); Beta (sunset) and In progress (light gray) are proposals
- Phone layout is a proposal: single column, shorter preview
- Heading in `src/content/pages/tools.json` is now "Tools I've built" with no accent word
- Figma Works gallery gap set to 30px (columns 377.33px) to match the site

### Get in touch panel redesign (Figma "get in touch - samp", 392:277)
- The contact panel now has the new illustration popping out of its top-left corner (107px above, 63px past the left edge), with the text column shifted right to make room. Art is `public/images/get-in-touch-art.png`, cropped at 2x from the Figma source
- Below 1024px the panel has no illustration (the Figma mobile draft has none); the section also clips sideways overflow so the art can't cause horizontal scroll

### Hero illustration (Figma 367:104)
- The homepage hero now shows the line-art portrait (`public/images/hero-portrait.png`, exported at 2x from the Figma `headshot` group): a peach circle with the head popping out of the top. It is set in `home.json`, so it can be swapped in TinaCMS; with no image, the khaki placeholder circle returns
- Sizing follows Figma: 400px circle on desktop (the artwork hangs 22px past the left and 48px above the circle box), 300px on tablet, 220px on phones
- The header no longer paints a cream background over the page, which had been covering the top of the head where it rises above the circle
- On the Get in touch panel the illustration's left overhang shrinks to the page gutter below 1340px wide, so the art is never cut off by the screen edge
- Illustration placement is still open for the rest of the site; the Get in touch panel already uses its own artwork

### Round of 2026-10-08 decisions
- **Nav shrinks after scrolling**: the bar is now fixed (not sticky) so it can change size without moving the page. Full: 170px on desktop with the 70px logo. After scrolling more than 60px: 70px with the logo scaled to about 44px, and a light drop shadow under the bar (no line). Phone: 88px, then 64px with the logo at about 36px. A fixed spacer (full bar height + 40px) keeps the first content block from sitting too close
- **Smoother shrink**: the logo scales with `transform` (no reflow) and the bar's height is the only layout change, on a 300ms ease-out curve; the shadow fades in on the same timing
- **Sunset logo everywhere in the nav**: `public/branding/logo-sunset.svg` (exported from the Figma `logo` set, 100 / sunset, solid #CF5925) replaces the gradient logo, which looked messy when small
- **Drawer links are right-aligned**, with 16px more right padding so the curves keep 28px from the edge; the curve stays centred under each word (103.68 x 4, 2px)
- **Back to top** now uses the sans-serif solid (primary) button style from the Figma design system (sunshine, sunset on hover)
- **Tool status dots**: Live uses the new `forest` colour, Beta uses sunshine, In progress stays light gray
- **About page redirect**: `/about` now redirects (permanently) to the "Hi, I'm Ginny" intro on the homepage (`/#intro`)
- **Contact panel copy** is "Get in touch" / "Have a brand, a product, or a team that needs a creative lead? Say hola." Edit it in TinaCMS under Pages → Contact (heading and subtitle); the email and social badges come from Site Settings
- The "get in touch - samp" master layer stays on the Figma board

### Figma mobile frames (2026-10-08, no site changes)
- Drew `case study / mobile`, `works / mobile`, `tools / mobile` and `404 / mobile` (390px, header + 40px spacer, content, mobile Get in touch panel), in a row next to the mobile menu frames. They document the phone layouts the site already uses
- The mobile homepage frame now has the new hero order and copy and the new `get in touch / mobile` panel (358px, 20px corners, social badges, no illustration)
- Logo instances on the Figma page are switched to the sunset variant

### Sticky nav and the new mobile menu (earlier today; the nav is now fixed and shrinks, see above)
- The nav is sticky (cream background, stays at the top while scrolling). A 40px spacer below it keeps the first block of every page from sitting too close; the spacer scrolls away, so the stuck bar is not 40px taller
- Mobile menu is now a full-height slide-out drawer from the right (Figma `mobile menu / drawer (open)`, 399:121): 280px wide over a dimmed scrim, Forum 32px links in burnt sienna, right-aligned, X where the hamburger is. It replaces the 200px card, which jittered on open
- No more jitter: the drawer is always in the page and moves with transform/opacity only (300ms), the page is not scroll-locked, and the hamburger no longer morphs. Measured in a 390px frame: header height, content position, scroll position and page width were identical before, during and after opening
- Tapping the scrim or the X, pressing Escape, or following a link closes it. Focus moves into the drawer on open and back to the hamburger on close. Reduced-motion users get no slide
- Drawer links use the Figma `nav-mobile` component (401:313): Forum 32px, 200px-wide boxes with centred text, and the curve (103.68 x 4, 2px stroke, 8px under the text) on the current page and on hover/focus. The Figma drawer frame now uses the same component
- The earlier "Mobile menu design is parked" notes are superseded

### Domain, social preview and Back to top
- Site URL is now https://ginnymones.com in the page metadata (`metadataBase`, Open Graph URL) and `next-sitemap.config.js`. The favicon is unchanged
- Social preview (`public/og-image.png`, 1200x630) replaced with the Figma `social-preview` frame (375:108); added alt text
- "Back to top" restyled as a sunshine pill (sunset on hover and focus) in the label style; it is not in Figma

### Responsive pass
- Home: the hero stacks below 1024px (illustration 300px on tablet), and the three stat rows share row heights at tablet width (CSS subgrid), so images line up when labels wrap
- Case study: the hero stacks below 1024px; it used to overflow sideways at tablet width
- 404 page rebuilt with V2 buttons and the curve; the old character is removed
- Checked at 390, 768 and 1440 wide: home, works, tools, a case study, the 404 page and the open mobile menu

### Fixes
- Nav curve is a constant 2px stroke in the active and hover states (it was being squashed to about 1px by the non-uniform scaling; briefly 3px). Nav links now show the same curve on hover and keyboard focus as in the active state. `Curve` takes an optional `strokeWidth`; section curves keep the exported 1px stroke

### Removed
- Old home hero (`HeroContent`), the corner mini character and the numbered Works pagination
- About page (`/about`) and its links; the 404 page and home secondary button now point to Tools
- Old footer bar (the copyright now lives in the contact panel)

### Notes
- New shared components: `Curve`, `ui/Button` (primary / secondary / text), `ui/Tag`
- Old styling archived at `~/Coding Projects/portfolio-V1-archive` and git tag `v1-pre-revamp`
- Old token names are temporary aliases and will be removed as components move to the new names

---

## [2026-09-24] — Ginny Mones 2026 Rebrand case study

### Added
- **Case study** for the 2026 rebrand itself — branding, illustration, and the portfolio site build (Next.js/TinaCMS/Vercel), linked from Behance-style "Relevant Links" to the live portfolio site

---

## [2026-09-23] — Substack added to socials

### Added
- Substack link added to footer social links (`src/content/site-settings.json`)

---

## [2026-09-23] — Tools sorted newest-first

### Changed
- `/tools` now sorts strictly newest-first by date, matching `/works`. It previously pinned `featured` tools to the top regardless of date, which had been quietly keeping Pokémon Collection Tracker at #1 — it now sits in date order with everything else

---

## [2026-09-23] — Case study copy edits

### Changed
- Quiz Randomizer: rewrote the Problem Statement as a dialogue with my sister, and the "Google Sheet is the CMS" design decision to explain the reasoning in more detail
- Resume Lab: spelled out "9"/"5" as "nine"/"five" throughout for consistency
- Mega CP Calculator: minor wording tweak to the League CP Cap Planner bullet

---

## [2026-09-23] — Quiz Randomizer and Resume Lab case studies

### Added
- **Case studies** for Quiz Randomizer and Resume Lab, linked from their Tools cards. Both were previously placeholder files (copy-pasted from the Collection Tracker case study, including its Firebase/PIN-auth content) — now written from scratch to actually describe each project

---

## [2026-09-23] — Mega CP Calculator case study

### Added
- **Case study** for the Mega Evolution CP Calculator, linked from its Tools card
- Removed the Mega CP Calculator's "Code" link — the linked repo is private, so the link never actually worked for visitors

---

## [2026-09-22] — Tools page polish and two new entries

### Added
- **Resume Lab** and **Quiz Randomizer** added to `/tools`. Quiz Randomizer links to a separate demo deployment (`quiz-randomizer-demo.vercel.app`, password `quizdemo`) with 3 sample quizzes on its own Google Sheet, so the real password-gated family tool and its data stay private
- Fresh screenshots for Resume Lab, Quiz Randomizer, and a redone one for Mega CP Calculator (the old one was an oddly tall crop)

### Changed
- Hero character is 20% bigger (240px → 288px mobile, 320px → 384px desktop)
- Removed the tag filter tabs — with only a handful of tools it wasn't earning its keep; `ToolsGrid` is a plain grid now. Per-card tags still show as badges. Pagination is still on the list for once there are more entries
- Reduced the hero's height (`min-h-[calc(100vh-80px)]` → `calc(70vh-80px)`) and iterated the hero-to-grid gap up to `py-20` (80px) after the first pass felt too cramped

---

## [2026-09-21] — Tools Page

### Added
- **`/tools` page** — standalone page for hosting apps, plugins, and coding projects. Hero with the ginny-lab character on the left and heading/subtitle on the right, followed by a filterable 3-column card grid
- **Tools content collection** — one Markdown file per tool in `src/content/tools/`, managed from Tina admin ("Tools"). Fields: title, screenshot, summary, tags, project status (Live / Beta / In progress), live URL, code URL, optional case study slug, date, featured
- **Tool cards** — status badge, tags, and Launch / Case study / Code links (each shown only when set). Image and title open the live app, falling back to the case study or repo
- **Tag filter** — deep-linkable via `?tag=` (e.g. `/tools?tag=Tracker`); tabs only show tags that at least one tool uses
- **Hero background controls** — the `tools` page entry uses the same image / video / color / gradient fields as other pages (default: none, flat background)
- **Nav link** — "Tools" added after "Works"
- Seeded with Pokémon Collection Tracker, Workload Tracker, Figma to HTML Email Builder, and Mega CP Calculator

### Changed
- `/tools` hero now uses the home page's placement: viewport-height, vertically centered, `max-w-5xl` container, 320px character, 64px gap
- Mini corner character is now hidden on `/tools` (the hero has its own character), same as on the home page
- `tina/tina-lock.json` and `tina/__generated__/` regenerated for the new Tools collection

### Notes
- Tools stay listed in `/works` as case studies; `/tools` has its own screenshots in `public/images/tools/` and only links a case study if the file exists, so it works on its own
- Mega CP Calculator has no case study yet; add its slug in the CMS once written

---

## [2026-06-29] — Video Support in Case Studies

### Added
- **Inline video player** — `.mp4` and `.webm` files referenced with image syntax now render as `<video>` elements with native browser controls (play/pause, audio, progress bar)
- **Auto poster/thumbnail** — if a file named `[video-name]-thumb.png` (or `.jpg`) exists alongside the video, it's automatically used as the poster image
- No autoplay, no loop — user initiates playback

### Usage
```markdown
![Video description](/images/case-studies/my-video.mp4)
```
Place `my-video-thumb.png` in the same folder for an automatic thumbnail.

### Changed
- anim-motion-graphics case study: Joiiio gif moved to single line, mp4 on next line (out of bento)

---

## [2026-06-29] — Content Updates

### Changed
- Updated case study content: dev-collection-tracker, dev-designer-to-vibe-developer-starter-pack, dev-figma-to-email-builder, dev-workload-tracker
- Home page heading: "Hi, I'm Ginny." → "Hi, I'm Ginny!"

### Removed
- social-alaska case study

---

## [2026-06-29] — SEO, Analytics, Alt Text & Cleanup

### Added
- **SEO Sitemap** — auto-generates `sitemap.xml` and `robots.txt` on build via `next-sitemap`
- **Vercel Analytics** — privacy-friendly page view tracking (no cookies)
- **Image alt text fields** — Thumbnail Alt Text and Header Image Alt Text in Tina admin per case study

### Removed (cleanup)
- 11 old sample SVG images (ecommerce-*, fintech-*, healthcare-*) — no longer referenced
- Unused `@keyframes hop` CSS animation (replaced by wave)
- Unused `ginny-404.png` 1x version (only @2x is used)

---

## [2026-06-29] — Character Wave, Custom 404, Open Graph

### Added
- **Character arm wave** — right arm (viewer's right) waves on click with CSS keyframe animation
- **Custom 404 page** — character illustration + "Uh-oh, looks like this page blasted off again." + navigation buttons
- **Open Graph + Twitter card metadata** — title, description, og-image.png for social sharing
- **Idle blink** on character (eyes close every 3-5s)
- **Staggered hero entrance** — text elements fade in sequentially on home page load
- **Cards fade up on scroll** — case study cards animate in from below when entering viewport
- `wave`, `fadeUp`, `hop` CSS keyframe animations

### Changed
- Character SVG updated with reworked arm structure for proper wave animation
- Site title: "Ginny Mones — Creative Problem Solver"
- Site description: "Ginny's creative journey and experiments, all in portfolio."
- Social links centered in contact section

---

## [2026-06-27] — Case Study Updates & Branding Tag

### Added
- "Branding" tag added to workTags in site settings
- New case studies: Calculator, App Icon, User Profile, Branding MHW:PH, Sketches Chansey
- Live links added to case studies via `links` frontmatter field
- Bento gallery component (`:::bento` / `:::` markers in markdown)
- Supports 1-6 images with automatic layout (2-col base, first image spans 2 rows for 3/5/6)
- Lightbox works on bento images

### Fixed
- Bento gallery parser: handles remark wrapping markers + images in single `<p>` tag
- Pagination flicker: removed opacity fade transition that caused visual flash
- Mobile pagination scroll: defers scroll to next animation frame after React re-render
- Works consistently on both desktop and mobile

---

## [2026-06-26] — Case Study Content & Image Fixes

### Fixed
- Missing closing quote in `collection-tracker.md` frontmatter (`icon: "globe"`) that broke Tina Cloud indexing
- Renamed image files to shorter, consistent names (removed `header-` prefix from inline images)
- Fixed image references in collection-tracker, designer-to-vibe-dev, and figma-to-email-builder case studies

### Note
- When Tina Cloud indexing fails, you must click the ⋮ menu next to the branch → "Reindex" (not "Refresh Branches")
- Always validate YAML frontmatter quotes before pushing — a single missing quote breaks the entire Tina Cloud index

---

## [2026-06-26] — Case Study Enhancements: Nav, Related, Links, Social Icons

### Added
- **Previous / Next navigation** at the bottom of each case study (based on date order)
- **Related Case Studies** section (3 max, ranked by shared tags then recency)
- **Relevant Links** section with icon support (GitHub, Figma, Dribbble, Behance, npm, Website, Demo, Generic)
- `links` field in case study frontmatter (managed via Tina admin)
- **Social links with Font Awesome brand icons** (Dribbble, LinkedIn, Behance auto-detected from label)
- Font Awesome packages (`@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`)
- Reusable `<SocialLinks />` component with light/dark variants

### Changed
- Contact section social links now use icon + text format
- Case study detail page restructured: content → links → prev/next nav → related work

### Fixed
- Tina Cloud schema mismatch error (`CaseStudyLinks` type) — resolved by regenerating and committing `tina/__generated__/` files
- Added `--skip-indexing` flag to `tinacms build` command for faster deploys

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
