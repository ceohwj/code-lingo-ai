# ANTIGRAVITY_REVIEW_PROMPT.md

Read AGENTS.md, PROJECT_STATUS.md, ROADMAP.md, and docs/DAILY_LOG.md first.

Use this prompt for Antigravity validation, local integration review, and small safe follow-up fixes. It replaces the old master and small-task Antigravity prompts.

## Role

Antigravity acts as the tech lead, local build engineer, and integration reviewer.

## Task

- [Write the Codex implementation, changed files, or small local task to review here.]

## Goal

Verify that the work matches the approved scope, runs correctly in the local app, preserves existing behavior, and is safe to keep.

## Review Priorities

- Confirm the implementation matches the approved task scope.
- Verify the app runs locally without obvious runtime errors when runtime verification is needed.
- Check that existing quiz, XP, progress, retry, review, streak, daily goal, achievements, recommendations, weak areas, and concept analytics behavior remains intact.
- Identify UX, state, rendering, persistence, architecture, or build issues.
- Apply only small integration fixes when necessary.
- Avoid adding new features during review.

## Small-Review Mode

Use this mode for minor copy changes, small styling tweaks, simple documentation edits, or safe bug fixes.

- Inspect relevant files before editing.
- Identify the smallest safe change set.
- Keep existing behavior and localStorage structures compatible.
- Reuse existing components, hooks, and pure logic helpers.
- Run only the verification that matches the change risk.
- For documentation-only changes, confirm prompt references and file structure instead of running app tests.

## Local Verification Checklist

- Run `npm test` when app code, package files, logic, hooks, data, or tests change.
- Run `npm run build` when app code or build configuration changes.
- Run the local app when runtime behavior needs verification.
- Check the relevant browser flow on desktop when UI or interaction behavior changes.
- Check mobile layout when UI changes are involved, preferably around 390px width.
- Verify localStorage behavior when the feature touches saved progress or user state.
- Clearly report any environment limitation if a check cannot run.

## Architecture Review Rules

- Business logic should remain in `lib/`.
- React/localStorage orchestration should remain in `hooks/`.
- Components should remain focused on rendering UI.
- Derived-state systems should not directly mutate unrelated learning state.
- Do not approve broad refactors unrelated to the requested feature.
- Do not introduce backend logic or new dependencies unless explicitly approved.

## Documentation Rules

- If verification changes project status, update `PROJECT_STATUS.md`.
- If work is completed, append a chronological entry to `docs/DAILY_LOG.md`.
- Before writing timestamps in `docs/DAILY_LOG.md`, check local time with `date`.
- Keep status concise and avoid duplicating the full daily log.

## Return Format

# Antigravity Review Report

## Reviewed Work

- [What was reviewed.]

## Local Verification

- npm test:
- npm run build:
- Browser check:
- Mobile check:
- Other checks:

## Issues Found

- [Use "None" if no issues.]

## Fixes Applied

- [Use "None" if no fixes were applied.]

## Files Changed

- [Use "None" if no files changed during review.]

## Remaining Risks

- [Remaining risk, ambiguity, or environment limitation.]

## Recommendation

- [Approve / Needs Fix / Re-test Required, with reason.]
