# ANTIGRAVITY_REVIEW_PROMPT.md

Read AGENTS.md first.

Role:
Antigravity acts as the tech lead, local build engineer, and integration reviewer.

Task:

* [여기에 검증할 Codex 구현 내용 또는 변경 파일 작성]

Goal:
Verify that the implementation works correctly in the local app, preserves existing behavior, and is safe to keep.

Review Priorities:

* Confirm the implemented feature matches the approved task scope
* Verify the app runs locally without obvious runtime errors
* Check that existing quiz, XP, progress, retry, review, streak, daily goal, achievements, recommendations, weak areas, and concept analytics behavior remains intact
* Identify UX, state, rendering, persistence, or build issues
* Apply only small integration fixes when necessary
* Avoid adding new features during review

Local Verification Checklist:

* Run `npm test`
* Run `npm run build`
* Run the local app when needed
* Check the relevant browser flow on desktop
* Check mobile layout when UI changes are involved, preferably around 390px width
* Verify localStorage behavior when the feature touches saved progress or user state
* Clearly report any environment limitation if a check cannot run

Architecture Review Rules:

* Business logic should remain in `lib/`
* React/localStorage orchestration should remain in `hooks/`
* Components should remain focused on rendering UI
* Derived-state systems should not directly mutate unrelated learning state
* Do not approve broad refactors that are unrelated to the requested feature
* Do not introduce backend logic or new dependencies unless explicitly approved

Documentation Rules:

* If verification changes project status, update `PROJECT_STATUS.md`
* If work is completed, append a chronological entry to `docs/DAILY_LOG.md`
* Before writing timestamps in `docs/DAILY_LOG.md`, check local time with `date`
* Keep status concise and avoid duplicating the full daily log

Return Format:

# Antigravity Report

## Reviewed Work

* [무엇을 검토했는지]

## Local Verification

* npm test:
* npm run build:
* Browser check:
* Mobile check:

## Issues Found

* [발견한 문제]

## Fixes Applied

* [검수 중 직접 수정한 내용. 없으면 "None"]

## Files Changed

* [수정한 파일 목록. 없으면 "None"]

## Remaining Risks

* [남은 리스크 또는 환경 제한]

## Recommendation

* [Approve / Needs Fix / Re-test Required 중 하나와 이유]
