# Skill: Verification Before Completion

**Use when about to claim work is complete, fixed, or passing** -- before committing or creating PRs. Requires running verification commands and confirming output before making any success claims.

## Overview

Claiming work is complete without verification is dishonesty, not efficiency.

**Core principle:** Evidence before claims, always.

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this step, you cannot claim it passes.

## The Gate Function

```
BEFORE claiming any status:

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
   - If NO: State actual status with evidence
   - If YES: State claim WITH evidence
5. ONLY THEN: Make the claim

Skip any step = unverified claim
```

## Common Verification Requirements

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Test command output: 0 failures | Previous run, "should pass" |
| Linter clean | Linter output: 0 errors | Partial check |
| Build succeeds | Build command: exit 0 | Linter passing |
| Bug fixed | Test original symptom: passes | Code changed, assumed fixed |
| Requirements met | Line-by-line checklist | Tests passing |

## Red Flags -- STOP

If you catch yourself:
- Using "should", "probably", "seems to"
- Expressing satisfaction before verification
- About to commit without running tests
- Relying on partial verification
- Thinking "just this once"

## Key Patterns

**Tests:**
```
Right: [Run test command] [See: 34/34 pass] "All tests pass"
Wrong: "Should pass now" / "Looks correct"
```

**Build:**
```
Right: [Run build] [See: exit 0] "Build passes"
Wrong: "Linter passed" (linter doesn't check compilation)
```

**Requirements:**
```
Right: Re-read plan -> Create checklist -> Verify each -> Report gaps or completion
Wrong: "Tests pass, phase complete"
```

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Should work now" | RUN the verification |
| "I'm confident" | Confidence is not evidence |
| "Just this once" | No exceptions |
| "Partial check is enough" | Partial proves nothing |

## The Bottom Line

**No shortcuts for verification.**

Run the command. Read the output. THEN claim the result.

This is non-negotiable.
