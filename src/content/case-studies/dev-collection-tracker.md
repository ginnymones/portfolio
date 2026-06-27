---
status: "published"
title: "[DEV] Pokémon Collection Tracker"
thumbnail: "/images/case-studies/collection-tracker-header.png"
headerImage: "/images/case-studies/collection-tracker-header.png"
summary: "Designed and built a visual collection tracker for Pokémon card collectors, featuring real-time ownership tracking, variant management, and PIN-based authentication."
tags: ["Product Design", "Development", "UX/UI Design"]
client: "Personal Project"
date: "2026-06-07"
links:
  - label: "Live App"
    url: "https://collection-tracker-zeta.vercel.app/"
    icon: "globe"
---

## Problem Statement

As a collector, tracking what you own across hundreds of cards — including variants, holos, and special editions — is a pain. Spreadsheets get unwieldy fast, and most existing apps are either too generic (designed for any collectible, so they miss Pokémon-specific data) or require creating yet another account with email verification.

I wanted something visual, fast, and low-friction to access — something I could check on my phone at a card shop to know instantly if I already own a specific card.

## Solution

I built a purpose-built Pokémon collection tracker with a focus on speed and visual browsing. The core experience is a grid of cards where you tap to mark ownership — no forms, no friction.

![The Pokemon TCG collection tracker I made for my sister](/images/case-studies/collection-tracker-header.png)


### Key Design Decisions

- **PIN-based access** — No email signup or OAuth. Enter a short PIN and you're in. Your collection is tied to a hashed PIN stored in Firestore, so it's secure but frictionless.
- **Visual-first browsing** — Cards displayed as a grid with images, not a text list. You see the art, which is how collectors actually think about their collections.
- **Variant tracking** — Each card can have multiple variants (holo, reverse holo, full art). Track each independently.
- **Anonymous auth** — Firebase anonymous authentication handles the session while the PIN identifies the collection. No personal data stored.
- **Instant feedback** — Tap a card → it's marked. No save button, no confirmation modal. The state syncs immediately.

![A way to filter out the cards that you already have](/images/case-studies/collection-tracker-owned.png)

![Stats for the geeks who want to see if they've already caught 'em all](/images/case-studies/collection-tracker-stats.png)


### Tech & Design Stack

React + TypeScript, Vite, Firebase (Firestore + Anonymous Auth), Supabase, Vercel deployment.

## Results & Impact

- Full collection management app built and deployed
- PIN-based auth eliminates signup friction (zero personal data collected)
- Real-time sync across devices via Firestore
- Supports the full Pokédex with variant tracking per card
- Deployable as a lightweight Vercel app with no server costs
