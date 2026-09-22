---
status: "published"
title: "[DEV] Quiz Randomizer"
thumbnail: "/images/tools/quiz-randomizer.png"
headerImage: "/images/tools/quiz-randomizer.png"
summary: "Built a shared quiz randomizer for me and my sister — pick a quiz, get one un-repeated question at a time, backed by a Google Sheet neither of us needs a manual to edit."
tags: ["Product Design", "Development", "UX/UI Design"]
client: "Personal Project"
date: "2026-09-22"
links:
  - label: "Live Demo"
    url: "https://quiz-randomizer-demo.vercel.app/"
    icon: "globe"
---

## Problem Statement

My sister and I like quizzing each other, but a shared doc gets messy fast: someone re-asks a question the other already answered five minutes ago, and there's no single "check this one off" that both of us actually see. Free quiz apps expect real accounts, come with their own fixed question packs, or bring advertising I didn't want to hand either of us. What we actually wanted was closer to a shared, always-in-sync flashcard box — pick a quiz, get a random question neither of us has seen yet, and have it stay crossed off even if we close the tab and open it again later on a different device.

## Solution

I built a small web app that reads its questions straight from a Google Sheet — one tab per quiz, one question per row — so adding or editing questions is just typing into a spreadsheet, nothing my sister needs a tutorial for. Press "Randomize" and it draws one question that hasn't come up yet; the "used" state is written back to that same cell, so both of us see the same "X of Y left" no matter which device opens the app.

### Key Design Decisions

- **The Google Sheet is the CMS** — Neither of us wanted to learn a new admin panel just to add a question. A spreadsheet is something we both already know, and a new quiz is just duplicating a template tab and giving it a name.
- **Shared password, not accounts** — This is a two-person tool. A single shared password behind a signed session cookie was enough security without the overhead — or the awkwardness — of real signup for one other person.
- **Light mode only** — I tried dark mode; my sister didn't like it, so it got pulled. Not every product needs to support every preference — sometimes "what the one actual user wants" beats "what's technically more complete."
- **Used state lives in the Sheet, not local storage** — So a question that's already come up on my phone doesn't come up again on my sister's laptop. The whole point was for it to feel shared, not per-device.

### Tech & Design Stack

Next.js (App Router, TypeScript, Turbopack), React 19, the Google Sheets API for storage, plain CSS (no framework) with a custom palette, deployed on Vercel.

## Results & Impact

- Two people, zero duplicate questions, from any device — the core ask, solved
- Adding a new quiz is "duplicate a tab and rename it" — no code, no deploy
- A public demo, with sample quizzes and no login needed, lets anyone try the actual flow without touching the real password-protected family Sheet
- A running changelog and FAQ page are kept current with every visible change, so my sister always has somewhere to check "wait, how does this work again?"
