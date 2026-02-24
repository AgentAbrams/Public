# Skill: Systematic Debugging

**Use when encountering any bug, test failure, or unexpected behavior** -- before proposing fixes.

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## When to Use

Use for ANY technical issue:
- Test failures
- Bugs in production
- Unexpected behavior
- Performance problems
- Build failures
- Integration issues

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

## The Four Phases

Complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?
   - If not reproducible, gather more data -- don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes

4. **Gather Evidence in Multi-Component Systems**
   - For each component boundary: log what enters and exits
   - Verify environment/config propagation
   - Run once to gather evidence showing WHERE it breaks
   - Then investigate that specific component

5. **Trace Data Flow**
   - Where does the bad value originate?
   - What called this with the bad value?
   - Keep tracing up until you find the source
   - Fix at source, not at symptom

### Phase 2: Pattern Analysis

1. **Find Working Examples** -- locate similar working code in the same codebase
2. **Compare Against References** -- read reference implementations completely
3. **Identify Differences** -- list every difference, however small
4. **Understand Dependencies** -- what settings, config, environment does this need?

### Phase 3: Hypothesis and Testing

1. **Form Single Hypothesis** -- "I think X is the root cause because Y"
2. **Test Minimally** -- make the smallest possible change to test
3. **Verify Before Continuing** -- did it work? If not, form a NEW hypothesis
4. **When You Don't Know** -- say so. Don't pretend.

### Phase 4: Implementation

1. **Create Failing Test Case** -- simplest possible reproduction
2. **Implement Single Fix** -- address the root cause, ONE change at a time
3. **Verify Fix** -- test passes? No other tests broken?
4. **If 3+ Fixes Failed: Question Architecture** -- each fix revealing new problems means the pattern is wrong, not just the code

## Red Flags -- STOP and Return to Phase 1

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- Proposing solutions before tracing data flow

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "I'll write test after confirming fix works" | Untested fixes don't stick. Test first proves it. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |
