# CodeLingo AI

Publicly deployed Learning Platform v1 for a Duolingo-style coding education experience.

CodeLingo AI helps learners practice programming, data analysis, AI, and bioinformatics through short quizzes, immediate explanations, XP progression, daily missions, wrong-answer review, weak-area analysis, and lightweight learning analytics.

**Release Status:** Public Release / Learning Platform v1  
**Live Demo:** https://code-lingo-ai.vercel.app  
**Curriculum:** 60 questions across 6 learning tracks  
**Validation:** `npm test` passed, `npm run build` passed, mobile QA completed

## Live Demo

CodeLingo AI is publicly deployed and available here:

**https://code-lingo-ai.vercel.app**

Use the live app to try the full learning loop: choose a track, answer questions, earn XP, complete daily missions, unlock achievements, review missed questions, and inspect learning analytics.

## 1. Project Overview

CodeLingo AI is a local-first microlearning web app built with Next.js and React. Version 1 focuses on one complete learning loop:

```text
Choose a track
  -> Answer a quiz question
  -> Get immediate feedback and explanation
  -> Earn difficulty-based XP
  -> Save category progress
  -> Review missed questions
  -> Return through daily missions and streaks
```

The project is designed as a public portfolio case study in AI-assisted software engineering, scalable frontend architecture, and retention-oriented educational UX. It avoids backend complexity in v1 so the core learning experience, data model, local persistence, and review logic stay easy to inspect and explain.

## 2. Key Features

- 60-question curriculum with 10 questions per category
- 6 learning categories: Python, SQL, Pandas, NumPy, AI, and Bioinformatics
- Balanced difficulty design with easy, medium, and hard questions
- Difficulty-based XP progression
- Daily missions with a 5-question default goal
- Daily streak tracking and achievement milestones
- Category-specific progress persistence with `localStorage`
- Wrong-answer review mode by category
- Adaptive review recommendations from saved misses, difficulty, and progress
- Weak-area analysis for repeated misses and low-progress categories
- Concept focus analytics based on `conceptTags`
- Learning analytics through stats, next milestone, and weekly snapshot dashboard panels
- Mobile-responsive dashboard and quiz flow

## 3. Learning Tracks

| Track | Questions | Focus |
| --- | ---: | --- |
| Python | 10 | Syntax, data types, loops, functions, list comprehensions, mutable defaults |
| SQL | 10 | SELECT, WHERE, ORDER BY, GROUP BY, joins, aggregates, HAVING |
| Pandas | 10 | DataFrame, Series, CSV loading, loc, iloc, filtering, groupby, merge, missing values |
| NumPy | 10 | Arrays, shape, dtype, vectorization, boolean indexing, aggregation, zeros, broadcasting, reshape |
| AI | 10 | Supervised learning, overfitting, features, labels, underfitting, evaluation |
| Bioinformatics | 10 | DNA/RNA basics, FASTA/FASTQ, sequence alignment, reference genomes, variant calling |

Curriculum design principles:

- Keep beginner questions short and concrete.
- Use hints to reduce frustration before answering.
- Use explanations to teach the concept after answering.
- Use `conceptTags` so review and analytics can identify weak concepts later.
- Keep each category balanced at 4 easy, 4 medium, and 2 hard questions.

## 4. Architecture

CodeLingo AI uses a modular local-first architecture:

```text
app/
  page.jsx                    Main learning flow orchestration
  layout.jsx                  Metadata and app shell
  globals.css                 Responsive styling

components/
  CategorySelector.jsx        Dashboard, category cards, review entry points
  QuizCard.jsx                Question, choices, hint, answer submission
  ExplanationCard.jsx         Immediate feedback and explanation
  ProgressBar.jsx             Progress, difficulty, and XP summary
  QuizHero.jsx                Quiz session header
  QuizResults.jsx             Quiz and review completion summary
  LearningStatsPanel.jsx      Total XP, accuracy, completed questions
  NextMilestonePanel.jsx      XP milestone and achievement target
  WeeklyLearningSnapshot.jsx  Current-progress weekly snapshot proxy

hooks/
  useQuizProgressStorageState.js
  useWrongAnswerHistory.js
  useCategoryProgressSummaries.js
  useDailyGoalState.js
  useStreakState.js
  useAchievementState.js
  useAdaptiveReviewRecommendations.js
  useWeakAreaInsights.js
  useConceptFocusInsights.js

lib/
  quizLogic.js
  quizProgressLogic.js
  categoryProgressLogic.js
  dailyGoalLogic.js
  streakLogic.js
  achievementLogic.js
  adaptiveReviewLogic.js
  weakAreaInsightLogic.js
  conceptAnalyticsLogic.js
  wrongAnswerHistoryLogic.js

data/
  quizData.js
  questions/*.json
```

Architecture choices:

- UI rendering stays in `components/`.
- React and browser persistence orchestration stay in `hooks/`.
- Testable learning logic stays in `lib/`.
- Static curriculum content stays in `data/questions/`.
- Review, XP, streak, daily goal, and achievement systems remain loosely coupled.

## 5. Multi-Agent Workflow

This project was built with a documented AI-assisted workflow:

| Agent | Role | Contribution |
| --- | --- | --- |
| ChatGPT | Product owner, PM, architecture reviewer, UX strategist | Scoped features, protected MVP focus, reviewed learning and portfolio value |
| Codex | Production engineer | Implemented scoped features, generated quiz datasets, wrote utilities, updated docs |
| Antigravity | Tech lead, build engineer, QA reviewer | Integrated locally, ran browser/mobile QA, validated tests and production builds |

Workflow artifacts:

- `AGENTS.md`
- `WORKFLOW.md`
- `WORKFLOW_MAP.md`
- `CODEX_TASK_PROMPT.md`
- `CODEX_QUIZ_GENERATOR_PROMPT.md`
- `ANTIGRAVITY_REVIEW_PROMPT.md`
- `PROJECT_STATUS.md`
- `docs/DAILY_LOG.md`

This workflow makes the project more than a demo app: it shows how AI tools can support product thinking, implementation, verification, and portfolio documentation without losing engineering discipline.

## 6. Public Release Notes

CodeLingo AI v1 is live as a public learning platform demo. The release emphasizes recruiter-friendly product clarity and a complete, inspectable learning system:

- Public Vercel deployment for direct review
- 60 questions across 6 learning tracks
- XP progression, daily missions, streaks, and achievements
- Wrong-answer review, adaptive recommendations, weak-area analysis, and concept analytics
- Local-first persistence with modular React hooks and testable learning logic

Screenshots and social preview assets are tracked in the Public Release Visual Assets section below.

## 7. Public Release Visual Assets

The public release now includes real app screenshots and branding assets for GitHub, portfolio pages, browser tabs, and social link previews.

| Asset | Path | Status |
| --- | --- | --- |
| Favicon | `public/favicon.ico` | Added |
| App icon | `public/icon.png` | Added |
| Open Graph image | `public/og-image.png` | Added |
| Home/dashboard screenshot | `public/screenshots/home.png` | Added |
| Active quiz screenshot | `public/screenshots/quiz.png` | Added |
| Results screenshot | `public/screenshots/results.png` | Added |

### Screenshots

Dashboard with daily mission, learning tracks, stats, and review panels:

![CodeLingo AI dashboard](public/screenshots/home.png)

Active quiz question with hint, difficulty, and XP reward:

![CodeLingo AI quiz screen](public/screenshots/quiz.png)

Quiz completion summary with XP and answer review:

![CodeLingo AI results screen](public/screenshots/results.png)

Metadata note:

- `app/layout.jsx` connects the favicon, app icon, Open Graph image, and Twitter summary image to the committed files in `public/`.

## 8. Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://127.0.0.1:3000
```

Run tests:

```bash
npm test
```

Run production build:

```bash
npm run build
```

Environment variables:

- No runtime environment variables are required for the current local-first v1 release.
- No backend, database, authentication provider, or API key is required.

## 9. Test Results

Latest verified public release status:

- Unit tests: `npm test` passed, 85/85 tests
- Production build: `npm run build` passed successfully in Turbopack mode
- Mobile QA: completed at 375px, 390px, and 430px widths
- Curriculum QA: completed across all 60 questions and 6 categories
- Deployment UX review: completed and signed off as public-release ready

Test coverage includes:

- Quiz data schema and category registration
- Answer checking and feedback
- Difficulty-based XP
- Submitted-answer replacement
- Quiz retry and XP persistence
- Category progress summaries
- Daily goals
- Streaks
- Achievements
- Wrong-answer history
- Adaptive review recommendations
- Weak-area insights
- Concept analytics

## 10. Future Roadmap

Deployment and portfolio polish:

- Add screenshots and a short demo GIF
- Add favicon and public branding assets
- Add deployment instructions for the selected host
- Keep the public demo link current
- Link a detailed portfolio case study from this README

Learning product expansion:

- Add practical mini challenges
- Add real dataset examples
- Expand machine learning, XAI, and healthcare data tracks
- Add spaced repetition and adaptive difficulty
- Add personalized review scheduling

Platform expansion:

- Add backend progress sync
- Add authentication
- Add database-backed learning analytics
- Add AI tutor explanations and personalized hints
- Add content management tools for larger quiz datasets

## Portfolio Summary

CodeLingo AI demonstrates:

- AI-assisted software engineering workflow
- Scalable local-first frontend architecture
- Educational product thinking
- Retention-oriented UX
- Modular React component design
- Testable learning logic
- Practical curriculum design across programming, data, AI, and bioinformatics
