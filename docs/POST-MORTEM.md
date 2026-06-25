# Post-Mortem — Portfolio Site Build

## What Went Well

**Architecture decisions**
- The markdown + JSON content approach is clean. Case studies are truly self-contained files — drop one in, it appears on the site. No database, no migrations, no deploy pipeline beyond Git push.
- The flexible background system (image/video/color/gradient + overlay) turned out elegant. One component handles all variations, and it's per-page configurable without code changes.
- Choosing Tina CMS was the right call — it's Git-backed so there's no lock-in, and the admin panel is immediately usable without a learning curve.

**Speed**
- From concept to deployed site in a single session. The core structure (pages, components, content system, CMS schema) came together quickly.
- Build passes were clean from early on — no cascading type errors or runtime crashes.

**Developer experience**
- The content template (`_template.md`) makes adding case studies foolproof. Copy, rename, fill in, done.
- Separation of concerns is clear: components render, content files store data, lib functions bridge the two.

---

## What Didn't Go Well

**Tooling friction**
- `create-next-app` timed out, requiring manual project setup. Added ~10 min overhead.
- The `gh` CLI wasn't installed, and the user had to manually create the GitHub repo through the web UI. Should have checked for `gh` availability first.
- Multi-command instructions (pasted as one line) caused confusion. Should have been clearer about "run these one at a time."

**Tina Cloud setup**
- The `tinacms build` command requires cloud credentials, which wasn't immediately obvious. Initially set the build script to include it before the user had credentials, which would have blocked a local-only workflow.
- Peer dependency warnings (React 19 vs Tina's React 18 deps) looked alarming but were harmless. Could have proactively warned the user these would appear.

**Vercel deployment**
- The `next-mdx-remote` vulnerability blocked the first deploy. Vercel's security policy treated a warning-level issue as a hard failure. Should have upgraded to v6 from the start.

**Content gap**
- The About page content was initially hardcoded in JSX, not connected to the CMS. The user correctly noticed they couldn't edit it from the admin panel. Should have wired all content to the CMS from day one rather than hardcoding and migrating later.

---

## Discoveries

1. **Google Sans Flex is now publicly available** on Google Fonts (as of mid-2026). No need for workarounds or alternatives.
2. **Vercel blocks deploys for vulnerable dependencies** even if the build itself succeeds. The `next-mdx-remote` v5 vulnerability is treated as a deploy blocker, not just a warning.
3. **TinaCMS v3.9.3 works with React 19** despite peer dependency warnings for React 18. The admin panel functions correctly.
4. **Tina's `object` field with `list: true`** is perfect for repeatable structured content (work experience, social links). The `itemProps` callback gives nice labels in the admin UI.
5. **Tina local dev mode** (no cloud credentials) works great for development. The `tinacms dev` command runs a local GraphQL server. Cloud is only needed for production editing.

---

## Points for Improvement

### Methodology

| Issue | Improvement |
|-------|------------|
| Assumed user had `gh` CLI installed | Always check tool availability before giving commands that depend on them |
| Gave multi-line commands together | Always present terminal commands one per line with explicit "run this, then this" framing |
| Hardcoded content first, CMS-ified later | For CMS-backed sites, wire content to data files from the start — never hardcode page text in JSX |
| Didn't pre-validate Vercel's security policy | When targeting Vercel, audit for known vulnerability blockers before first deploy |
| Tina Cloud setup instructions were fragmented | Create a single, numbered setup guide (repo → Tina Cloud → env vars → deploy) as one document |

### Output

| Issue | Improvement |
|-------|------------|
| No mobile nav (hamburger menu) | Should be part of the base scaffold — most portfolio visitors are on mobile |
| Social links duplicated across components | Create a shared `site-settings.json` with global data (name, email, socials) used by Footer, Contact, and About |
| No OG/meta images | Include a placeholder OG image and structured metadata from the start |
| No favicon | Include a simple favicon in the initial scaffold |
| `next-mdx-remote` included but unused | Remove unused dependencies, or commit to using MDX over remark for consistency |
| No 404 page design | Add a styled not-found page in the initial build |

### For Future Portfolio Builds (Process)

1. **Start with a design token questionnaire**: colors, fonts, page count, case study structure — collect everything upfront before writing code.
2. **Always scaffold with CMS wiring from day one**: no hardcoded content in JSX, ever.
3. **Create a pre-deploy checklist**: favicon, OG image, mobile nav, dependency audit, env vars confirmed.
4. **Test the Tina admin flow end-to-end** before handing off: create a case study, edit a page, upload an image, verify it deploys.
5. **Provide a single "Getting Started" doc** for the client that covers: how to access admin, how to add a case study, how to change backgrounds, how to update their bio.
