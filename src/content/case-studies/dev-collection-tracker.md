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

I went to a card show with my sister one time and saw her having to scroll though numerous lines of Pokemon names just to find the Pokemon she was looking for. She had completely forgotten that there was a search option and, even then, she had to click the button multiple times as it very small (probably around 15px). She didn't say outright that she was struggling, but after a while she mentioned that it would be nice if there was an easier was to fnd the Pokemon "by photos" because she couldn't remember their names sometimes.

Me: So what if you accidentally close the tab, is the collection still saved on the site?  
Her: Huh. Good question.  
Me, in my head: Good opportunity.

## Solution

I built Pokémon card collection tracker that focuses on ease of searching through visual cues and filters, and that also provides users with an option to save their collection data so that they can view their collection from whichever device they're using.

![The Pokemon TCG collection tracker I made for my sister](/images/case-studies/collection-tracker-header.png)


### Key Design Decisions

- **PIN-based access** — No email signup or OAuth — I had tried that for a previous project and ended up with a headache. Instead, I kept the login method simple with a simple username and PIN combination. Secure yet frictionless.
- **Visual-first browsing** — Cards displayed as a grid with images, not a text list. You see the art, which is how collectors like my sister actually enjoy viewing their collection.
- **Instant feedback** — Tap a card and it's marked instantly. Tap it again and it's unmarked and untagged as something that you alread own. No need for a confirmation modal or additional friction points. The state syncs immediately.
- **Different modes for different types of collectors** - Toggle between a casual type of tracking (one card per specie) and a hardcore type of tracking (gotta catch 'em call — literally). The hardcore mode offers multiple variant tracking (holo, reverse holo, full art).


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
