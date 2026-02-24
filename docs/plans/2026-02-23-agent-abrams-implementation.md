# Agent Abrams Blog — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deploy a static Astro blog at goodquestion.ai authored by Agent Abrams, with 5 backdated posts and a public GitHub repo containing the blog source + curated Claude Code skills.

**Architecture:** Astro static site generator builds markdown posts into HTML. A lightweight Node static server (serve) runs on port 9883 behind existing nginx reverse proxy. Cloudflare handles DNS/CDN. GitHub repo `Stevemdr/AgentAbrams` is the public home for blog source and skills.

**Tech Stack:** Astro 5.x, Markdown, Node.js 20, PM2, nginx, Cloudflare, GitHub

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `/root/Projects/goodquestion-ai/package.json`
- Create: `/root/Projects/goodquestion-ai/astro.config.mjs`
- Create: `/root/Projects/goodquestion-ai/tsconfig.json`

**Step 1: Initialize Astro project**

```bash
cd /root/Projects/goodquestion-ai
npm create astro@latest . -- --template blog --install --no-git --typescript relaxed
```

If the interactive installer causes issues, fall back to manual init:

```bash
npm init -y
npm install astro @astrojs/mdx @astrojs/sitemap
```

**Step 2: Configure Astro for production**

Edit `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goodquestion.ai',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
```

**Step 3: Verify build works**

Run: `cd /root/Projects/goodquestion-ai && npx astro build`
Expected: Build succeeds, `dist/` directory created

**Step 4: Commit**

```bash
cd /root/Projects/goodquestion-ai
git init
git add -A
git commit -m "feat: scaffold Astro blog project"
```

---

### Task 2: Create Blog Layout and Styles

**Files:**
- Create: `src/layouts/BlogLayout.astro`
- Create: `src/layouts/PostLayout.astro`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `public/favicon.svg`

**Step 1: Create global styles**

Create `src/styles/global.css` with a clean, dark-mode-friendly developer blog theme:
- Monospace font for code, system font stack for body
- Dark background (#0d1117), light text (#c9d1d9) — GitHub-dark inspired
- Accent color: electric blue (#58a6ff)
- Responsive layout, max-width 720px content area
- Code block styling with syntax highlight compatibility
- Post card styling for the index page

**Step 2: Create BlogLayout.astro**

Main site layout with:
- `<head>` with meta tags, Open Graph, favicon
- Header: "goodquestion.ai" logo/title + nav (Home, About, GitHub)
- `<slot />` for page content
- Footer: "Agent Abrams" + current year
- Import global.css

**Step 3: Create PostLayout.astro**

Extends BlogLayout. Adds:
- Post title as `<h1>`
- Date + reading time + tags
- `<slot />` for markdown content
- Previous/Next post navigation (optional, can add later)

**Step 4: Create index.astro**

Homepage that:
- Lists all posts from `src/content/posts/` sorted by date (newest first)
- Shows title, date, excerpt (first 160 chars of description)
- Links to each post

**Step 5: Create about.astro**

Static page:
- "About Agent Abrams" — developer alias, Claude Code power user
- What this blog is about: daily journey, challenges, code
- Link to GitHub repo
- No mention of specific businesses

**Step 6: Create favicon.svg**

Simple SVG — the letters "AA" in a terminal-style font, electric blue on transparent.

**Step 7: Verify build**

Run: `cd /root/Projects/goodquestion-ai && npx astro build`
Expected: Build succeeds

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add blog layout, styles, index, and about page"
```

---

### Task 3: Content Collection and Post Template

**Files:**
- Create: `src/content/config.ts`
- Create: `src/pages/posts/[...slug].astro`

**Step 1: Define content collection schema**

Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Agent Abrams'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

**Step 2: Create dynamic post route**

Create `src/pages/posts/[...slug].astro` that:
- Uses `getStaticPaths()` to generate pages from content collection
- Renders post content using PostLayout
- Passes frontmatter (title, date, tags) as props

**Step 3: Verify with a test post**

Create `src/content/posts/test.md`:

```markdown
---
title: "Test Post"
description: "Testing the content collection"
date: 2026-02-23
tags: ["test"]
---

Hello world. This is a test post.
```

Run: `npx astro build`
Expected: Build succeeds, `dist/posts/test/index.html` exists

**Step 4: Remove test post and commit**

```bash
rm src/content/posts/test.md
git add -A
git commit -m "feat: add content collection schema and post routing"
```

---

### Task 4: Write the 5 Blog Posts

**Files:**
- Create: `src/content/posts/2026-02-19-zone-culling-nearly-killed-my-3d-app.md`
- Create: `src/content/posts/2026-02-20-building-a-skill-system-for-claude-code.md`
- Create: `src/content/posts/2026-02-21-the-animation-loop-that-wouldnt-animate.md`
- Create: `src/content/posts/2026-02-22-parallel-agents-74-processes-one-server.md`
- Create: `src/content/posts/2026-02-23-when-your-ai-writes-a-blog.md`

**CRITICAL SECURITY RULES FOR ALL POSTS:**
- NEVER mention: Designer Wallcoverings, DW, Shopify store names, vendor names (Arte, Elitis, Schumacher, etc.), IP addresses, port numbers, database credentials, API keys
- Use generic references: "a client project", "an e-commerce platform", "a 3D showroom app", "a multi-vendor catalog"
- Code examples must be standalone and reusable — no DW-specific imports or references
- No internal file paths from DW-Agents

**Step 1: Write Post 1 — "Zone Culling Nearly Killed My 3D App" (Feb 19)**

Format: War Story
Content themes:
- Building a 3D visualization with Three.js
- Implemented zone-based culling to optimize performance (hide objects not in camera view)
- The culling was TOO aggressive — hid 2041 of 2320 objects, causing black screens
- Solution: disabled custom culling, let Three.js built-in frustum culling handle it
- Lesson: don't optimize what the framework already does well
- Include code snippet: simple Three.js frustum culling example
- ~600-800 words

**Step 2: Write Post 2 — "Building a Skill System for Claude Code" (Feb 20)**

Format: Tutorial
Content themes:
- What Claude Code skills are and why they matter
- Anatomy of a skill: name, description, trigger conditions, instructions
- Example: building a simple "debugging" skill from scratch
- How skills chain together (brainstorming → writing-plans → executing)
- Share a template skill structure others can use
- Include full code: a starter skill template
- ~800-1000 words

**Step 3: Write Post 3 — "The Animation Loop That Wouldn't Animate" (Feb 21)**

Format: Developer Journal
Content themes:
- A render loop that stopped rendering — screen frozen
- The detective work: tracing through 30,000 lines to find a single boolean
- `_meetingActive` flag was set to `true` and never cleared
- The guard clause `if (_meetingActive) return` skipped ALL rendering
- Lesson: guard clauses are gates — make sure they open
- Include code snippet: simplified animation loop with guard clause pattern
- ~500-700 words

**Step 4: Write Post 4 — "Parallel Agents: 74 Processes, One Server" (Feb 22)**

Format: Tutorial
Content themes:
- Running 74 Node.js processes on a single VPS with PM2
- PM2 ecosystem file configuration
- Monitoring: `pm2 monit`, log rotation, memory limits
- Auto-restart strategies and graceful shutdown
- Real numbers: memory usage patterns, process management at scale
- Include code: PM2 ecosystem.config.js example, monitoring script
- ~800-1000 words

**Step 5: Write Post 5 — "When Your AI Writes a Blog About Writing a Blog" (Feb 23)**

Format: Journal/Meta
Content themes:
- The inception moment: using Claude Code to build a blog about using Claude Code
- Why journaling your dev journey matters (even if nobody reads it)
- The brainstorming → planning → building workflow this blog itself went through
- What Agent Abrams is and isn't (a developer, not a fictional AI)
- What's coming next: daily posts, open-source skills, a GitHub repo
- ~500-700 words

**Step 6: Verify all posts build**

Run: `npx astro build`
Expected: Build succeeds, 5 post pages in `dist/posts/`

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add 5 inaugural blog posts"
```

---

### Task 5: Deploy to Production

**Files:**
- Modify: `/etc/nginx/sites-enabled/goodquestion.ai` (if changes needed)
- Create: `/root/Projects/goodquestion-ai/ecosystem.config.js`

**Step 1: Install static file server**

```bash
cd /root/Projects/goodquestion-ai
npm install serve
```

**Step 2: Build for production**

```bash
npx astro build
```

**Step 3: Create PM2 ecosystem file**

Create `ecosystem.config.js`:

```js
module.exports = {
  apps: [{
    name: 'goodquestion-blog',
    script: 'npx',
    args: 'serve dist -l 9883 -s',
    cwd: '/root/Projects/goodquestion-ai',
    env: { NODE_ENV: 'production' },
    max_memory_restart: '100M',
  }],
};
```

**Step 4: Start with PM2**

```bash
cd /root/Projects/goodquestion-ai
pm2 start ecosystem.config.js
pm2 save
```

**Step 5: Verify site is live**

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:9883
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" https://goodquestion.ai
# Expected: 200
```

**Step 6: Commit**

```bash
git add ecosystem.config.js package.json package-lock.json
git commit -m "feat: add PM2 deployment config"
```

---

### Task 6: Create GitHub Repo and Security Hardening

**Files:**
- Create: `/root/Projects/goodquestion-ai/.gitignore`
- Create: `/root/Projects/goodquestion-ai/.githooks/pre-commit`

**Step 1: Create .gitignore**

```
node_modules/
dist/
.env
.env.*
*.key
*.pem
*.crt
credentials*
.DS_Store
```

**Step 2: Create pre-commit security hook**

Create `.githooks/pre-commit` that scans staged files for:
- Patterns: `DW-Agents`, `Designer Wallcoverings`, `DWSecure`, API key formats (`AIza`, `ghp_`, `sk-`), IP addresses (`\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`), connection strings (`postgresql://`, `mongodb://`)
- If any match found: print warning and block commit

```bash
#!/bin/bash
BLOCKED_PATTERNS="DW-Agents|Designer.Wallcoverings|DWSecure|AIzaSy|ghp_|sk-[a-zA-Z]|postgresql://|mongodb://|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]"

FILES=$(git diff --cached --name-only --diff-filter=ACM)
if [ -z "$FILES" ]; then exit 0; fi

MATCHES=$(echo "$FILES" | xargs grep -lE "$BLOCKED_PATTERNS" 2>/dev/null)
if [ -n "$MATCHES" ]; then
  echo "SECURITY BLOCK: Potential secrets found in:"
  echo "$MATCHES"
  echo "Review and remove sensitive content before committing."
  exit 1
fi
exit 0
```

```bash
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
```

**Step 3: Create public GitHub repo**

```bash
gh repo create Stevemdr/AgentAbrams --public --description "Agent Abrams — Claude Code journey, skills, and tools" --clone=false
```

**Step 4: Set up repo structure for GitHub**

The local project becomes the `blog/` subdirectory in the repo. Options:
- Option A: Make the blog root the repo root, add `skills/` alongside
- Option B: Create a wrapper repo with `blog/` and `skills/` subdirectories

Recommended: **Option A** — blog IS the repo root, `skills/` is a top-level directory.

Add to the project:
- `README.md` — Agent Abrams intro, blog link, skills index
- `LICENSE` — MIT
- `skills/README.md` — How to use these skills in Claude Code

**Step 5: Push to GitHub**

```bash
cd /root/Projects/goodquestion-ai
git remote add origin https://github.com/Stevemdr/AgentAbrams.git
git branch -M main
git push -u origin main
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add security hooks, README, LICENSE, and skills directory"
git push
```

---

### Task 7: Add Curated Skills to Repo

**Files:**
- Create: `skills/README.md`
- Create: `skills/brainstorming.md`
- Create: `skills/debugging.md`
- Create: `skills/writing-plans.md`
- Create: `skills/tdd.md`

**Step 1: Identify skills safe to share**

Review skills in `/root/.claude/plugins/cache/claude-plugins-official/superpowers/`. Select general-purpose skills that contain NO business-specific logic:
- brainstorming
- systematic-debugging
- writing-plans
- test-driven-development
- verification-before-completion

**Step 2: Create sanitized copies**

For each selected skill:
- Copy the skill content
- Remove any DW-specific references, file paths, or business logic
- Ensure they are fully standalone and useful to any developer
- Add a header explaining what the skill does and how to install it

**Step 3: Create skills/README.md**

Index of all published skills with descriptions and usage instructions.

**Step 4: Commit and push**

```bash
git add skills/
git commit -m "feat: add curated Claude Code skills"
git push
```

---

### Task 8: Final Verification

**Step 1: Verify blog is accessible**

```bash
curl -s https://goodquestion.ai | grep "Agent Abrams"
curl -s https://goodquestion.ai/posts/2026-02-19-zone-culling-nearly-killed-my-3d-app/ | grep "<h1>"
```

**Step 2: Verify GitHub repo is public and complete**

```bash
gh repo view Stevemdr/AgentAbrams --json name,visibility,description
```

**Step 3: Run pre-commit hook test**

Create a test file with a fake secret, try to commit, verify it blocks:

```bash
echo "password=DWSecure2024" > test-secret.txt
git add test-secret.txt
git commit -m "test" # Should FAIL
rm test-secret.txt
git reset HEAD test-secret.txt
```

**Step 4: Verify PM2 process health**

```bash
pm2 show goodquestion-blog
```

**Step 5: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final verification cleanup"
git push
```
