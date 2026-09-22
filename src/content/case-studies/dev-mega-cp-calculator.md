---
status: "published"
title: "[DEV] Mega Evolution CP Calculator"
thumbnail: "/images/tools/mega-cp-calculator.png"
headerImage: "/images/tools/mega-cp-calculator.png"
summary: "Designed and built a Mega Evolution CP calculator for Pokémon GO, letting players find the exact power-up level and cost needed to hit a target Combat Power for Great, Ultra, or Master League — verified against real in-game screenshots rather than community data taken at face value."
tags: ["Product Design", "Development", "UX/UI Design"]
client: "Personal Project"
date: "2026-09-15"
links:
  - label: "Live App"
    url: "https://mega-cp-calculator.vercel.app/"
    icon: "globe"
---

## Problem Statement

Sometime in August 2026, the developers of Pokémon GO decided to implement a battling mode wherein Mega Evolved Pokémon (or Pokémon that unlock a higher power level) can be used in battle formats with a 1500 combat power (CP) and 2500 CP limit. It's the first time in the game's history that this has ever happened.

However:
- There's no way to check in-game what level to power a Pokémon up to so it lands exactly at a battle format's CP cap; and
- There's no way to know what the final CP will be for that Pokémon after it's both leveled up and Mega Evolved.

It would have been easy if the game let players power up their Pokémon after Mega Evolving, but that isn't the case — the feature is disabled while a Pokémon is Mega Evolved. Additionally, Mega Evolving requires resources that can be hard to come by unless you spend a lot of time and money fighting raid bosses. It simply isn't practical to power up a Pokémon and just hope it lands at the CP your heart desires.

## Solution

I decided to build a single-page web app where users input their Pokémon's level, its IVs, and its current Mega Level, and immediately see what it would cost to build that Pokémon for specific battle formats, or "leagues."

Competitive Pokémon GO players are already accustomed to providing these three inputs, since PvPoke — the tool they already use to check a Pokémon's "rank" for specific leagues — follows a similar pattern. Mirroring that pattern keeps the tool feeling familiar instead of introducing new friction.

### Key Design Decisions

- **Frontload the information input** — Competitive Pokémon GO players usually check several different Pokémon to find the best one for each league. To make them feel like they're making good use of their time with this tool, the form they need to fill out is presented right upfront.
- **More than one input option per field** — Some people are more comfortable typing, while others like to scroll to get to the item they want to select. The tool enables both options for most fields, so users have a fallback if one method isn't working for them.
- **Instant feedback** — The resulting CP adjusts live as the user changes any input. Right below it, an "Ending CP by League" preview shows the ending CP for Great, Ultra, and Master League at a glance, with a link straight down to the League CP Cap Planner for the full power-up cost and IV rank breakdown.
- **Bonus: the League CP Cap Planner** — Presents the power-up cost information to users on the same page instead of making them go hunt for it elsewhere. This turns the tool from "just another calculator" into a battle-planning buddy.

![The main calculator view where all the information is presented upfront](/images/case-studies/mega-cp-calculator-main.jpg)

![The league costs planner, so you won't waste candies and dust](/images/case-studies/mega-cp-calculator-league-costs.jpg)

### Tech & Design Stack

A single `index.html` file — vanilla JavaScript and Tailwind CSS (via CDN), no framework and no build step — deployed as a static site on Vercel with Vercel Analytics. There's no backend or database: every calculation, including the exhaustive 4,096-combination IV rank search, runs entirely client-side in the browser.

## Results & Impact

- Covers all 62 Mega and Primal Evolution species currently in Pokémon GO, across both the permanent Mega Level system and the (since-ended) "Mega Ascension" event system
- Every number — base stats, CP multipliers, and Mega Level CP boosts — was verified by solving real in-game screenshots backward against the CP formula rather than trusting any single community source at face value; that process caught and fixed a real bug in the CP multiplier table that had been silently wrong for a specific level range
- The League CP Cap Planner shows the exact Stardust, Candy, and Candy XL cost to reach the highest level under a league's CP cap, plus how those IVs rank among all 4,096 possible combinations
- Zero backend, zero database, zero server costs — the whole tool, including the IV-rank search, runs client-side
