---
status: "published"
title: "Workload Tracker — Full-Stack Productivity Tool"
thumbnail: "/images/case-studies/workload-tracker-header.png"
headerImage: "/images/case-studies/workload-tracker-header.png"
summary: "Designed and built a full-stack workload tracking tool from concept to deployed MVP, enabling users to log hours, visualize capacity, and share dashboards."
tags: ["Product Design", "Development", "UX/UI Design"]
client: "Personal Project"
date: "2026-05-12"
links:
  - label: "Live App (Personal productivity tracker)"
    url: "https://workload-tracker-pin.vercel.app/w/ginnymones"
    icon: "globe"
---

## Problem Statement

As a designer managing multiple projects simultaneously, I needed a way to track where my time was going — not just for billing, but for understanding capacity. Existing tools were either too complex (Harvest, Toggl with 50 features I'd never use) or too simple (spreadsheets that didn't visualize anything). I wanted something that could tell me at a glance: am I overloaded? Where is my time actually going?

## Solution

I co-built a full-stack workload tracking tool in a single working session using AI-assisted development. The design focuses on immediate visual feedback — you log hours by category and instantly see your capacity distribution.

### What Was Built

Three versions of the tool, each serving a different purpose:

- **Main app** — Full production version with Google OAuth, Supabase database, and team dashboards
- **PIN-auth variant** — Lightweight personal version with simple PIN login, no OAuth complexity
- **Static demo** — Single HTML file proof-of-concept for stakeholders

![The productivity tracker in it's full glory](/images/case-studies/workload-tracker-header.png)

![Streaks/insights and period views that were added and refined — painstakingly — later on](/images/case-studies/workload-tracker-streak-views.png)

### Key Design Decisions

- **Dark mode by default** — Reduces eye strain for a tool you check throughout the day
- **85% productivity flag** — The tool alerts you when you're approaching burnout (research suggests sustained 85%+ utilization leads to quality drops)
- **Capacity meter front and center** — The most critical information is the first thing you see
- **Quick-add interaction** — One-click logging without navigating away from the dashboard
- **Shareable public dashboards** — Toggle visibility so teammates or managers can see your load without needing accounts

![Customization options (I had a lot of fun with this)](/images/case-studies/workload-tracker-customization.png)
![Recurring templates which I added after getting tired of logging the same meeting every single day](/images/case-studies/workload-tracker-recurring-templates.png)


### Tech & Design Stack

Next.js, Tailwind CSS, Recharts (data visualization), Supabase PostgreSQL, Google OAuth, Vercel deployment.

## Results & Impact

- Built from concept to deployed MVP in ~3-4 hours
- 3 deployable versions created (production, lightweight, demo)
- WCAG AA compliant color contrast (5 combinations audited and fixed)
- 14 bugs identified and resolved during build
- Documented with user guide, developer guide, and project summary
- Architected for future scaling (org-wide deployment, SSO integration)
