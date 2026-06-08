# CodeLingo AI

CodeLingo AI is a portfolio-ready MVP for a Duolingo-style coding learning platform. It helps learners build practical programming and data skills through short quiz sessions, immediate explanations, XP progression, wrong-answer review, and daily retention loops.

The project is intentionally local-first for the MVP stage: user progress is saved in browser `localStorage`, quiz content is stored as JSON, and learning logic is separated into testable modules. This keeps the architecture explainable, scalable, and suitable for portfolio review or technical interviews.

## Current MVP Status

Status: MVP Completed

The MVP is complete and portfolio-ready. The core learning loop has been implemented, mobile QA has been completed across common mobile widths, and the latest local validation passes both `npm test` and `npm run build`.

Completed MVP outcomes:

- Core learning loop completed
- Mobile learning-flow QA completed
- Local progress persistence completed
- Review and retention systems completed
- Practical data-analysis category expansion completed with Pandas and NumPy
- Documentation and multi-agent workflow tracking completed
- Latest validation passed: `npm test` and `npm run build`

## Project Overview

CodeLingo AI turns coding fundamentals into lightweight daily learning sessions:

1. Choose a learning category.
2. Answer a short multiple-choice question.
3. Get immediate feedback and a beginner-friendly explanation.
4. Earn difficulty-based XP for correct answers.
5. Save category progress automatically.
6. Review missed questions later.
7. Build daily learning momentum through goals, streaks, milestones, and dashboard feedback.

Current learning categories:

- Python
- SQL
- Pandas
- NumPy
- AI
- Bioinformatics

## Key Features

### Learning Flow

- Category-based quiz selection
- 10-question starter tracks per category
- Easy, medium, and hard difficulty levels
- Difficulty-based XP rewards
- Immediate correct/incorrect feedback
- Explanation cards after each answer
- Optional hints and common mistake notes
- Final quiz summary

### Review And Retention

- Wrong-answer review mode
- Category-specific missed-question history
- Adaptive review recommendations
- Weak-area insights
- Concept focus analytics
- Daily goal tracking
- Daily streak tracking
- Achievement milestones
- Category progress dashboard

### Data And Curriculum

- JSON-based quiz datasets under `data/questions/`
- Concept-tagged questions for analytics and review signals
- Practical data-analysis coverage through Pandas and NumPy
- Beginner-friendly explanations designed for retention
- Curriculum structure ready for future AI-generated content and adaptive learning

### Architecture

- Local-first MVP architecture
- Reusable React components
- Focused hooks for browser state orchestration
- Pure helper modules for quiz, XP, progress, streak, daily goal, achievement, review, weak-area, and concept analytics logic
- Category-specific `localStorage` persistence
- Versioned saved-state payloads where useful for future migration

## Tech Stack

- Next.js 16
- React 19
- JavaScript ES modules
- Node.js built-in test runner
- JSON quiz datasets
- Browser `localStorage`
- Global CSS through `app/globals.css`

## Architecture Map

```text
app/
  layout.jsx
  page.jsx
  globals.css

components/
  CategorySelector.jsx
  ExplanationCard.jsx
  LearningStatsPanel.jsx
  NextMilestonePanel.jsx
  ProgressBar.jsx
  QuizCard.jsx
  QuizHero.jsx
  QuizResults.jsx
  WeeklyLearningSnapshot.jsx

data/
  quizData.js
  questions/
    ai.json
    bioinformatics.json
    numpy.json
    pandas.json
    python.json
    sql.json

hooks/
  useAchievementState.js
  useAdaptiveReviewRecommendations.js
  useCategoryProgressSummaries.js
  useConceptFocusInsights.js
  useDailyGoalState.js
  useLearningProgress.js
  useQuizProgressStorageState.js
  useStreakState.js
  useWeakAreaInsights.js
  useWrongAnswerHistory.js

lib/
  achievementLogic.js
  adaptiveReviewLogic.js
  categoryProgressLogic.js
  conceptAnalyticsLogic.js
  createAnswerSubmission.js
  dailyGoalLogic.js
  learningProgressLogic.js
  quizLogic.js
  quizProgressLogic.js
  streakLogic.js
  updateSubmittedAnswers.js
  weakAreaInsightLogic.js
  wrongAnswerHistoryLogic.js

test/
  *.test.js

docs/
  DAILY_LOG.md
```

## AI-Assisted Workflow

CodeLingo AI was built with a documented multi-agent workflow that simulates a small product team:

- ChatGPT: product owner, architecture reviewer, UX strategist, and portfolio strategist
- Codex: production engineer for scoped implementation, content generation, utilities, and documentation updates
- Antigravity: tech lead and local build engineer for integration review, runtime validation, and QA reporting

The workflow is tracked in:

- `AGENTS.md`
- `WORKFLOW.md`
- `WORKFLOW_MAP.md`
- `PROJECT_STATUS.md`
- `ROADMAP.md`
- `docs/DAILY_LOG.md`

Prompt templates are intentionally scoped:

- `CODEX_TASK_PROMPT.md`
- `CODEX_QUIZ_GENERATOR_PROMPT.md`
- `CODEX_REPORT_PROMPT.md`
- `ANTIGRAVITY_REVIEW_PROMPT.md`

This workflow is part of the portfolio story: it demonstrates AI-assisted software engineering, MVP scope control, iterative QA, and explainable product decision-making.

## Testing And Validation

The project uses focused logic tests to keep learning behavior stable as the UI evolves.

Covered areas include:

- Quiz data schema and category registration
- Answer checking
- Difficulty-based XP
- Progress persistence helpers
- Retry behavior
- Wrong-answer history
- Adaptive review recommendations
- Weak-area insights
- Concept focus analytics
- Daily goals
- Streaks
- Achievements
- Category progress summaries

Run tests:

```bash
npm test
```

Run production build:

```bash
npm run build
```

Latest MVP validation:

- Schema consistency checks passed
- `npm test` passed
- `npm run build` passed
- Mobile learning-flow validation completed at 375px, 390px, and 430px

## Run Locally

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Roadmap

The MVP is complete. Next priorities are portfolio presentation and deployment:

- Write a portfolio case study
- Add screenshots or a short demo recording
- Prepare deployment notes
- Deploy the MVP publicly
- Continue content expansion with practical mini challenges
- Later, add backend sync, authentication, analytics, and AI tutor features

## Portfolio Positioning

CodeLingo AI demonstrates:

- AI-assisted product development workflow
- Scalable frontend architecture
- Local-first MVP design
- Educational product thinking
- Retention-oriented UX
- Modular React architecture
- Testable learning logic
- Practical data-analysis curriculum expansion
- Clear documentation and QA traceability
