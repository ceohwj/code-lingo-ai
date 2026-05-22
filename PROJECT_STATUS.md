# PROJECT_STATUS.md

## Current Status
CodeLingo AI is a local-first quiz MVP with category selection, reusable quiz UI, explanation feedback, wrong-answer review, adaptive review recommendations, weak-area insights, concept focus analytics, difficulty-based XP, retention tracking, a category progress dashboard, and milestone achievements. Quiz content is stored in JSON files and browser progress is preserved with category-specific localStorage keys.

## Completed Features

### Quiz Core
- Basic multiple-choice quiz screen
- Python beginner quiz data
- Python, SQL, AI, and Bioinformatics categories
- Category selection before quiz start
- Separate selected category storage
- Question data organized under data/questions/*.json
- Lightweight conceptTags metadata added across quiz questions, with multiple tags supported per question
- localStorage progress save and restore
- Category-specific progress storage with legacy Python progress key compatibility
- Selected category name shown in quiz progress area
- Progress summary shows current question, total questions, progress percentage, session XP, and total XP
- Category progress dashboard shows completed questions, total questions, completion percentage, earned XP, and status
- Category progress states visually distinguish not started, in progress, and completed
- Try again restarts only the current quiz session while preserving saved category XP and completed-question progress

### Learning Feedback
- Correct/incorrect answer checking
- Immediate feedback messaging
- Dedicated reusable ExplanationCard after each submitted answer
- Explanation card shows correct answer, explanation, earned XP, and difficulty
- Optional commonMistake helper text supported in quiz schema
- Scalable easy / medium / hard difficulty support
- Difficulty-based XP rewards separated in quiz logic
- Session XP is separated from saved category total XP
- Current question difficulty and XP reward displayed in quiz UI
- Learning checkpoint UI
- Final quiz summary

### Review System
- Wrong-answer review mode before quiz start
- Adaptive review recommendations derived from wrong answers, difficulty, and category progress
- Recommended Review dashboard section prioritizes recent misses, harder misses, and low-progress categories
- Weak Areas dashboard section derives concise insights from wrong answers, category progress, difficulty patterns, and adaptive review signals
- Concept Focus dashboard section derives frequently missed and review-needed concepts from wrong answers, weak areas, and adaptive review signals
- Incorrect answers saved separately by category
- Review mode reuses QuizCard and ProgressBar without overwriting normal quiz progress
- Review sessions keep a stable question list while saved wrong answers update
- Category cards show clear wrong-answer counts
- Disabled review buttons show clearer no-review state
- End-of-review summary shows reviewed, corrected, and remaining wrong answers
- Review mode does not award XP or overwrite normal quiz progress
- Review mode does not trigger streak or daily goal completion

### Retention System
- XP system
- localStorage achievement tracking with unlock-once milestone state
- Achievement summary on the home category screen with locked and unlocked states
- Milestones for first quiz completed, first correct answer, 3-day streak, 10 correct answers, and category completion
- Daily streak logic with local calendar day tracking
- Home category screen shows current streak, today completed state, and best streak
- Normal quiz completion marks daily streak once per day
- Daily goal tracking for completed normal quiz questions by local calendar day
- Daily goal target defaults to 5 completed questions
- Home category screen shows daily goal count, target, progress percentage, and completion state
- Category dashboard helps users resume partially completed tracks
- Home dashboard information hierarchy groups today's learning actions above category progress and achievements

### Architecture / Testing
- Reusable QuizCard, ProgressBar, CategorySelector, and ExplanationCard components
- Quiz logic separated from UI logic in lib helpers
- Quiz retry and XP persistence helpers keep session progress separate from saved category progress
- Streak and daily goal localStorage state management extracted into small reusable hooks
- Category progress dashboard logic separated into pure helpers and a localStorage hook
- Achievement logic centralized in pure lib helpers with React/localStorage orchestration in hooks
- Adaptive review recommendation logic centralized in pure lib helpers with hook orchestration
- Weak-area insight logic centralized in pure lib helpers with hook orchestration
- Concept analytics logic centralized in pure lib helpers with hook orchestration
- Wrong-answer history localStorage orchestration extracted into a hook, with pure helpers for saved ID normalization and recency ordering
- Versioned localStorage payload metadata added for future adaptive learning compatibility
- Initial tests and focused logic tests for quiz data, difficulty XP, quiz retry XP persistence, streaks, daily goals, category progress, achievements, wrong-answer history, adaptive review recommendations, weak-area insights, and concept analytics
- npm test and npm run build pass in the current local Codex environment
- Local verification previously confirmed category flow, XP, refresh restore, and category-specific progress behavior
- README expanded to describe the scalable Duolingo-style platform MVP, architecture, persistence, workflow, testing, and future plans

## In Progress
- Project structure stabilization
- Daily reporting workflow
- Multi-agent development setup
- Browser-level regression verification for full quiz and review flows

## Issues
- Full browser-level regression across quiz, review, retry, and dashboard flows is still pending.

## Local Verification
- npm test passed locally
- npm run build passed locally
- Browser smoke check for the latest retry XP fix was attempted but could not complete because the local dev server/browser navigation was unavailable in Codex.
- Browser smoke check confirmed the refined dashboard and Concept Focus section headings.
- npm run dev started successfully locally
- Category selection screen was confirmed
- Python / SQL / AI / Bioinformatics buttons were confirmed
- Category-to-quiz flow works
- XP increases after solving questions
- Progress persists after refresh
- Category-specific progress is stored separately

## Known Technical Debt

- localStorage schema is growing as progress, streak, daily goal, review, and achievements expand.
- Cross-feature dependencies are increasing between XP, streak, daily goal, category progress, and future achievements.
- Date-based reset logic may need shared utility functions later.
- app/page.jsx may still orchestrate too many learning systems.
- No centralized analytics layer yet.
- No backend sync or authentication yet.
- achievement unlock conditions may become difficult to maintain as milestones increase


## Recent Codex Report
~~~txt
[Codex Result]
- Read AGENTS.md, PROJECT_STATUS.md, ROADMAP.md, and docs/DAILY_LOG.md before continuing.
- Completed agent review before implementation.
- Fixed the Try again XP reset bug by separating session XP from saved category total XP.
- Added pure quiz progress merge/persistence helpers in lib.
- Updated quiz retry so it resets only current-session UI state and preserves saved completed questions, category progress, daily goal, streak, achievements, recommendations, weak areas, and concept analytics.
- Displayed session XP and total XP separately in the quiz progress and completion UI.
- Kept wrong-answer review mode at 0 XP.
- Added focused retry and XP persistence tests.
- npm test passed, 76/76 tests.
- npm run build passed.
- Browser smoke check was attempted but could not complete in Codex because the local dev server/browser navigation was unavailable.
~~~
