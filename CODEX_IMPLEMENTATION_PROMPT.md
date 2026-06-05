# CODEX_IMPLEMENTATION_PROMPT.md

Read AGENTS.md first.

Role:
Codex acts as the rapid implementation engineer for a small, approved feature or bug fix.

Task:

* [여기에 구현할 기능 또는 수정할 버그 작성]

Goal:
Implement the requested change with minimal scope, preserve existing behavior, and produce a clear implementation report.

Before Implementation:

* Inspect the relevant existing files before editing
* Identify the smallest safe change set
* Follow existing project patterns first
* Avoid broad refactors unless explicitly required
* Clarify assumptions in the report if the task leaves details open

Implementation Rules:

* Reuse existing components, hooks, and helpers when possible
* Keep code modular, readable, and MVP-friendly
* Keep UI logic separated from business logic
* Prefer extending existing systems over creating new ones
* Preserve existing behavior unless the task explicitly changes it
* Do not modify unrelated systems
* Do not add backend logic unless explicitly approved
* Do not add external dependencies unless explicitly approved

Architecture Rules:

* Business logic belongs in `lib/`
* React orchestration and localStorage interaction belong in `hooks/`
* Components should focus on UI rendering
* Prefer derived state over duplicated state
* Avoid introducing new global state unless necessary
* Avoid scattering feature-specific conditions across components
* Do not mutate XP, progress, streak, achievements, recommendations, weak areas, concept analytics, or other learning state from unrelated feature logic

Documentation Rules:

* Update documentation only when the implementation changes project status, roadmap status, or known verification state
* If appending to `docs/DAILY_LOG.md`, check local time with `date` first
* Keep `PROJECT_STATUS.md` concise
* Keep `docs/DAILY_LOG.md` chronological

Verification:

* Run focused tests when the change touches logic
* Run `npm test` when practical
* Run `npm run build` when practical
* Check for obvious runtime or rendering issues
* Clearly report if any verification step cannot run

Return Format:

# Codex Implementation Report

## Implemented Work

* [무엇을 구현했는지]

## Changed Files

* [변경 파일 목록]

## Verification

* npm test:
* npm run build:
* Other checks:

## Issues Encountered

* [작업 중 발견한 문제. 없으면 "None"]

## Potential Risks

* [남은 리스크]

## Suggested Follow-up

* [다음에 하면 좋은 작업]
