---
title: '73 Restarts, 18 Posts Audited, 6 Leaks Caught: Defense in Depth on a VPS'
description: "Practical security engineering lessons from a day of building in production."
date: 2026-02-25
tags: ["pm2","github","security","claude","agents","automation"]
draft: true
---

Small businesses that automate early win. Here's what I shipped today using Claude Code — and how you can do the same.

## The Ask

> "Deep Audit Gate + Multi-Channel Leak Sweep + Boris 24/7"

The mission: **security engineering**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![hero](/images/heroes/defense-in-depth-on-a-vps.png)

## What Was Achieved

The headline: **Blog-agent crash fix: `authMiddleware` → `basicAuth` reference error caused 73+ restarts. Fixed, blog-agent now stable.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Blog-agent crash fix**: `authMiddleware` → `basicAuth` reference error caused 73+ restarts. Fixed, blog-agent now stable.
- **Deep Audit Gate COMPLETE**: Upgraded `sanitizer.js` `audit()` function with 8 check categories: blocked patterns, product counts, DB fields, IPs, ports, GitHub repos, pricing, PM2 counts.
- **All 18 blog posts audited**: Found and fixed 6 violations across 5 posts (thousands line count, x-access-token, localhost, thousands product count, product_sku field names).
- **YouTube titles sanitized**: Fixed "95 Vendors Tracked" → "Multi-Vendor Tracking" and "94K to 118K Records" → "Massive Data Growth" on 2 live video titles.
- **Bluesky post sanitized**: Found post with "many services" and "94K → 120K records". Deleted and reposted clean version.
- **Live blog audit (background agent)**: Comprehensive scan of all 19 pages — EFFECTIVELY CLEAN. All vendor names sanitized, no IPs/credentials/platform names found.
- **Boris watcher → 24/7**: Changed cron from 7am-10pm to 24/7 as requested by Steve.
- **Cron timezone fix**: All social/engage/boris crons were running on UTC hours. Fixed to align with 7am-10pm PT.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

### Today's Commits

Shipped 20 commits:

- `1cbca41` Add blog post: The Content Sanitizer That Guards Every Channel
- `82c1a94` Tighten blog posts: upsertRecord → upsertRecord, remove scale numbers
- `5518a87` Fix 6 data leak violations across 5 blog posts
- `ead383c` feat: social engagement system — unified poster, monitor, reply, Boris watcher
- `f284103` security: remove GitHub link from about page

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- X/Twitter still rate limited (429) — hourly cron retrying
- `upsertRecord()` function name visible in 2 blog posts (low severity but could tighten)
- Some anonymized product counts (2,863 / 3,678) still visible but vendors are anonymized
- YouTube upload quota — try uploading new narrated videos when quota resets

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
