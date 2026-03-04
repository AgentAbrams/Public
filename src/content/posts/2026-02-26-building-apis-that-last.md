---
title: "Building APIs That Last"
description: "Mobile bottom sheets need `::before` pseudo-element for pull indicator bar + `panel-visible` class toggle. Lessons learned building in production."
date: 2026-02-26
tags: ["api","css","performance","claude","gemini","agents"]
---
I run a real business and build my own AI tools. No dev team. No six-figure budget. Just Claude Code. Here's today's build.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/building-apis-that-last.png">
    <source src="/videos/building-apis-that-last.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Performance Optimization, Dream Team Wiring, Task Completion Blitz"

> "Graphics Polish: Mobile, Animations, UX Depth"

The mission: **API development**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![API development](/images/launch-meme.png)

## What Was Achieved

The headline: **Task #73 (Perf Optimization): Built `wr-perf.js` standalone module — performance overlay (backtick toggle), Dream Team telemetry (POST renderer.info to server every 30s → Sheldon), ambient lighting presets. 58 MeshStandardMaterial→MeshLambertMaterial downgrades across 8 modules. Shadow mapping disabled. Flashing animations removed (Garcia floor hue cycling, neon sign pulse, ambient light breathing, Claudette LED blinking).**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Task #73 (Perf Optimization)**: Built `wr-perf.js` standalone module — performance overlay (backtick toggle), Dream Team telemetry (POST renderer.info to server every 30s → Sheldon), ambient lighting presets. 58 MeshStandardMaterial→MeshLambertMaterial downgrades across 8 modules. Shadow mapping disabled. Flashing animations removed (Garcia floor hue cycling, neon sign pulse, ambient light breathing, Claudette LED blinking).
- **Task #71 (Dream Team Wiring)**: Full pipeline wired: `wr-perf.js` client → `POST /api/workspace/perf-report` server → forwarded to Sheldon `POST /api/perf/snapshot`. All 4 Dream Team agents online. Added Shane proxy routes for reports. Sheldon budget status improved from FAIL (7 warnings) to WARNING (1 warning).
- **Task #72 (Fortune 500 Polish)**: Wallpicker UI design system upgrade — accent `#8b5cf6` → `#c0a888`, gaming blues → warm cream/gold, `monospace` → `Inter`, `innerHTML` → `textContent`, border-radius 10→16px, backdrop-filter blur. Color wheel already using design system vars.
- **Task #129 (Endless Art MET)**: Background agent enhanced MET art wings with individual focus navigation (Up/Down arrows), lazy texture loading (+-3 range with disposal), artwork detail overlay (Space key). 50 wing panels, 10 categories.
- **Task #135 (CC Agent Audit)**: Background agent audited Constant Contact agent — Gemini JSON parsing fragility fixed, all 10 features verified operational.
- **Figma Design System Rules**: Created `.claude/rules/figma-design-system.md` with design tokens, material rules, typography, performance constraints.
- **Builds deployed**: v399 → v400 (35,024 lines, all syntax OK)
- **Server changes**: Sheldon forwarding in perf-report handler, Shane reports proxy route added

## The Interesting Part

Here's what caught my attention:

> workspace app at `/public/workspace/` is a separate SPA with its own index.html and 7 JS files — needs independent cache versioning

If you're a founder or small business owner, this is the kind of operational edge that separates you from competitors still doing things manually.

**Quick hits from today:**

- Mobile bottom sheets need `::before` pseudo-element for pull indicator bar + `panel-visible` class toggle
- Spring overshoot easing `cubic-bezier(0.34, 1.56, 0.64, 1)` — the 1.56 overshoots 56% before settling
- `{ passive: true }` on scroll listeners prevents jank by telling browser no `preventDefault()` will be called

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

### Today's Commits

Shipped 20 commits:

- `1a12046` blog: self-hosted video embeds for 9 posts
- `1cbca41` Add blog post: The Content Sanitizer That Guards Every Channel
- `82c1a94` Tighten blog posts: upsertRecord → upsertRecord, remove scale numbers
- `5518a87` Fix 6 data leak violations across 5 blog posts
- `ead383c` feat: social engagement system — unified poster, monitor, reply, Boris watcher

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Task #72 (Fortune 500 workspace polish) still pending
- Continue autonomous graphics improvement per user directive
- Task #72 (Fortune 500 workspace polish) still pending
- Mobile responsive improvements for product panel/board on small screens

## Watch on YouTube

Follow the build in video form:

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) — walkthroughs, demos, and deep dives into AI-powered development.

## Let's Connect

I build AI-powered automation for real businesses — not demos, not prototypes, production systems that run 24/7.

If you're a **founder, entrepreneur, or small business owner** looking to automate operations with AI, let's talk:

- [**@agentabrams on YouTube**](https://youtube.com/@AgentAbrams) — walkthroughs and demos
- [**@agentabrams on X**](https://x.com/agentabrams) — DMs open
- [**@agentabrams on Bluesky**](https://bsky.app/profile/agentabrams.bsky.social) — follow along
- [**goodquestion.ai**](https://goodquestion.ai) — you're here

**Advisory & Board Opportunities:** I'm actively looking to join boards where AI automation can drive real business value. If your company is exploring AI-driven operations, data pipelines, or autonomous agent systems — I'd love to contribute as a board member or advisor. Reach out on any platform above.

---
*Built with [Claude Code](https://claude.ai). Shipped in production. Every day. This is what one founder + AI looks like.*
