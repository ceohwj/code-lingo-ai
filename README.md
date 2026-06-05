# CodeLingo AI

CodeLingo AI is a local-first, Duolingo-style coding learning platform MVP for programming, AI, SQL, and bioinformatics fundamentals.

The project started as a simple quiz app and has grown into a scalable learning product prototype with category-based lessons, difficulty-based XP, explanation feedback, wrong-answer review, daily retention loops, and local progress persistence.

## Project Overview

CodeLingo AI helps learners build coding fluency through short multiple-choice learning sessions. The current MVP focuses on a fast feedback loop:

1. Choose a learning category.
2. Answer short quiz questions.
3. Review correctness, explanation, difficulty, and earned XP.
4. Save progress automatically in the browser.
5. Return later to continue, review wrong answers, and maintain daily learning habits.

Current categories:

- Python
- SQL
- AI
- Bioinformatics

## Core Learning Loop

```text
Choose category
  -> Answer question
  -> Get immediate feedback and explanation
  -> Earn difficulty-based XP
  -> Save category progress
  -> Review wrong answers
  -> Build daily streak and daily goal progress
```

The product prioritizes learning effectiveness, retention, and maintainable architecture over feature volume.

## Current Features

### Quiz Core
- Category selection before quiz start
- Multiple-choice quiz flow
- Category-specific progress restore
- Selected category persistence
- JSON-based question content under `data/questions/`
- Progress summary with current question, total questions, percentage, and XP

### Learning Feedback
- Difficulty-based XP rewards for `easy`, `medium`, and `hard` questions
- Reusable explanation cards after each answer
- Correct answer, explanation, earned XP, and difficulty display
- Optional `commonMistake` helper text support
- Scalable quiz schema for future `conceptTag` and `hint` fields

### Review System
- Wrong-answer review mode before quiz start
- Incorrect questions saved separately by category
- Review mode does not overwrite normal quiz progress
- Review mode does not award normal quiz XP
- End-of-review summary with reviewed, corrected, and remaining wrong answers

### Retention System
- Daily streak tracking with local calendar day logic
- Daily goal tracking with a default target of 5 completed normal quiz questions
- Review mode excluded from streak and daily goal completion
- Category progress dashboard showing completed questions, total questions, completion percentage, earned XP, and status
- Visual distinction for not started, in progress, and completed categories

## Architecture Overview

The app is built with Next.js and React using a local-first architecture. Most behavior is implemented with pure logic helpers, focused hooks, and reusable client components.

Short architecture map:

- **components**: Render reusable UI surfaces such as category cards, quiz cards, explanation cards, and progress summaries.
- **hooks**: Own browser-side state orchestration for localStorage-backed features such as streaks, daily goals, and category dashboard summaries.
- **lib**: Holds pure, testable learning logic for answer checking, XP, streaks, daily goals, and category progress summaries.
- **data**: Keeps quiz content in JSON files, separated from rendering and scoring logic.

Key principles:

- Keep quiz data separate from UI rendering.
- Keep scoring, progress, streak, daily goal, and dashboard calculations in testable helper modules.
- Preserve localStorage compatibility as the MVP evolves.
- Prefer small reusable components and hooks over broad rewrites.
- Avoid backend complexity during the MVP stage.

## Folder Structure

```text
app/
  layout.jsx              App metadata and shell
  page.jsx                Main quiz flow and screen orchestration
  globals.css             Responsive app styling

components/
  CategorySelector.jsx    Home/category dashboard and category actions
  QuizCard.jsx            Question, choices, answer action, explanation mount
  ExplanationCard.jsx     Reusable answer explanation UI
  ProgressBar.jsx         Reusable quiz progress summary

data/
  quizData.js             Quiz registry
  questions/
    python.json
    sql.json
    ai.json
    bioinformatics.json

hooks/
  useCategoryProgressSummaries.js
  useDailyGoalState.js
  useStreakState.js

lib/
  categoryProgressLogic.js
  dailyGoalLogic.js
  quizLogic.js
  streakLogic.js

test/
  categoryProgressLogic.test.js
  dailyGoalLogic.test.js
  quizLogic.test.js
  streakLogic.test.js

docs/
  DAILY_LOG.md            Chronological development log

AGENTS.md                 Multi-agent workflow and project roles
WORKFLOW.md               Lightweight Codex, Antigravity, and ChatGPT collaboration guide
WORKFLOW_MAP.md           Codex, Antigravity, and ChatGPT prompt decision tree map
PROJECT_STATUS.md         Current project status by feature group
ROADMAP.md                Completed milestones and future priorities
```

## localStorage Persistence Strategy

The MVP uses browser localStorage only. There is no backend, authentication, or database yet.

Stored state includes:

- Selected category
- Category-specific quiz progress
- Category-specific wrong-answer question IDs
- Daily streak state
- Daily goal state

Compatibility notes:

- The original Python progress key is preserved for legacy restore compatibility.
- Progress payloads include schema metadata where useful for future migration.
- Review mode uses separate wrong-answer storage and does not mutate normal quiz progress.
- Daily streak and daily goal use local calendar day logic.

## AI-Assisted Workflow

This project is developed with an AI-assisted workflow documented in `AGENTS.md`, `WORKFLOW.md`, and `WORKFLOW_MAP.md`. Before feature work, each defined agent reviews the task for learning value, MVP scope, maintainability, testing risk, and portfolio impact.

The collaboration model is:

- ChatGPT: product direction, scope, and final review
- Codex: fast scoped implementation
- Antigravity: local validation, build checks, and integration review

For feature work, the project uses role-based reviews from:

- Product Manager Agent
- Learning Experience Agent
- Quiz Generator Agent
- UI Agent
- Refactor Agent
- Test Agent
- Documentation Agent
- Architecture Agent
- Growth Agent
- Portfolio Strategy Agent

The workflow emphasizes MVP scope control, learning effectiveness, retention, scalable architecture, testability, and clear documentation. See `WORKFLOW.md` for the collaboration guide and `WORKFLOW_MAP.md` for prompt selection and handoff guidance. Work is tracked through `PROJECT_STATUS.md`, `ROADMAP.md`, and chronological entries in `docs/DAILY_LOG.md`.

## Testing Approach

Tests are focused on pure logic modules so product behavior remains stable while the UI evolves.

Covered areas:

- Quiz data structure and category coverage
- Answer checking and feedback helpers
- Difficulty-based XP calculation
- Streak date logic and saved-state normalization
- Daily goal progress and reset logic
- Category progress dashboard summary logic

Run tests:

```bash
npm test
```

The npm test script runs:

```bash
node --test
```

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:3000
```

If your shell uses `nvm`, load it first as needed:

```bash
source ~/.nvm/nvm.sh
```

## Roadmap Summary

The roadmap is organized around MVP stabilization, learning-system depth, content expansion, AI tutor features, retention, scalability, and portfolio polish.

Near-term priorities:

- Expand question coverage per category
- Add `conceptTag` metadata to quiz content
- Add `hint` support to selected questions
- Improve explanation quality and consistency
- Add browser-level regression checks for key quiz flows
- Continue safe state-management refactors when behavior is covered

## Future Plans

- Adaptive difficulty
- Personalized wrong-answer review
- Spaced repetition
- Lightweight learning statistics dashboard
- Achievement and XP milestone systems
- AI tutor features for personalized explanations, hints, and review recommendations
- Backend, authentication, database, and learning analytics when the MVP is ready to scale

## Current Status

See:

- `PROJECT_STATUS.md` for grouped feature status
- `ROADMAP.md` for completed milestones and future priorities
- `docs/DAILY_LOG.md` for chronological development notes
