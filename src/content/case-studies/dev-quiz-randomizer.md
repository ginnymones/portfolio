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

During one fine after-lunch conversation, my sister asked if I knew of any tool that could randomize a quiz for her as she would need it for her class. She wanted to be able to show one question at a time out of a set of questions, and have the ability to "strike off" the question once it's been shown.

Me: You can use the wheel of names.
Sister: Yeah, but the questions are gonna be long.
Me: Weeeell, there are probably some other options out there, but they might not be free.

Me, a beat after: I mean, I can probably make one for you.
Sister: I don't even know how many questions I'll load onto it yet.
Me: That's fine, just give me the basic rules and I'll put together something for you.

## Solution

I built a small web app that reads its questions straight from a Google Sheet — one tab per quiz, one question per row — so adding or editing questions is just typing into a spreadsheet, nothing my sister needs a tutorial for. Press "Randomize" and it draws one question that hasn't come up yet; the "used" state is written back to that same cell, so both of us see the same "X of Y left" no matter which device opens the app.

### Key Design Decisions

- **The Google Sheet is the CMS** — The tool didn't have to be complicated. It just needed to be completed ASAP. And in terms of maintaining an inventory of questions, a spreadsheet seemed to be the most organized way to go about it. Also, my sister isn't the most techie of people so the inventory management needed to be easy and frictionless, especially for a busy college professor like my sister. Google Sheets to the rescue.
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
