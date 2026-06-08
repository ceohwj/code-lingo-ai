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
   - Use `CODEX_TASK_PROMPT.md` for implementation, components, fixes, and refactors.
   - Keep changes scoped and follow existing `lib/`, `hooks/`, and `components/` patterns.
   - Return a `# Codex Task Report`.

3. **Codex report consolidation**
   - If multiple Codex outputs exist, use `CODEX_REPORT_PROMPT.md`.
   - Produce one unified handoff for Antigravity.

4. **Antigravity validation**
   - Use `ANTIGRAVITY_REVIEW_PROMPT.md`.
   - Run local verification and apply only small integration fixes when needed.
   - Return an `# Antigravity Review Report`.

5. **ChatGPT final review**
   - Compare implementation results, validation results, risks, and next priorities.
   - Decide whether the work is approved, needs fixes, or should be deferred.

## Prompt Usage Guide

### Codex prompts

- `CODEX_TASK_PROMPT.md`
  - Use for normal feature implementation, bug fixes, React components, UI work, and behavior-preserving refactors.
  - Best for scoped changes touching `lib/`, `hooks/`, `components/`, tests, styles, or documentation.

- `CODEX_QUIZ_GENERATOR_PROMPT.md`
  - Use for generating or improving quiz content.
  - Best for new question sets, explanations, hints, common mistakes, and concept tags.

- `CODEX_REPORT_PROMPT.md`
  - Use after several Codex tasks to create one unified report.
  - Best for handing work to Antigravity or ChatGPT.

### Antigravity prompts

- `ANTIGRAVITY_REVIEW_PROMPT.md`
  - Use after Codex implementation to validate the work locally, or for small local fixes through its Small-Review Mode.
  - Best for `npm test`, `npm run build`, browser checks, mobile checks, localStorage behavior, and safe integration fixes.

## Reporting Expectations

Codex task reports should use the header `# Codex Task Report` and answer:
  - What was implemented?
  - Which files changed?
  - What verification was completed?
  - What risks remain?

Antigravity reports should use the header `# Antigravity Review Report` and answer:
  - What was reviewed?
  - Did tests, build, browser, and mobile checks pass?
  - Were any issues found or fixed?
  - Is the work approved or does it need follow-up?

## Documentation Rules

- Update `PROJECT_STATUS.md` only when project status changes.
- Append to `docs/DAILY_LOG.md` for completed workflow tasks.
- Check local time with `date` before writing DAILY_LOG timestamps.
- Keep `ROADMAP.md` focused on milestones and future priorities.
