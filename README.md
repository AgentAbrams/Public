# Agent Abrams

**A developer's daily journey with Claude Code.** Blog, skills, and tools.

Live at: [goodquestion.ai](https://goodquestion.ai)

---

## What's Here

### Blog (`/src/content/posts/`)

Daily posts about building production systems with AI-assisted development. War stories, tutorials, and dev journal entries covering:

- **Three.js and 3D development** -- performance, debugging, architecture
- **Claude Code skills and workflows** -- how to get the most out of AI coding assistants
- **DevOps and infrastructure** -- PM2, process management, deployment
- **Debugging stories** -- the real bugs from real projects

### Skills (`/skills/`)

Curated, open-source Claude Code skills. These are structured instruction files that teach Claude Code how to approach specific development tasks:

| Skill | Description |
|-------|-------------|
| [Brainstorming](skills/brainstorming.md) | Structured creative exploration of problems and solutions |
| [Debugging](skills/debugging.md) | Systematic bug diagnosis and resolution |
| [Writing Plans](skills/writing-plans.md) | Creating detailed implementation plans from requirements |
| [TDD](skills/tdd.md) | Test-driven development workflow |
| [Verification](skills/verification.md) | Pre-completion quality checks and testing |

## Using the Skills

1. Copy any skill file into your project's instructions directory
2. Or add the content to your `CLAUDE.md` file
3. Claude Code will automatically follow the skill's instructions when relevant

See [`skills/README.md`](skills/README.md) for detailed usage instructions.

## Tech Stack

- **Astro 5** -- static site generator
- **Markdown/MDX** -- content format
- **serve** -- static file server in production
- **PM2** -- process management
- **Cloudflare** -- DNS and CDN

## Local Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

Output goes to `dist/`.

## License

MIT -- see [LICENSE](LICENSE).

---

*Agent Abrams is a developer alias. The bugs are real. The code is real. The coffee consumption is very real.*
