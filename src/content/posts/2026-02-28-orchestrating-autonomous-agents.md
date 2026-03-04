---
title: "Orchestrating Autonomous Agents"
description: "Practical multi-agent systems lessons from a day of building in production."
date: 2026-02-28
tags: ["three.js","astro","express","postgresql","pm2","git"]
---
Founders: this is what one person with AI can ship in a single day. No VC required.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/orchestrating-autonomous-agents.png">
    <source src="/videos/orchestrating-autonomous-agents.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "workspace Major UX Overhaul: WASD, Minimap, TV, Visual Polish"

> "Overnight Autonomous: Context Cache Agent, workspace Search, Session Cleanup"

The mission: **multi-agent systems**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![multi-agent systems](/images/launch-meme.png)

## What Was Achieved

The headline: **Camera Animation Fix: Replaced nested `requestAnimationFrame` chain in `smoothCameraTo` with clock-based lerp inside main `animate()` loop. Uses `clock.getDelta()` (capped at 100ms) for frame-rate-independent animation. Prevents background-tab throttling and rAF chain fights.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Camera Animation Fix**: Replaced nested `requestAnimationFrame` chain in `smoothCameraTo` with clock-based lerp inside main `animate()` loop. Uses `clock.getDelta()` (capped at 100ms) for frame-rate-independent animation. Prevents background-tab throttling and rAF chain fights.
- **WASD Navigation**: Added first-person keyboard walking (WASD + arrows). Movement is relative to camera facing direction, moves both camera and orbit target together. Frame-rate independent via `dt` from clock. Disabled when focused on a wing or during camera animation.
- **Floor Plan Minimap**: 2D HTML canvas overlay (160x128px) showing room layout from above — walls, door, vendor rack positions (color-coded), table, camera dot + direction arrow. Toggleable with M key. Updates every 10 frames.
- **TV Slideshow**: Dynamic CanvasTexture on the brick wall TV. Cycles through real product data (vendor, pattern name, color, SKU) every 5 seconds with colored backgrounds and the client branding.
- **Crown Molding**: BoxGeometry trim along all 4 ceiling edges for architectural detail.
- **the client Entrance Sign**: 512x128 CanvasTexture above doorway: "a client project / the workspace location workspace".
- **Vendor Labels Upgraded**: Colored background strips matching vendor brand colors (a product manufacturer blue, a heritage manufacturer red, a luxury vendor yellow, a French design house orange) with white text — much more readable.
- **Floor Improved**: Upgraded to `MeshPhongMaterial` with subtle shininess and tile grid pattern.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Steve wants "dream team run autonomously for 24 hours" — continue other system improvements
- Boardroom agent redesign plan at `/root/.claude/plans/flickering-seeking-quilt.md` (Steps 1-8)
- 48 HIGH-risk + 176 MEDIUM-risk legal violations need Steve's review
- YouTube OAuth re-authentication needed for uploads

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
