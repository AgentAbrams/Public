---
title: "Building APIs That Last"
description: "Practical API development lessons from a day of building in production."
date: 2026-03-03
tags: ["three.js","pm2","git","api","css","security"]
---
Founders: this is what one person with AI can ship in a single day. No VC required.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/building-apis-that-last.png">
    <source src="/videos/building-apis-that-last.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Photorealistic workspace Pipeline + Boardroom PBR Backport + Code Review Fixes"

> "Multi-UI Polish: Collapse Fixes, RSS Manager, Collections Cards, Ken Dashboard"

The mission: **API development**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![API development](/images/launch-meme.png)

## What Was Achieved

The headline: **workspace pipeline (dw-war-room/src/workspace/): Built complete 12-module Three.js photorealistic workspace — FigmaTransformer, ProceduralMaps (5 generators), workspaceMaterials (8 PBR materials), workspaceEnvironment (PMREMGenerator IBL), workspaceLayout (corridor/wings/lighting/furniture), workspacePostProcess (6-pass chain: SSAO→Bloom→DOF→ColorGrade→Grain), workspace compositor, and index entry point. 3,153 new lines total.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **workspace pipeline (dw-war-room/src/workspace/)**: Built complete 12-module Three.js photorealistic workspace — FigmaTransformer, ProceduralMaps (5 generators), workspaceMaterials (8 PBR materials), workspaceEnvironment (PMREMGenerator IBL), workspaceLayout (corridor/wings/lighting/furniture), workspacePostProcess (6-pass chain: SSAO→Bloom→DOF→ColorGrade→Grain), workspace compositor, and index entry point. 3,153 new lines total.
- **Boardroom-3D PBR backport**: Created `wr-pbr-materials.js` module (4 procedural normal map generators + material factory). Upgraded wr-wings.js panel material from MeshLambertMaterial→MeshStandardMaterial. Added 4-tier quality preset system to wr-scene.js (performance/balanced/quality/ultra).
- **VCC fetch credential bug fix**: Chrome blocks `fetch()` when page URL contains embedded credentials. Fixed `apiCall()` in VCC server.js with explicit `Authorization: Basic` header.
- **9 critical code review fixes**: Clock double-advance bug, BokehPass uniform safety, PostProcess/Layout/Environment dispose() completeness, resize listener cleanup, animation stop flag, canvas getContext null checks, texture cache overwrite disposal, composer rebuild disposal.
- Three.js `Clock.getElapsedTime()` internally calls `getDelta()` — calling both double-advances the clock. Use only one and track the other manually.
- `PMREMGenerator.fromScene()` returns a render target whose `.texture` you keep but the render target itself must be `.dispose()`d separately.
- `requestAnimationFrame` queues the next callback BEFORE the current frame runs — need a `_running` flag to prevent rendering into disposed targets.
- Boardroom-3D texture disposal ratio improved to 2.10 (88 dispose / 42 new) after fixing cache overwrite leak.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- Visual browser verification of workspace (browser extension kept disconnecting)
- gallery4 room missing ROOM_CENTERS / _deepZoneBounds (pre-existing issue)
- Figma integration testing (Task 12-13 of original plan)
- Gallery tour/audit at 7681/gallery/ (from prior session, never addressed)

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
