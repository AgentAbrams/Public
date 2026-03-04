---
title: "Wrangling Data at Scale"
description: "Practical data pipeline lessons from a day of building in production."
date: 2026-03-04
tags: ["nodejs","postgresql","git","api","rest","graphql"]
---
Every hour you spend on manual tasks is an hour not spent growing your business. Today I automated another one.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/wrangling-data-at-scale.png">
    <source src="/videos/wrangling-data-at-scale.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "TWIL Karin Vendor Setup + Image Search"

> "Color Collection Cleaner + PR Title Fix Continuation"

The mission: **data pipeline**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![data pipeline](/images/launch-meme.png)

## What Was Achieved

The headline: **TWIL Karin Vendor Created: New private label vendor under a specialty supplier. DWPW prefix, SKU block 430000-430208. Registered in `vendor_registry` (id=109), `twil_karin_catalog` table with 209 products across 9 color categories. All pricing from Google Sheets imported.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **TWIL Karin Vendor Created**: New private label vendor under a specialty supplier. DWPW prefix, SKU block 430000-430208. Registered in `vendor_registry` (id=109), `twil_karin_catalog` table with 209 products across 9 color categories. All pricing from Google Sheets imported.
- **Image Search**: Exhaustive search across 5 an e-commerce platform retailer APIs, MDC CDN, TWIL site, Google Images. Found images for 2/209:
- **Key Finding**: Most TWIL SKUs are trade-only, not publicly listed. SKU prefixes = product types (WNR=Winfield, GR=a product vendor, TSJ=Jute, TW=TWIL, SG=Seagrass).
- TWIL site (twilwall.com) has self-signed SSL — use `curl -sk` to bypass
- MDC (mdcwall.com) is SEPARATE from TWIL — different catalogs, different SKU formats
- an e-commerce platform `/search/suggest.json` API returns nothing for commercial/trade-only products
- Chrome extension JS blocked by cookie filter on some sites
- **Color Collection Cleaner**: Updated `color-collection-cleaner.js` with all 12 collection IDs (blue, green, yellow, cream, red, purple, gold, grey, black, brown, orange, coral). Added rate-limit handling (429 retry) and timeout to an e-commerce platform REST client. Added page-level fetch logging. Launched LIVE for ALL colors — PID 1967283.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

### Today's Commits

Shipped 3 commits:

- `e27b361` Backup: new hero images + scripts update
- `4489a3d` Backup: new videos, robot avatar, dashboard captures
- `7076d39` Backup: avatar assets and video captures

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Find images for 207 remaining TWIL products (contact TWIL directly or Eade's/Levey for trade catalog)
- Enrich specs from SKU prefix type inference
- Build an e-commerce platform push script for TWIL Karin
- PR Bulk Update still running (~2,150/13,547) — will auto-create smart collections on completion

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
