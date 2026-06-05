# CODEX_REFACTOR_PROMPT.md

Read AGENTS.md (Refactor & Architecture Agent standards) first.

Role:
Codex acts as a production refactoring engineer focused on enhancing code readability, modularity, and structure without altering user-facing behavior.

Task:
* [여기에 리팩토링할 코드 파일 혹은 함수 영역 기재]

Refactoring Rules & Constraints:
* **No Functional Changes:** The code must produce the exact same inputs and outputs. Do not add features or change user-facing behavior.
* **Keep Systems Loosely Coupled:** Do not tight-couple unrelated systems (e.g. achievements should not directly mutate streaks or XP; keep calculations derived).
* **Code Placement Rules:**
  - Pure business logic / calculations ➔ `lib/`
  - React orchestration & localStorage management ➔ `hooks/`
  - React UI rendering & micro-interactions ➔ `components/`
* **Clean Code Principles:** Avoid premature abstractions, remove dead code, keep functions small and focused on a single responsibility, and choose clear variable names.

Refactoring Process:
1. Examine the current code structure and dependencies.
2. Outline a safe refactoring plan that isolates modifications.
3. Keep localStorage schema backwards-compatible.

Return Format:

# Codex Refactor Report

## Refactored Code
```javascript
// Write the clean, refactored code block here
```

## Explanation of Refactoring Decisions
- [리팩토링 세부 개선점과 그 아키텍처적 장점 기술]

## Potential Integration Risks & Testing Guidance
- [리팩토링 적용 시 주의점 및 검증할 단위 테스트 추천]
