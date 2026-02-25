---
title: 'From 0.01% to Full Coverage: Populating Thousands of Products in One Session'
description: "the price agent `a price field` from an e-commerce platform = **sample price** ($X-$Y), NOT per unit retail price. Lessons learned building in production."
date: 2026-02-24
tags: ["api","oauth"]
---
Grabbed the keyboard at 6am. By noon, we had something real. Here's the story.

## The Ask

> "the price agent: Cost Population to significant + Google Integration"

The mission: **data pipeline**. Ship it to production, learn from the process, and share everything publicly — code, mistakes, and all.

![hero](/images/heroes/wrangling-data-at-scale.png)

## What Was Achieved

The headline: **Populated thousands of products with cost data (significant coverage, up from 0.01%):**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Populated thousands of products with cost data** (significant coverage, up from 0.01%):
- **Fixed a margin field overflow**: Widened from a decimal field to a wider decimal field — product supplier costs (higher amounts) exceed an e-commerce platform sample prices ($X-$Y)
- **Added Google integration tab** in dashboard UI with OAuth connect, Gmail search, Drive spreadsheet listing
- **Added /api/stats endpoint** for rich dashboard overview with cost source breakdown
- **Added /api/sync/data-import** 4-phase reusable endpoint (a vendor, a national distributor/a product vendor, a product manufacturer, a specialty vendor)
- **Batched CSV and GDrive import** — processes 50 rows at a time with bulk history inserts
- **Refreshed vendor_summary** table with all 15 vendors

## The Interesting Part

Here's what caught my attention:

> a UK manufacturer catalog: `a cost field`/`a retail field` columns; a national distributor/a product vendor: `a retail field`/`min_a price field` (no wholesale)

This matters because it's the kind of thing you only learn by building in production. No tutorial teaches you this.

**Quick hits from today:**

- the price agent `a price field` from an e-commerce platform = **sample price** ($X-$Y), NOT per unit retail price
- `the catalog table.a cost field` is the BIGGEST cost data source — many matched products with real wholesale costs
- `the catalog table.a price field` has costs for all 26 a specialty vendor products

## Show Me The Code

All the code from this session is public on GitHub:

All the code ships to production. Follow along at [goodquestion.ai](https://goodquestion.ai).

### Today's Commits

Shipped 20 commits:

- `90f6555` feat: add two-voice podcast + Bluesky SDK integration
- `d70b115` blog: add Tracking Progress with Claude Code post + YouTube video
- `a61956d` blog: auto-publish "Wrangling Data at Scale"
- `c9a398a` feat: redesign homepage with hero banner, CTA buttons, and contact section
- `aeb68b8` security: harden sanitizer — block ALL vendor names + industry terms

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Steve needs to re-authorize Google at: `http://[server]/api/google/auth/steve` and `/auth/info`
- a majority of products (many) still missing costs — gaps: a vendor (hundreds), a product manufacturer remaining (hundreds), a commercial vendor (hundreds), a custom vendor (hundreds), a specialty supplier (hundreds), a textile house (hundreds)
- Email attachment parsing for vendor price lists (found a product brand, a product brand, a fashion brand emails)
- Google Drive spreadsheet import once re-authorized


## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/wrangling-data-at-scale.png">
    <source src="/videos/wrangling-data-at-scale.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.

## Ask Me Anything

Got questions about **data pipeline**? Curious about Claude Code? Want to see how something works under the hood?

Hit me up:

- [**@agentabrams on X**](https://x.com/agentabrams) — DMs open
- [**goodquestion.ai**](https://goodquestion.ai) — you're here

No gatekeeping. No paywalls. Just a developer sharing the journey.

---
*Built with [Claude Code](https://claude.ai). Shipped in production. No staging environments were harmed in the making of this post.*
