# CodeLingo AI Portfolio Case Study

## 1. Project Overview

CodeLingo AI is a portfolio-ready MVP for a Duolingo-style coding learning platform. It helps learners build practical programming, data analysis, AI, and bioinformatics fundamentals through short quiz sessions, immediate explanations, XP progression, review loops, and daily retention systems.

The MVP is local-first: quiz content is stored as JSON, progress is saved in browser `localStorage`, and learning behavior is separated into reusable components, focused hooks, and pure logic modules. This makes the app easy to explain in interviews while still demonstrating meaningful product architecture.

Current MVP scope:

- 6 learning tracks: Python, SQL, Pandas, NumPy, AI, and Bioinformatics
- 60-question curriculum: 10 questions per track
- Balanced difficulty: each track follows a 4 easy, 4 medium, 2 hard structure
- XP progression with difficulty-based rewards
- Daily missions, streaks, achievements, review mode, weak-area analysis, and concept focus analytics
- Validated MVP status: `npm test` and `npm run build` pass

## 2. Problem

Beginners often struggle to keep learning programming consistently after the first few lessons. Many learning apps either overload users with long tutorials or give feedback that is too shallow to improve understanding.

The product problem was to design a small but complete learning loop that supports:

- Quick daily practice
- Immediate corrective feedback
- Clear explanations after each answer
- Long-term retention through review
- Motivation through XP, progress, streaks, and achievements
- A scalable curriculum structure for future data, AI, and bioinformatics content

The engineering problem was to build this without overcomplicating the MVP with backend systems, accounts, or premature abstractions.

## 3. Solution

CodeLingo AI solves the problem with a lightweight microlearning loop:

```text
Choose category
  -> Answer quiz question
  -> Receive immediate feedback
  -> Read explanation and common mistake guidance
  -> Earn difficulty-based XP
  -> Save category progress locally
  -> Review missed questions
  -> Return through daily missions and streaks
```

The product intentionally prioritizes retention over feature volume. Instead of adding many disconnected screens, the MVP focuses on a complete daily learning experience: choose a track, answer questions, understand mistakes, preserve progress, and return for review.

## 4. Architecture

The app uses a local-first Next.js and React architecture. It keeps business logic, React orchestration, and UI rendering separated so each system remains testable and explainable.

Architecture map:

```text
app/
  page.jsx                         Main learning flow orchestration
  layout.jsx                       App shell and metadata
  globals.css                      Responsive styling

components/
  CategorySelector.jsx             Home dashboard, categories, review actions
  QuizCard.jsx                     Question rendering and answer choices
  ExplanationCard.jsx              Post-answer learning feedback
  ProgressBar.jsx                  Quiz progress and XP summary
  QuizHero.jsx                     Quiz session header
  QuizResults.jsx                  Completion and review summaries
  LearningStatsPanel.jsx           Derived learning statistics
  NextMilestonePanel.jsx           Motivation and next target display
  WeeklyLearningSnapshot.jsx       Current-progress weekly snapshot proxy

hooks/
  useQuizProgressStorageState.js   Quiz progress persistence orchestration
  useWrongAnswerHistory.js         Category-specific wrong-answer storage
  useCategoryProgressSummaries.js  Dashboard progress summaries
  useDailyGoalState.js             Daily mission state
  useStreakState.js                Daily streak state
  useAchievementState.js           Achievement unlock orchestration
  useAdaptiveReviewRecommendations.js
  useWeakAreaInsights.js
  useConceptFocusInsights.js

lib/
  quizLogic.js                     Answer checking, difficulty, XP helpers
  quizProgressLogic.js             Retry and completed-answer persistence logic
  categoryProgressLogic.js         Category dashboard calculations
  dailyGoalLogic.js                Daily mission calculations
  streakLogic.js                   Local calendar streak calculations
  achievementLogic.js              Milestone unlock rules
  adaptiveReviewLogic.js           Review recommendation scoring
  weakAreaInsightLogic.js          Weak-area analysis
  conceptAnalyticsLogic.js         Concept focus aggregation
  wrongAnswerHistoryLogic.js       Wrong-answer ID normalization and recency

data/
  quizData.js                      Quiz registry
  questions/*.json                 Curriculum datasets
```

Key architectural decisions:

- Keep quiz data separate from UI logic.
- Keep scoring and learning analytics in pure helper modules.
- Keep browser persistence inside focused hooks.
- Preserve category-specific `localStorage` compatibility.
- Avoid backend complexity until the MVP learning loop is proven.

## 5. Features

Core MVP features:

- Category-based quiz selection
- Multiple-choice quiz flow
- 60 total questions across 6 learning tracks
- Difficulty labels for easy, medium, and hard questions
- Difficulty-based XP rewards
- Immediate answer feedback
- Explanation card after every submitted answer
- Optional hints before answering
- Optional common mistake guidance after answering
- Progress bar with current question, progress percentage, session XP, total XP, and question XP
- Category-specific saved progress
- Try again flow that preserves saved category XP and completed-question history
- Final quiz summary

Retention and motivation features:

- Daily missions with a default target of 5 completed normal quiz questions
- Daily streak tracking using local calendar day logic
- Achievement milestones
- Learning stats dashboard
- Next milestone panel
- Weekly learning snapshot proxy
- Category progress dashboard with not started, in progress, and completed states

Review features:

- Wrong-answer review mode
- Category-specific wrong-answer history
- Stable review sessions while wrong-answer state updates
- Review mode does not award XP
- Review mode does not overwrite normal quiz progress
- End-of-review summary with reviewed, corrected, and remaining wrong answers

## 6. Learning Analytics

The MVP includes lightweight learning analytics built from local quiz behavior.

Current analytics signals:

- Total XP
- Session XP
- Completed question count
- Category completion percentage
- Category earned XP
- Accuracy signal
- Daily goal progress
- Current streak and best streak
- Wrong-answer counts by category
- Adaptive review recommendations
- Weak-area insights
- Concept focus insights

The learning analytics are derived from existing quiz progress and wrong-answer history instead of introducing a separate analytics database. This keeps the MVP simple while still demonstrating how retention and personalization systems can emerge from structured learning events.

Important design choice:

- Review, weak-area, and concept focus systems are loosely coupled.
- Achievements do not directly mutate XP.
- Review mode does not directly complete streaks or daily missions.
- Dashboard values are derived from saved progress rather than duplicated manually.

## 7. AI Multi-Agent Workflow

CodeLingo AI was built with an AI-assisted workflow that simulates a small product team.

Workflow roles:

- ChatGPT: product owner, product manager, architecture reviewer, UX strategist, and portfolio strategist
- Codex: production engineer for scoped implementation, content generation, utilities, documentation, and validation support
- Antigravity: tech lead, local build engineer, integration reviewer, and QA validator

The workflow helped maintain MVP discipline:

- ChatGPT shaped priorities and prevented feature overload.
- Codex implemented isolated changes and generated structured quiz datasets.
- Antigravity validated runtime behavior, mobile layouts, test results, and production builds.

This workflow is documented through:

- `AGENTS.md`
- `WORKFLOW.md`
- `WORKFLOW_MAP.md`
- `CODEX_TASK_PROMPT.md`
- `CODEX_QUIZ_GENERATOR_PROMPT.md`
- `ANTIGRAVITY_REVIEW_PROMPT.md`
- `PROJECT_STATUS.md`
- `ROADMAP.md`
- `docs/DAILY_LOG.md`

Portfolio value:

- Shows practical AI-assisted software engineering.
- Demonstrates scoped implementation with validation.
- Provides traceable product decisions and QA history.
- Makes the engineering process explainable in interviews.

## 8. Technical Challenges

### Preserving Local Progress While Expanding Categories

The app started with a simpler quiz flow, then expanded into multiple categories. The challenge was to support category-specific progress without breaking existing saved Python progress.

Solution:

- Introduced category-specific progress keys.
- Preserved the legacy Python progress key for compatibility.
- Centralized progress summary logic in pure helpers and storage orchestration hooks.

### Separating Session XP From Saved Total XP

Retry and review behavior can easily corrupt progress if session state and saved state are mixed.

Solution:

- Separated session XP from saved category XP.
- Review mode awards no XP.
- Retry starts a new quiz attempt while preserving saved completed-question history.

### Keeping Review Systems Loosely Coupled

Wrong-answer review, adaptive recommendations, weak-area insights, and concept focus analytics use related data but should not directly mutate one another.

Solution:

- Stored wrong-answer IDs by category.
- Derived review recommendations from wrong answers, difficulty, and progress.
- Derived weak-area and concept focus panels from existing saved signals.
- Kept recommendation logic in pure modules for focused testing.

### Managing MVP Scope

The project could easily grow into backend sync, AI tutor chat, dashboards, and analytics too early.

Solution:

- Kept the MVP local-first.
- Prioritized a complete learning loop before backend or AI tutor features.
- Documented future roadmap items without implementing them prematurely.

## 9. Curriculum Design

The current curriculum contains 60 questions across 6 tracks:

- Python: programming fundamentals
- SQL: query fundamentals and joins
- Pandas: practical tabular data analysis
- NumPy: array fundamentals and numeric operations
- AI: machine learning foundations
- Bioinformatics: sequence and biological data concepts

Each track contains:

- 10 questions
- 4 easy questions
- 4 medium questions
- 2 hard questions
- Beginner-friendly explanations
- Concept tags
- Hints
- Selected common mistake guidance

Curriculum goals:

- Keep early questions approachable.
- Use medium questions to reinforce practical syntax and mental models.
- Use hard questions for deeper concepts and interview-worthy discussion.
- Attach concept tags so future review and analytics systems can reason about learner weaknesses.
- Keep explanations educational rather than simply marking answers correct or incorrect.

Recent curriculum quality calibration:

- Audited all 60 questions.
- Confirmed each category follows the 4-4-2 difficulty split.
- Replaced overly silly distractors with realistic alternatives.
- Recalibrated Python difficulty tiers.
- Improved curriculum consistency across practical programming, data analysis, AI, and bioinformatics topics.

## 10. QA & Validation

Validation completed for the MVP:

- `npm test`: passed, 85/85 tests
- `npm run build`: passed successfully in Turbopack mode
- Mobile learning-flow validation completed across 375px, 390px, and 430px viewports
- Browser learning-flow validation covered category selection, quiz progression, hints, explanations, XP accumulation, refresh restore, Try again behavior, wrong-answer review, recommended review, weak-area insights, concept focus, achievements, daily goal, streak, dashboard hierarchy, and mobile layout
- Curriculum quality audit completed across all 60 questions

Test coverage focuses on product-critical logic:

- Quiz data schema and category registration
- Answer checking
- Difficulty-based XP
- Submitted answer replacement
- Quiz retry persistence
- Category progress summaries
- Daily goals
- Streaks
- Achievements
- Wrong-answer history
- Adaptive review recommendations
- Weak-area insights
- Concept analytics

Known MVP limitations:

- No backend synchronization yet
- No authentication yet
- No database yet
- Weekly learning snapshot currently uses a current-progress proxy until weekly history tracking exists
- Browser persistence validation relies on visible restore behavior plus logic tests rather than direct localStorage inspection from browser automation

## 11. Future Roadmap

Immediate portfolio next steps:

- Write the public portfolio case study from this document.
- Add screenshots or a short demo GIF.
- Prepare deployment notes.
- Deploy the MVP publicly.
- Add a short architecture diagram for interview storytelling.

Product roadmap:

- Add practical mini challenges.
- Add real dataset examples.
- Expand Machine Learning, XAI, and healthcare data tracks.
- Add adaptive difficulty.
- Add personalized review scheduling.
- Add spaced repetition.
- Add AI tutor explanations and personalized hints.

Platform roadmap:

- Add backend API integration.
- Add authentication.
- Add database-backed progress sync.
- Add learning analytics storage.
- Add content management tools for quiz datasets.
- Add deployment and monitoring workflow.

Portfolio framing:

CodeLingo AI is ready to present as a completed MVP that demonstrates AI-assisted software engineering, scalable frontend architecture, educational product thinking, retention-oriented UX, modular React design, and testable learning logic.
