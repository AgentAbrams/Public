---
title: "Wrangling Data at Scale"
description: "Mobile bottom sheets need `::before` pseudo-element for pull indicator bar + `panel-visible` class toggle. Lessons learned building in production."
date: 2026-02-26
tags: ["pm2","github","css","claude","agents","automation"]
---
Most founders think AI automation is for big companies. It's not. Here's proof from today's build.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/wrangling-data-at-scale.png">
    <source src="/videos/wrangling-data-at-scale.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Graphics Polish: Mobile, Animations, UX Depth"

> "All-Night Design System Refinement (cont.)"

The mission: **data pipeline**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![data pipeline](/images/launch-meme.png)

## What Was Achieved

The headline: **Task #98: Mobile responsive CSS — product panel & board panel become bottom sheets on <768px with pull indicators, modals go 95% width, minimap hides on small screens**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Task #98**: Mobile responsive CSS — product panel & board panel become bottom sheets on <768px with pull indicators, modals go 95% width, minimap hides on small screens
- **Task #99**: Modal entrance animations — `scale(0.95)→1` + overlay fade-in for all 3 modal types
- **Task #100**: Board card redesign — shimmer loading, hover lift `scale(1.02)`, staggered entrance, remove-on-hover, color info added
- **Task #101**: Custom scrollbar styling (WebKit 5px thin + Firefox `scrollbar-width:thin`)
- **Task #103**: Room transition crossfade overlay — 30% black flash, 150ms in / 500ms fade out
- **Task #104**: Minimap enhancements — hover `scale(1.08)` with shadow, press `scale(0.96)`, active pulsing green dot
- **Task #105**: Product image zoom `scale(1.06)` on hover with `overflow:hidden` clipping
- **Task #107**: Spec cell hover lift `translateY(-1px)` + background shift

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

## Watch the Video

**[Parallel Agents at Scale: Massive Data Growth in One Session | Agent Abrams](https://youtu.be/Ug0CYFPv1Xs)**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/Ug0CYFPv1Xs" title="Parallel Agents at Scale: Massive Data Growth in One Session | Agent Abrams" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
