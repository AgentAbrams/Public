---
title: "Orchestrating Autonomous Agents"
description: "Practical multi-agent systems lessons from a day of building in production."
date: 2026-03-03
tags: ["three.js","pm2","git","api","css","security"]
---
Every hour you spend on manual tasks is an hour not spent growing your business. Today I automated another one.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/orchestrating-autonomous-agents.png">
    <source src="/videos/orchestrating-autonomous-agents.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Multi-UI Polish: Collapse Fixes, RSS Manager, Collections Cards, Ken Dashboard"

> "Multi-Project Best Practices Improvement Loop (a campaign platform + a client project + funding opportunity)"

The mission: **multi-agent systems**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![multi-agent systems](/images/launch-meme.png)

## What Was Achieved

The headline: **Pulse-agent (9845) collapse fix: `max-height: 9999px` CSS transition appeared broken/instant. Fixed by reducing to `2000px` with `cubic-bezier(0.4,0,0.2,1)` — the key insight: CSS transitions over huge ranges appear to snap because the "visible portion" of the animation is tiny.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Pulse-agent (9845) collapse fix**: `max-height: 9999px` CSS transition appeared broken/instant. Fixed by reducing to `2000px` with `cubic-bezier(0.4,0,0.2,1)` — the key insight: CSS transitions over huge ranges appear to snap because the "visible portion" of the animation is tiny.
- **Patty (7460) RSS Sources Manager**: Completely rewrote `SourcesTab.tsx` to match 9845 dark design tokens (Space Grotesk, `#0E0E10`, `#00F0FF` cyan). Added full URL display (clickable), inline editing, add/delete, toggle active, category collapsing. Added PUT endpoint to pulse-agent `server.js` and added PUT proxy export to `/api/pulse/[...path]/route.ts`.
- **Boardroom-agent (9815) Collections**: Added `/api/collections/launch` POST endpoint to `api-viz.js` (creates an e-commerce platform collection, maps dw_sku → an e-commerce platform_id, adds products). Rewrote `renderCollList()` in `boardroom.js` using DOM createElement (not innerHTML) after security hook blocked XSS pattern. Added `launchCollection()` function.
- **Ken Trader (7810) Dashboard collapsible sections**: Added `CollapsibleSection` wrapper component to `Dashboard.jsx` with localStorage persistence. Wrapped all 15 dashboard sections: Overview, Portfolio Performance, Strategy Breakdown, Capital & Economics, Best Opportunities, Today's Performance, Strategy Flow, Action Plan, Top Markets, Bleeding Markets, P&L History, Strategy P&L, Strategy Leaderboard, Strategy Deep Dive (collapsed by default), Recent Activity. Built with `npm run build`, restarted `ken-kalshi` PM2.
- Ken Trader (7810) is actually PM2 process `ken-kalshi` at `/root/Projects/Bertha/kalshi-dash/` — NOT in `/root/the agent system/ken/`. The `/root/the agent system/ken/` directory is the agent backend; the dashboard UI is at `/root/Projects/Bertha/kalshi-dash/`.
- Patty proxy route at `/api/pulse/[...path]` only had GET/POST/DELETE exports — needed PUT added for inline editing to work.
- Boardroom-agent collections API is `/api/collections-3d` (returns `{collections, allTags, totalProducts}`), new launch endpoint is `/api/collections/launch` POST.
- an e-commerce platform product ID lookup bridge: `an e-commerce platform_products WHERE dw_sku = ANY($1) AND an e-commerce platform_id IS NOT NULL` — links catalog SKUs to an e-commerce platform IDs for collection creation.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Gallery tour/audit at 7681/gallery/ (from prior session, never addressed)
- Verify Patty SourcesTab renders correctly at http://[server]/ (Sources tab) — couldn't visually verify
- Verify boardroom-agent collections launch button works end-to-end (an e-commerce platform API call)
- Continue improvement loops: rate limiting, performance optimization, more content generation

## Watch the Video

**[I Replaced a Dev Team with AI. Here&#39;s What Happened.](https://youtu.be/0BY9ANe4tT0)**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/0BY9ANe4tT0" title="I Replaced a Dev Team with AI. Here&#39;s What Happened." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.

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
