# CodeLingo AI Workflow

This project uses a lightweight multi-agent workflow so product decisions, implementation, and local validation stay separate.

## Agent Roles

### ChatGPT
- Acts as product owner, planning partner, and architecture reviewer.
- Defines priorities, MVP scope, acceptance criteria, and next tasks.
- Reviews Codex and Antigravity reports before deciding what to do next.

### Codex
- Acts as the rapid implementation team.
- Implements small approved features, bug fixes, quiz content, components, and refactors.
- Produces implementation reports that summarize changed files, verification, risks, and follow-up work.

### Antigravity
- Acts as tech lead, local build engineer, and integration reviewer.
- Runs local tests, production builds, and browser checks.
- Validates UX, state persistence, localStorage behavior, mobile layout, and architecture compatibility.

## Recommended Workflow

Use this loop for most implementation tasks:

```text
ChatGPT scope review
  -> Codex implementation
  -> Codex Report
  -> Antigravity validation
  -> Antigravity QA Report
  -> ChatGPT final review
```

1. **ChatGPT review**
   - Decide the feature, scope, and success criteria.
   - Keep the task MVP-friendly and aligned with learning effectiveness.

2. **Codex implementation**
   - Use the appropriate Codex prompt.
   - Keep changes scoped and follow existing `lib/`, `hooks/`, and `components/` patterns.
   - Return a `[Codex Report]`.

3. **Codex report consolidation**
   - If multiple Codex outputs exist, use `CODEX_REPORT_PROMPT.md`.
   - Produce one unified handoff for Antigravity.

4. **Antigravity validation**
   - Use the appropriate Antigravity prompt.
   - Run local verification and apply only small integration fixes when needed.
   - Return an `[Antigravity QA Report]`.

5. **ChatGPT final review**
   - Compare implementation results, validation results, risks, and next priorities.
   - Decide whether the work is approved, needs fixes, or should be deferred.

## Prompt Usage Guide

### Codex prompts

- `CODEX_IMPLEMENTATION_PROMPT.md`
  - Use for normal feature implementation and bug fixes.
  - Best for changes touching `lib/`, `hooks/`, components, tests, or documentation.

- `CODEX_COMPONENT_PROMPT.md`
  - Use for focused React component or UI surface work.
  - Best when the task is mostly rendering, styling, layout, or component integration.

- `CODEX_REFACTOR_PROMPT.md`
  - Use for behavior-preserving cleanup.
  - Best when improving structure without changing user-facing behavior.

- `CODEX_QUIZ_GENERATOR_PROMPT.md`
  - Use for generating or improving quiz content.
  - Best for new question sets, explanations, hints, common mistakes, and concept tags.

- `CODEX_REPORT_PROMPT.md`
  - Use after several Codex tasks to create one unified report.
  - Best for handing work to Antigravity or ChatGPT.

### Antigravity prompts

- `ANTIGRAVITY_MASTER_PROMPT.md`
  - Use for larger tasks that need planning, implementation, verification, and documentation.

- `ANTIGRAVITY_SMALL_TASK_PROMPT.md`
  - Use for small local fixes or safe tweaks.

- `ANTIGRAVITY_REVIEW_PROMPT.md`
  - Use after Codex implementation to validate the work locally.
  - Best for `npm test`, `npm run build`, browser checks, mobile checks, and localStorage behavior.

## Reporting Expectations

Codex reports should use the header `[Codex Report]` and answer:
  - What was implemented?
  - Which files changed?
  - What verification was completed?
  - What risks remain?

Antigravity reports should use the header `[Antigravity QA Report]` and answer:
  - What was reviewed?
  - Did tests, build, browser, and mobile checks pass?
  - Were any issues found or fixed?
  - Is the work approved or does it need follow-up?

## Documentation Rules

- Update `PROJECT_STATUS.md` only when project status changes.
- Append to `docs/DAILY_LOG.md` for completed workflow tasks.
- Check local time with `date` before writing DAILY_LOG timestamps.
- Keep `ROADMAP.md` focused on milestones and future priorities.
