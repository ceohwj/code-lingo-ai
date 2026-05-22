 ### AI-assisted software engineering workflow

Read AGENTS.md, PROJECT_STATUS.md, ROADMAP.md, and docs/DAILY_LOG.md first.

Task:
* [여기에 현재 작업 작성]

Before implementation:
* Every agent defined in AGENTS.md must review the task.
* Each agent must provide:
  - Recommended improvement
  - Why it helps the learning platform
  - MVP priority (High / Medium / Low)
  - Risk or concern
* Prioritize:
  - learning effectiveness
  - long-term retention
  - scalability
  - maintainability
* Choose the most MVP-friendly implementation approach.
* Do not implement unnecessary extra features.

Requirements:
* Keep existing functionality compatible unless explicitly changing it.
* Reuse existing components when possible.
* Avoid unnecessary refactors.
* Keep code modular and maintainable.
* Keep architecture scalable.
* Keep quiz logic separated from UI logic.
* Prioritize learning effectiveness and long-term user retention over adding many features.

Architecture Constraints:
* Feature logic must be derived from existing state when possible.
* Do not scatter feature-specific checks across UI components.
* Keep pure business logic in lib/.
* Keep localStorage and React state orchestration in hooks/.
* Keep components focused on rendering UI.
* New systems such as achievements must not directly mutate quiz progress, XP, streak, daily goal, or category progress unless explicitly required.
* Achievement logic should read existing state and calculate unlock status separately.

Documentation Rules:
* PROJECT_STATUS.md should stay concise and organized by feature groups.
* DAILY_LOG.md should be chronological only and should not duplicate the full project status.
* ROADMAP.md should focus on future priorities and major milestones.
* Mark completed roadmap items clearly when implemented.
* Avoid duplicating detailed daily logs inside PROJECT_STATUS.md.
* Keep documentation readable and scalable as the project grows.

After finishing work:
* Update PROJECT_STATUS.md
* Append today's progress to docs/DAILY_LOG.md
* Include:
  - Today’s Goal
  - Completed Work
  - Issues
  - Verification
  - Next Tasks
  - Codex Report
* Run npm test
* Run npm run build
* Clearly report any environment limitations if build/test cannot run

Final response must include:

# Codex Report

## Implemented Work
-

## Verification
- npm test:
- npm run build:

## Agent Review Report

### Product Manager Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Learning Experience Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Quiz Generator Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### UI Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Refactor Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Test Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Documentation Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Architecture Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Growth Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

### Portfolio Strategy Agent
- Recommended improvement:
- Reason:
- MVP priority:
- Risk:

## Selected Approach
-

## Remaining Issues
-

## Next Recommended Task
-

