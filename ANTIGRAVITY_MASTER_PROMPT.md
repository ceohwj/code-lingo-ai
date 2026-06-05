### AI-assisted software engineering workflow - ANTIGRAVITY_MASTER_PROMPT

Read AGENTS.md, PROJECT_STATUS.md, ROADMAP.md, and docs/DAILY_LOG.md first.

Task:
* [여기에 현재 작업 작성]

Before implementation (Planning Phase):
* You must act as the 10 virtual agents defined in AGENTS.md.
* Review the task thoroughly and provide a structured review in your Planning/Implementation Plan:
  - Recommended improvement & MVP priority (High / Medium / Low)
  - Why it helps the learning platform
  - Potential risk or architectural concern
* Keep implementation scope tight: Do not modify more than 1~2 major systems in one task.
* **Stop and present your Implementation Plan for user approval before modifying any files.**

Requirements:
* Keep existing functionality compatible unless explicitly changing it.
* Reuse existing components and hooks when possible. Avoid unnecessary refactors.
* Keep quiz logic and derived analytics strictly separated from UI components.
* Prioritize learning effectiveness and long-term user retention.

Architecture Constraints:
* Feature logic must be derived from existing state in `lib/` helpers where possible.
* Do not scatter feature-specific checks or inline business logic across UI components.
* Keep localStorage and React state orchestration in `hooks/`.
* Achievements and other gamification elements must read existing state and calculate status separately, without directly mutating quiz progress, XP, or streaks.

Documentation Rules:
* PROJECT_STATUS.md: Keep it concise and organized by feature groups. Avoid duplicating daily logs.
* docs/DAILY_LOG.md: Add a chronological entry with the verified local time (Verify with `date` command before writing timestamps).
* ROADMAP.md: Mark completed roadmap items clearly when implemented.

After finishing work (Verification Phase):
* Run unit tests (`npm test` or `node --test`) and production build check (`npm run build`).
* Report any environment limitations clearly if build/test cannot run.
* Update docs/DAILY_LOG.md and PROJECT_STATUS.md.

Final response must include:

# Antigravity Master Report

## Implemented Work
- [작업 완료된 사항 리스트]

## Verification
- Unit Tests (npm test): [Pass 여부 및 테스트 개수]
- Production Build (npm run build): [Pass 여부]

## Agent Review Report
*(Include comments from CPO/PM, Learning Experience, UI, Refactor, Test, Documentation, Architecture, Growth, and Portfolio Strategy Agents)*
- PM Agent: [의견]
- Learning Experience Agent: [의견]
- UI Agent: [의견]
- Refactor Agent: [의견]
- Test Agent: [의견]
- Documentation Agent: [의견]
- Architecture Agent: [의견]
- Growth Agent: [의견]
- Portfolio Strategy Agent: [의견]

## Selected Approach
- [선택한 구현 방식 설명]

## Next Recommended Task
- [기획 및 아키텍처 관점에서 추천하는 다음 작업]
