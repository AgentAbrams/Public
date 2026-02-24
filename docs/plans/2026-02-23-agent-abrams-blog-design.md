# Agent Abrams Blog — Design Document

**Date**: 2026-02-23
**Author**: Agent Abrams (Steve)
**Domain**: goodquestion.ai
**Status**: Approved

---

## Overview

A developer blog at goodquestion.ai authored by "Agent Abrams" — a developer alias for Steve. Journals the daily Claude Code experience: challenges, solutions, and reusable code. All content is sanitized to protect client business details.

Public GitHub repo `Stevemdr/AgentAbrams` hosts the blog source and curated Claude Code skills.

## Architecture

```
goodquestion.ai (Cloudflare) → nginx:443 → localhost:9883
                                              ↓
                                    Astro Static Site
                                    /root/Projects/goodquestion-ai/
```

- **Framework**: Astro (static site generator)
- **Posts**: Markdown with frontmatter
- **Hosting**: Static files served via lightweight Node server on port 9883
- **Proxy**: Existing nginx config proxies 443 → 9883
- **Process**: PM2 managed as `goodquestion-blog`

## Directory Structure

```
/root/Projects/goodquestion-ai/
├── astro.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── layouts/
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── posts/
│   │       └── [...slug].astro
│   ├── content/
│   │   └── posts/
│   │       ├── 2026-02-19-zone-culling-nearly-killed-my-3d-app.md
│   │       ├── 2026-02-20-building-a-skill-system-for-claude-code.md
│   │       ├── 2026-02-21-the-animation-loop-that-wouldnt-animate.md
│   │       ├── 2026-02-22-parallel-agents-74-processes-one-server.md
│   │       └── 2026-02-23-when-your-ai-writes-a-blog.md
│   └── styles/
│       └── global.css
└── .gitignore
```

## GitHub Repo: Stevemdr/AgentAbrams

```
AgentAbrams/
├── blog/          # Full Astro blog source
├── skills/        # Curated, sanitized Claude Code skills
│   ├── README.md
│   └── (selected skills)
├── README.md
├── LICENSE        # MIT
└── .gitignore
```

## Security Model

1. **Pre-commit hook**: Regex scan for API keys, passwords, IP addresses, DB strings. Blocks commit on match.
2. **`.gitignore`**: Blocks `.env`, `*.key`, `*.pem`, `credentials*`, DW-specific paths
3. **Content policy**: No business names, no vendor names, no internal URLs. Generic references only.
4. **Skill sanitization**: Skills copied and stripped of business-specific logic before publishing.
5. **Separate git remote**: Zero connection to DW-Agents repo.

## Content Plan — 5 Backdated Posts

| Date | Title | Format | Topic |
|------|-------|--------|-------|
| Feb 19 | Zone Culling Nearly Killed My 3D App | War Story | Debugging aggressive object culling in Three.js |
| Feb 20 | Building a Skill System for Claude Code | Tutorial | Creating reusable skills with templates |
| Feb 21 | The Animation Loop That Wouldn't Animate | Journal | Tracing a stale boolean through 30K lines |
| Feb 22 | Parallel Agents: 74 Processes, One Server | Tutorial | PM2 at scale — monitoring, restart, log rotation |
| Feb 23 | When Your AI Writes a Blog About Writing a Blog | Journal/Meta | Day one of Agent Abrams, why journaling matters |

## Deployment

- Build: `astro build` → `dist/`
- Serve: PM2 process `goodquestion-blog` on port 9883
- Deploy: git push → rebuild → PM2 restart
- Port 9883: internal only, nginx proxies from 443
