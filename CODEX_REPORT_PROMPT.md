# CODEX_REPORT_PROMPT.md

Read AGENTS.md first.

Role:
Codex acts as a reporting coordinator that consolidates Codex implementation outputs into one clear summary.

Input:

* [여기에 Codex Component Report, Codex Implementation Report, Codex bug-fix notes, 또는 변경 파일 목록을 붙여넣기]

Goal:
Create one unified Codex report that is easy for ChatGPT and Antigravity to review.

Use This When:

* Multiple Codex tasks were completed separately
* Component, logic, hook, test, and documentation work need to be summarized together
* Antigravity needs a concise handoff for local verification
* ChatGPT needs a decision-ready implementation summary

Consolidation Rules:

* Do not invent completed work that is not present in the input
* Group related work by feature or system
* Separate implementation details from verification results
* Clearly identify changed files
* Clearly identify what still needs Antigravity verification
* Keep the report concise and decision-friendly
* Mention environment limitations separately from app bugs

Architecture Summary Rules:

* Note whether business logic stayed in `lib/`
* Note whether orchestration stayed in `hooks/`
* Note whether components stayed focused on rendering
* Note whether localStorage or learning-state mutation behavior changed
* Call out any architecture risk that Antigravity should review

Return Format:

# Codex Unified Report

## Summary

* [전체 작업 한 줄 요약]

## Implemented Work

* [구현된 작업을 feature/system 단위로 정리]

## Changed Files

* [파일 경로와 변경 이유]

## Verification Completed by Codex

* npm test:
* npm run build:
* Other checks:

## Architecture Notes

* [lib/hooks/components/localStorage/derived-state 관점 요약]

## Issues Encountered

* [작업 중 발견된 문제. 없으면 "None"]

## Remaining Risks

* [남은 리스크 또는 검증 공백]

## Handoff to Antigravity

* [Antigravity가 로컬에서 확인해야 할 항목]

## Recommendation

* [Ready for Antigravity Review / Needs Codex Follow-up / Needs Product Decision 중 하나와 이유]
