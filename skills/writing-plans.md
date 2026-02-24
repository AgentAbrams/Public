# Skill: Writing Plans

**Use when you have a spec or requirements for a multi-step task** -- before touching code.

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for the codebase. Document everything they need to know: which files to touch, code examples, testing approach, how to verify. Break it into bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about the toolset or problem domain.

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md`

## Bite-Sized Task Granularity

Each step should be one action (2-5 minutes):
- "Write the failing test" -- step
- "Run it to make sure it fails" -- step
- "Implement the minimal code to make the test pass" -- step
- "Run the tests and make sure they pass" -- step
- "Commit" -- step

## Plan Document Header

Every plan should start with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## Task Structure

````markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

**Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

**Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

**Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
````

## Key Principles

- **Exact file paths always** -- never say "somewhere in src/"
- **Complete code in plan** -- not "add validation" but the actual validation code
- **Exact commands with expected output** -- so the implementer knows what success looks like
- **DRY, YAGNI, TDD** -- no unnecessary features, test first, don't repeat yourself
- **Frequent commits** -- commit after every task, not at the end

## After Writing the Plan

Offer the choice:
- **Execute immediately** -- work through tasks one by one in the current session
- **Execute later** -- save the plan and come back to it in a fresh session

Either way, the plan is the source of truth. Follow it task by task.
