---
status: "published"
title: "[DEV] Resume Lab — Resume Style Quiz & Templates"
thumbnail: "/images/tools/resume-style-tool.png"
headerImage: "/images/tools/resume-style-tool.png"
summary: "A five-question quiz that matches job seekers to one of 9 ATS-safe resume styles, then hands off a matching resume and cover letter template in Figma — no design background required."
tags: ["Product Design", "Development", "UX/UI Design"]
client: "Personal Project"
date: "2026-09-22"
links:
  - label: "Live App"
    url: "https://resume-style-tool.vercel.app/"
    icon: "globe"
---

## Problem Statement

Job hunting right now is brutal, and most people don't know two things that actually matter: what "ATS-friendly" means for a resume's format, and how to make a resume look like more than a bare Word document without hiring a designer. The usual answer is a pile of Canva templates that either break ATS parsing — columns, icons, text baked into images — or are so generic they don't feel like *you*. And even when someone finds a template they like, most people don't know their way around Figma or Canva well enough to make it their own.

## Solution

Instead of a gallery to scroll through, I built a five-question personality quiz that maps the answers to one of nine resume styles — different color palettes, font pairings, and layout density, each one still built to the same ATS rules underneath (single column, standard section headings, real text, nothing hidden inside images). The result screen hands off a shared Figma file the user duplicates, pre-populated with their matched style's resume *and* a matching cover letter, plus plain-language instructions for editing it without ever having touched Figma before.

### Key Design Decisions

- **A quiz instead of a gallery** — Scrolling nine near-identical thumbnails and guessing is exactly the decision fatigue this tool is trying to remove. Five quick, personality-flavored questions — favorite drink, time of day, how you tackle a to-do list — do the picking instead.
- **Nothing is stored, nothing is sent** — Scoring runs entirely in the browser. The result screen says so outright, because "why does a resume quiz need my data" is a completely fair question to anticipate.
- **ATS rules are non-negotiable, not a setting** — All nine presets are built inside the same constraints (real text, standard headings, contact info in the body) so a user can't accidentally pick the "pretty" option and tank their applicant-tracking-system parsing.
- **Each style gets its own page in the shared Figma file** — Landing on one page with all nine presets side by side to hunt for your match was exactly the kind of "now what" moment this tool is supposed to prevent for someone new to Figma. The result screen deep-links straight to the matched style's own page instead, with a separate page to browse the rest if curious.
- **A matching cover letter, not just a resume** — Since the resume already commits to a style's fonts, colors, and voice, building the cover letter into the same file, in the same style, is one less thing the user has to figure out or match by eye.

### Tech & Design Stack

Next.js, TypeScript, Tailwind CSS v4, styled with the same design tokens as this portfolio. Scoring and matching run client-side with no backend and no stored data. The output is a shared Figma file — 9 presets, each on its own page with its own color/text styles and variables — plus an AI-snippet generator that turns the matched style into a plain-text prompt for ChatGPT, Claude, or Gemini.

## Results & Impact

- Five questions to a matched style, with 1–2 close alternates offered if the top match doesn't feel right
- Nine ATS-safe presets, each shipping both a resume and a matching cover letter in the same shared Figma file
- Zero personal data collected — scoring is entirely client-side
- Deep-linked result screen takes a first-time Figma user straight to their matched style's own page instead of a shared file with all 9
- An AI-snippet Copy button turns the matched style into a ready-to-paste prompt for writing the actual resume content
