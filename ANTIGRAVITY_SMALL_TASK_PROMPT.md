### AI-assisted software engineering workflow - ANTIGRAVITY_SMALL_TASK_PROMPT

Read AGENTS.md, PROJECT_STATUS.md, and docs/DAILY_LOG.md first.

Task:
* [여기에 소규모 작업/버그 수정 작성]

Goal:
Implement only the requested fix or tweak with minimal scope changes and high execution safety.

Requirements:
* Do not start broad refactors or add extra features outside the task scope.
* Keep existing behavior and localStorage structures fully compatible.
* Reuse existing components, hooks, and pure logic helpers.
* Keep the code clean, modular, and readable.

Verification Rules:
* Inspect relevant files before editing.
* Identify the smallest safe change set.
* Run focused tests or the overall unit tests (`npm test` or `node --test`).
* Run production build check (`npm run build`) to ensure no syntax/compilation issues.

Documentation Rules:
* Append a chronological entry to `docs/DAILY_LOG.md` (Verify local time with `date` before writing).
* Update `PROJECT_STATUS.md` if any feature status changes.

Final response must include:

# Antigravity Small Task Report

## Implemented Work
- [구현 및 수정 사항 리스트]

## Changed Files
- [수정된 파일 목록]

## Verification
- Unit Tests (npm test): [Pass 여부]
- Production Build (npm run build): [Pass 여부]

## Potential Risks & Side Effects
- [부작용 및 리스크 검토 결과]
