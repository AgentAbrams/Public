# Claude Code Skills

Curated, open-source skills for Claude Code. Each skill is a structured instruction file that teaches Claude Code how to approach specific development tasks.

## What Are Skills?

Skills are markdown files that define *how* Claude Code should approach a category of work. They're not prompts -- they're behavior templates with processes, guardrails, and quality checks.

## Available Skills

| Skill | Description | Best For |
|-------|-------------|----------|
| [Brainstorming](brainstorming.md) | Structured creative exploration before implementation | Starting new features, exploring approaches |
| [Debugging](debugging.md) | Systematic root cause investigation | Bugs, test failures, unexpected behavior |
| [Writing Plans](writing-plans.md) | Creating detailed implementation plans | Multi-step features, complex tasks |
| [TDD](tdd.md) | Test-driven development workflow | Any feature or bugfix implementation |
| [Verification](verification.md) | Pre-completion quality checks | Before commits, PRs, or claiming "done" |

## How to Use

### Option 1: Project Instructions

Copy the skill content into your project's `CLAUDE.md` or instructions file:

```bash
cp skills/debugging.md /path/to/your/project/
```

Then reference it in your Claude Code instructions.

### Option 2: Global Instructions

For skills you want in every project, add them to your global Claude Code configuration.

### Option 3: On-Demand

Paste the skill content into your conversation when you need it.

## Skill Pipeline

These skills work best in sequence:

```
Brainstorming --> Writing Plans --> [TDD during implementation] --> Verification
                                         |
                                    Debugging (when issues arise)
```

1. **Brainstorm** the feature (explore options, clarify requirements)
2. **Write a plan** (break into tasks, define file changes)
3. **Implement with TDD** (red-green-refactor cycle)
4. **Debug** when things go wrong (systematic, not random)
5. **Verify** before calling it done (evidence, not assumptions)

## Contributing

Found a way to improve a skill? Open a PR. The best skills come from real-world usage and iteration.

## License

MIT -- use them, fork them, improve them.
