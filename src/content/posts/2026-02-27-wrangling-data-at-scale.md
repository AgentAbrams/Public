---
title: "Wrangling Data at Scale"
description: "Mobile bottom sheets need `::before` pseudo-element for pull indicator bar + `panel-visible` class toggle. Lessons learned building in production."
date: 2026-02-27
tags: ["git","api","css","performance","ai","claude"]
---
Founders: this is what one person with AI can ship in a single day. No VC required.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/wrangling-data-at-scale.png">
    <source src="/videos/wrangling-data-at-scale.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Legal Compliance Overhaul, Title Migration, a product manufacturer Pipeline, a vendor Rescan"

> "Performance Optimization, Dream Team Wiring, Task Completion Blitz"

The mission: **data pipeline**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![data pipeline](/images/launch-meme.png)

## What Was Achieved

The headline: **Title Update (product → product): Built `an e-commerce platform-title-product.js` with smart `transformTitle()` — strips "product" from product name, only keeps "product" in vendor suffix. 29,717 products, 96%+ done (28,900/29,717), 7 errors, 0 rate limits. ~11h total runtime.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Title Update (product → product)**: Built `an e-commerce platform-title-product.js` with smart `transformTitle()` — strips "product" from product name, only keeps "product" in vendor suffix. 29,717 products, 96%+ done (28,900/29,717), 7 errors, 0 rate limits. ~11h total runtime.
- **Legal Image Scanner v2**: Rewrote `legal-image-scanner.js` with `all` mode — scans ALL 113 vendor catalog tables. Full settlement terms in Gemini prompt (banana fruit/pods, grapes, birds ANY species, butterflies/moths). 33 keyword pre-filter terms (up from 14). Skips already-reviewed products. Added unique index on SKU to prevent dupes. Cleaned 5 existing duplicates.
- **Legal Review Page**: Created `/review` route on Legal Agent (an internal port) — visual card grid with product images, risk badges (HIGH/MEDIUM/LOW), status badges, "Cleared for Use" / "Remove & Archive" action buttons, lightbox with AI analysis details, auto-refresh. Uses DOM methods for XSS safety.
- **Legal Agent Prompt Update**: Updated Judge's server.js Gemini prompt to match comprehensive scanner terms. Expanded keyword list from 14 to 33.
- **a vendor Legal Scan**: Completed scan of 3,418 products — 47 violations found (birds, butterflies, flamingos, monkeys, banana leaf edge cases). Email sent to Steve.
- **Sara Agent Spec Parser**: Added `parseSpecs()` to extract width, length, expiration_year, material, repeat_v, fire_rating, match_type from body_html. Expiration jumped from 0 to 2,986/3,418 (87%).
- **a product manufacturer Pipeline Complete**: Image crawler finished (3,501/3,849 have all_images), an e-commerce platform image push completed (1,286 products, 4,155 images), email sent.
- **DWTA Disco Audit**: 553 checked, 166 discontinued archived, 387 active, 0 errors.

## The Interesting Part

Here's what caught my attention:

> `{ passive: true }` on scroll listeners prevents jank by telling browser no `preventDefault()` will be called

If you're a founder or small business owner, this is the kind of operational edge that separates you from competitors still doing things manually.

**Quick hits from today:**

- Mobile bottom sheets need `::before` pseudo-element for pull indicator bar + `panel-visible` class toggle
- Spring overshoot easing `cubic-bezier(0.34, 1.56, 0.64, 1)` — the 1.56 overshoots 56% before settling
- Downloaded HTML should include `@media print` for architects printing spec sheets

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Title update: ~800 products remaining, should complete within 20 min
- 48 HIGH-risk + 176 MEDIUM-risk open violations need Steve's review at http://[server]/review
- Product descriptions were mentioned by user but interrupted — may come back up
- Task #72 (Fortune 500 workspace polish) still pending

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
