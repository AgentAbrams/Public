---
title: "Orchestrating Autonomous Agents"
description: "Practical multi-agent systems lessons from a day of building in production."
date: 2026-03-04
tags: ["api","agents","automation","scraping"]
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


> "TWIL Push Script + Zombie Fix + Crown Image Scraper"

> "Art Print MET Search Integration + TWIL Fix"

The mission: **multi-agent systems**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![multi-agent systems](/images/launch-meme.png)

## What Was Achieved

The headline: **TWIL Push Script Built: Created `/root/the agent system/vendor-scrapers/push-twil-karin.py` modeled on push-philippe-romano-v2.py. Fixed bigint type mismatch (an e-commerce platform_product_id), added max-retry logic for 429s.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **TWIL Push Script Built**: Created `/root/the agent system/vendor-scrapers/push-twil-karin.py` modeled on push-philippe-romano-v2.py. Fixed bigint type mismatch (an e-commerce platform_product_id), added max-retry logic for 429s.
- **Infinite Retry Bug Fixed**: Found ALL 4 an e-commerce platform push scripts (PR, JD-v2, a vendor, TWIL) had `while True` loops on 429 that never exited for daily variant limits. Killed 8 zombie processes consuming API quota. Fixed all 4 scripts with 3-retry max + daily limit detection.
- **Crown Surface Solutions API Discovered**: `POST /getItemInfo.api` endpoint returns images + specs for TWIL products. Built `twil-crown-image-scraper.py` that found 12 SG6xxx images + spec enrichment for 18 products.
- **Winfield Thybony CDN Pattern**: `http://www.winfieldthybony.com/assets/images/product/w600/{SKU}.jpg` — found 5 more WNR images.
- **Image count: 12 → 29** products with images (24 pass quality gate → 29 now).
- **an e-commerce platform daily variant limit**: Rolling 24h window, 907 products consumed by PR push yesterday. TWIL push scheduled via cron (0,4,8,12,16,20) + at-job for 1 PM PT.
- an e-commerce platform daily variant limit is ROLLING 24h, NOT calendar-day reset. 907 products from 12:50 PM PT yesterday don't clear until 12:50 PM PT today.
- Crown Surface Solutions uses Supplier ID 71 = "Natural product" for TWIL products

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

### Today's Commits

Shipped 5 commits:

- `576f2f2` chore(): update configuration (1 files) [+2/-18]
- `2127b45` blog: auto-publish "Wrangling Data at Scale"
- `e27b361` Backup: new hero images + scripts update
- `4489a3d` Backup: new videos, robot avatar, dashboard captures
- `7076d39` Backup: avatar assets and video captures

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- 181/210 TWIL products still need images (trade-only, need TWIL direct contact)
- TWIL push will auto-run via cron when an e-commerce platform daily limit resets
- Pending from Session #91-92: styles page tiles, a custom vendor consolidation, PR sub-vendor consolidation
- Wire "Add to Cart" to actually create an e-commerce platform products from MET selections

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
