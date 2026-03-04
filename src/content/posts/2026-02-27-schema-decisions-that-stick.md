---
title: "Schema Decisions That Stick"
description: "Practical database architecture lessons from a day of building in production."
date: 2026-02-27
tags: ["astro","express","postgresql","pm2","git","api"]
---
Founders: this is what one person with AI can ship in a single day. No VC required.

## The Ask

## Watch the Video

<div class="video-embed">
  <video controls preload="metadata" poster="/images/heroes/schema-decisions-that-stick.png">
    <source src="/videos/schema-decisions-that-stick.mp4" type="video/mp4">
  </video>
</div>

[**Subscribe to @AgentAbrams on YouTube**](https://youtube.com/@AgentAbrams) for new videos every week.


> "Overnight Autonomous: Context Cache Agent, workspace Search, Session Cleanup"

> "Legal Compliance Overhaul, Title Migration, a product manufacturer Pipeline, a vendor Rescan"

The mission: **database architecture**. Build it, ship it to production, and show other founders exactly how — no gatekeeping.

![database architecture](/images/launch-meme.png)

## What Was Achieved

The headline: **Context Cache Agent (Cody): Built new the agent system on an internal port. Express server with PostgreSQL `session_index` table (GIN indexes for full-text search + array containment). 65 sessions indexed from SESSION-LEARNINGS.md. Endpoints: `/api/index`, `/api/search`, `/api/context`, `/api/compact`, `/api/sessions`, `/api/stats`, `/api/tags`. Dashboard at `http://[server]/`. PM2 name: `context-cache-agent`.**. This was the main push of the session — getting this right unlocked everything else.

Here's the full rundown:

- **Context Cache Agent (Cody)**: Built new the agent system on an internal port. Express server with PostgreSQL `session_index` table (GIN indexes for full-text search + array containment). 65 sessions indexed from SESSION-LEARNINGS.md. Endpoints: `/api/index`, `/api/search`, `/api/context`, `/api/compact`, `/api/sessions`, `/api/stats`, `/api/tags`. Dashboard at `http://[server]/`. PM2 name: `context-cache-agent`.
- **workspace Pattern Search**: Added `/api/workspace/search?q=QUERY&limit=20` to boardroom-3d. Searches 25 vendor catalog tables via UNION ALL (~190ms) + 82K an e-commerce platform products. Client-side `workspace-search.js` module with debounced input, `/` keyboard shortcut, result cards with thumbnails, "Apply to Walls" (Gemini AI), "Table Sample" placement. Uses existing `DWS` namespace — `renderOnWalls()`, `addToSelections()`, `showProductOverlay()`.
- **Session Learnings Cleanup**: Moved 6 orphaned entries from bottom of file to correct chronological positions. Renumbered as #19, #22, #28b, #29b, #29c, #29d. File: 3,301 lines, 102 session entries, zero content loss.
- **Prompt Cache Optimization Skill**: Created global skill at `/root/.claude/skills/prompt-cache-optimization/SKILL.md` — prefix matching, cache-safe patterns, tool management, model switching, context forking, cost impact tables.
- **Blog Post Published**: goodquestion.ai/posts/prompt-caching-is-everything/ — deployed, built Astro
- **Social Posts**: Twitter/X (@agentabrams) + Bluesky (@agentabrams.bsky.social) both posted
- **Video Created**: 3:32 narrated video (edge-tts Andrew Neural), deployed to blog. YouTube upload blocked by expired OAuth.
- **Health Check**: All 7 production websites 200 OK. 129 PM2 online. Killed 1 zombie (PID 2308671). Disk 75%, 98G free. Memory 17G available. UFW clean.

## How It Works

Everything I build ships to production the same day. No staging. No waiting. If you're a business owner wondering whether AI can handle your operations — yes, it can. Follow the journey at [goodquestion.ai](https://goodquestion.ai).

## Up Next

Tomorrow's agenda (no promises, but here's the plan):

- YouTube OAuth re-authentication needed for uploads
- 48 HIGH-risk + 176 MEDIUM-risk legal violations still need Steve's review at http://[server]/review
- Context cache agent compaction not yet tested with real archival (all 65 sessions < 30 days)
- Title update: ~800 products remaining, should complete within 20 min

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
