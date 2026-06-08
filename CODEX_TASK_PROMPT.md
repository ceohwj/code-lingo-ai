# CODEX_TASK_PROMPT.md

Read AGENTS.md first.

Use this prompt for normal Codex implementation work, component work, bug fixes, and behavior-preserving refactors. Use CODEX_QUIZ_GENERATOR_PROMPT.md for quiz content and CODEX_REPORT_PROMPT.md when consolidating multiple Codex outputs.

## Role

Codex acts as the production implementation engineer for scoped, MVP-friendly changes.

## Task

- [Write the requested feature, fix, component, or refactor here.]

## Goal

Implement the requested change with minimal scope, preserve existing behavior unless explicitly changed, and produce a clear implementation report.

## Before Editing

- Inspect the relevant existing files before editing.
- Identify the smallest safe change set.
- Follow existing project patterns before adding new structure.
- Clarify assumptions in the report when details are open.
- Avoid broad refactors unless the task explicitly asks for refactoring.

## Implementation Rules

- Reuse existing components, hooks, helpers, and CSS patterns when possible.
- Keep code modular, readable, and MVP-friendly.
- Preserve localStorage compatibility and existing saved data behavior.
- Do not modify unrelated systems.
- Do not add backend logic, external dependencies, or global state unless explicitly approved.
- Prefer derived state over duplicated state.
- Keep learning systems loosely coupled.

## Component and UI Rules

- Components should focus on rendering UI and lightweight interactions.
- Match the current project visual style and CSS structure.
- Keep layouts responsive, especially around 390px mobile width.
- Add only the styling needed for the requested change.
- Avoid unnecessary animations, decorative effects, or redesigns outside the task.
- Components must not directly mutate XP, quiz progress, streaks, achievements, recommendations, weak areas, or concept analytics.

## Refactor Rules

- Preserve user-facing behavior and data shape.
- Keep localStorage schema backwards-compatible.
- Remove dead code only when clearly safe.
- Add abstractions only when they reduce real complexity or match existing patterns.
- Keep pure calculations in `lib/`, React/localStorage orchestration in `hooks/`, and UI rendering in `components/`.

## Documentation Rules

- Update documentation only when the change affects project status, roadmap status, prompt workflow, or verification state.
- If appending to `docs/DAILY_LOG.md`, check local time with `date` first.
- Keep `PROJECT_STATUS.md` concise.
- Keep `docs/DAILY_LOG.md` chronological.

## Verification

- Run focused tests when the change touches logic.
- Run `npm test` when practical, especially for app code or package changes.
- Run `npm run build` when app code changes or compilation risk exists.
- For documentation-only changes, confirm links/references and note that tests/build were not required.
- Clearly report any verification step that cannot run.

## Return Format

# Codex Task Report

## Implemented Work

- [What changed.]

## Changed Files

- [Changed file paths and why.]

## Verification

- npm test:
- npm run build:
- Other checks:

## Issues Encountered

- [Use "None" if no issues.]

## Potential Risks

- [Remaining risk or ambiguity.]

## Suggested Follow-up

- [Next useful task.]
