# PROJECT_STATUS.md

## Current Status
CodeLingo AI is a local-first quiz MVP with category selection, reusable quiz UI, balanced 10-question starter quiz tracks, explanation feedback, wrong-answer review, adaptive review recommendations, weak-area insights, concept focus analytics, difficulty-based XP, retention tracking, a category-first progress dashboard, lightweight learning statistics, next milestone, and weekly snapshot panels, and milestone achievements. Quiz content is stored in JSON files and browser progress is preserved with category-specific localStorage keys.

## Completed Features

### Quiz Core
- Basic multiple-choice quiz screen
- Python beginner quiz data
- Python, SQL, AI, and Bioinformatics categories
- Python, SQL, AI, and Bioinformatics starter tracks balanced at 10 questions each while preserving the existing JSON schema
- Category selection before quiz start
- Separate selected category storage
- Question data organized under data/questions/*.json
- Lightweight conceptTags metadata added across quiz questions, with multiple tags supported per question
- Optional beginner-friendly hints added to selected concept-tagged quiz questions
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
- Submitted answer feedback now shows clearer correct/review status copy and visual treatment
- Dedicated reusable ExplanationCard after each submitted answer
- Explanation card shows correct answer, explanation, earned XP, and difficulty
- Optional commonMistake helper text supported in quiz schema
- Optional hint text is displayed before answering when available and does not affect scoring
- Selected explanations refined for clearer beginner learning feedback
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
- Home category screen highlights today's mission with remaining-question guidance and a clearer completion status
- Home category screen shows a lightweight Learning Stats snapshot with total XP, accuracy signal, and completed questions
- Home category screen shows a lightweight Next Milestone snapshot with XP checkpoint distance and next locked achievement target
- Home category screen shows a lightweight Weekly Learning Snapshot placeholder using current saved progress until weekly history tracking exists
- Category dashboard helps users resume partially completed tracks
- Home dashboard information hierarchy prioritizes today's mission, then category cards, then secondary analytics and achievements

### Architecture / Testing
- Reusable QuizCard, ProgressBar, CategorySelector, and ExplanationCard components
- Reusable presentational LearningStatsPanel component displays existing derived progress signals without new storage or state management and avoids duplicating top-level streak/daily-goal indicators
- Reusable presentational NextMilestonePanel component displays existing derived motivation signals without new storage or state management and avoids duplicating the top-level daily mission
- Reusable presentational WeeklyLearningSnapshot component displays an explicitly labeled current-progress proxy without new storage or state management
- Quiz logic separated from UI logic in lib helpers
- Quiz retry and XP persistence helpers keep session progress separate from saved category progress
- Streak and daily goal localStorage state management extracted into small reusable hooks
- Category progress dashboard logic separated into pure helpers and a localStorage hook
- Achievement logic centralized in pure lib helpers with React/localStorage orchestration in hooks
- Adaptive review recommendation logic centralized in pure lib helpers with hook orchestration
- Weak-area insight logic centralized in pure lib helpers with hook orchestration
- Concept analytics logic centralized in pure lib helpers with hook orchestration
- Wrong-answer history localStorage orchestration extracted into a hook, with pure helpers for saved ID normalization and recency ordering
- Learning progress derived values for XP totals, progress percentages, current question metadata, and completion status extracted into a focused hook
- Quiz progress localStorage read/write and restore orchestration extracted into a focused hook while preserving category-specific storage keys
- Quiz metadata hero and session score rendering extracted into a focused presentational QuizHero component
- Quiz completion and review summary rendering extracted into a focused presentational QuizResults component
- Versioned localStorage payload metadata added for future adaptive learning compatibility
- Initial tests and focused logic tests for quiz data, hint support, difficulty XP, quiz retry XP persistence, streaks, daily goals, category progress, achievements, wrong-answer history, adaptive review recommendations, weak-area insights, and concept analytics
- npm test and npm run build pass in the current local Codex environment
- Local verification previously confirmed category flow, XP, refresh restore, and category-specific progress behavior
- README expanded to describe the scalable Duolingo-style platform MVP, architecture, persistence, workflow, testing, and future plans

## In Progress
- Project structure stabilization
- Daily reporting workflow
- Multi-agent development setup
- Ongoing browser-level regression verification as adaptive learning features expand

## Issues
- Codex in-app browser automation does not expose direct localStorage inspection APIs, so browser persistence verification uses visible refresh/restore behavior plus logic tests.
- Future browser regressions should continue covering new learning flows as features expand.

## Local Verification
- npm test passed locally
- npm run build passed locally
- Latest dashboard hierarchy simplification verification passed npm test (85/85 tests) and npm run build
- Latest Weekly Learning Snapshot verification passed npm test (85/85 tests) and npm run build
- Latest Next Milestone panel verification passed npm test (85/85 tests) and npm run build
- Latest Learning Stats panel verification passed npm test (85/85 tests) and npm run build
- Latest balanced starter track verification passed npm test (85/85 tests) and npm run build
- Latest content expansion verification passed npm test (85/85 tests) and npm run build
- Latest dev server smoke check returned HTTP 200 OK for the home route
- Full browser learning-flow verification covered category selection, quiz progression, hint rendering, explanation rendering, XP accumulation, total XP restore after refresh, Try again behavior, wrong-answer review, recommended review, weak-area insights, concept focus, achievements, daily goal, streak, dashboard hierarchy, and 390px mobile layout.
- Browser verification found no app bugs requiring code changes.
- Browser smoke check confirmed the refined dashboard and Concept Focus section headings.
- npm run dev started successfully locally
- Category selection screen was confirmed
- Python / SQL / AI / Bioinformatics buttons were confirmed
- Category-to-quiz flow works
- XP increases after solving questions
- Progress persists after refresh
- Category-specific progress is stored separately

## 웹앱 직접 확인 체크리스트
- 첫 화면: 대시보드와 Python / SQL / AI / Bioinformatics 카테고리 버튼이 정상적으로 보이는지 확인한다.
- 퀴즈 흐름: 카테고리를 선택하고, 문제를 풀고, 제출했을 때 피드백과 설명 카드가 나오는지 확인한다.
- 진행률과 XP: 진행률 바, 현재 문제 번호, 세션 XP, 총 XP가 자연스럽게 업데이트되는지 확인한다.
- 저장 상태: 퀴즈 중간 또는 완료 후 새로고침했을 때 선택한 카테고리, 진행 상황, XP가 복원되는지 확인한다.
- 다시 풀기와 오답 복습: Try again이 총 XP를 초기화하지 않고 새 세션을 시작하는지, 오답 복습에서는 XP가 증가하지 않는지 확인한다.
- 모바일 화면: 약 390px 너비에서 버튼, 카드, 텍스트가 겹치지 않고 가로 스크롤이 생기지 않는지 확인한다.

## Known Technical Debt

- localStorage schema is growing as progress, streak, daily goal, review, and achievements expand.
- Cross-feature dependencies are increasing between XP, streak, daily goal, category progress, and future achievements.
- Date-based reset logic may need shared utility functions later.
- app/page.jsx may still orchestrate too many learning systems.
- No centralized analytics layer yet.
- No backend sync or authentication yet.
- achievement unlock conditions may become difficult to maintain as milestones increase


## Recent Antigravity Report
~~~txt
[Antigravity QA Report - 2026-06-05 (16:37 KST)]
- Checked local time with date (Fri Jun  5 16:37:00 KST 2026) before writing this report.
- Audited the simplified homepage dashboard hierarchy in `CategorySelector.jsx`.
- Verified that Category Cards appear directly below the Today's focus, rendering core learning paths immediately.
- Confirmed that Stats/Milestones/Snapshot grids render in denser 2-column and 3-column formats on mobile to avoid scroll fatigue.
- Verified all 85 unit tests pass and Next.js production build succeeds with no warnings.
- App Status: 100% Healthy & Verified.

[Antigravity QA Report - 2026-06-05 (16:15 KST)]
- Checked local time with date (Fri Jun  5 16:15:11 KST 2026) before writing this report.
- Performed a visual/hierarchy review on homepage dashboard panels: Learning Stats, Next Milestone, and Weekly Learning Snapshot.
- Analyzed mobile layout behavior at 375px, 390px, and 430px widths and identified scroll fatigue issues due to single-column stacking of all secondary panels.
- Found metric redundancies (streaks, daily goal, accuracy) across panels and suggested deduplication.
- Verified 85/85 unit tests pass and Next.js production build succeeds with no warnings.
- App Status: 100% Healthy & Verified.

[Antigravity QA Report - 2026-06-05 (14:46 KST)]
- Checked local time with date (Fri Jun  5 14:46:02 KST 2026) before writing this report.
- Reviewed and verified the user's/Codex's dataset balancing (SQL, AI, and Bioinformatics now expanded to 10 questions each, matching Python).
- Reviewed and verified the presentational `LearningStatsPanel.jsx`, `NextMilestonePanel.jsx`, and `WeeklyLearningSnapshot.jsx` components.
- Confirmed that props map cleanly to statistics indicators (Total XP, Accuracy, Questions Completed, Current Streak, and Daily Goal Progress), motivation indicators (XP until next milestone, next locked achievement target, and daily mission remaining count), and weekly snapshot metrics.
- Confirmed that values are correctly derived in `app/page.jsx` using purely derived state computations without redundant storage state.
- Verified that responsive styles in `app/globals.css` properly position the statistics, milestone, and weekly snapshot panel layouts.
- Confirmed that distractor options are unambiguous and correctOptionIndex mappings are accurate across all newly added questions.
- Verified all 85 unit tests pass and Next.js production build successfully compiles.
- App Status: 100% Healthy & Verified.




[Antigravity QA Report - 2026-06-04]
- Checked local time with date (Thu Jun  4 18:16:04 KST 2026) before writing this report.
- Performed a focused mobile visual QA pass on the Today’s Mission panel across 375px, 390px, and 430px viewports.
- Confirmed visual stability, text wrapping (title and description), progress track scaling, and vertical stacking.
- Fixed a visual issue in app/globals.css where the status pill (.daily-goal-status) stretched full-width in column layouts; added `align-self: flex-start` to maintain a compact, left-aligned badge.
- Verified Next.js Turbopack build and 85/85 unit tests pass cleanly.
- App Status: 100% Healthy & Verified.

[Antigravity QA Report - 2026-06-02]
- Reviewed, verified, and signed off on the complete decoupled microlearning loop architecture: "useQuizProgressStorageState", "createAnswerSubmission", "updateSubmittedAnswers", "QuizHero", "QuizResults", "ExplanationCard" (Active Quiz Feedback UX Polish), and "CategorySelector" (Daily Mission Visibility Polish).
- Confirmed that delegating raw progress storage logic to the `useQuizProgressStorageState` hook preserves category flow, localStorage persistence, XP scoring, and retry/review behaviors.
- Confirmed that extracting the answer payload creation to `lib/createAnswerSubmission.js` separates concerns, standardizes mode-specific XP scoring, and preserves incorrect-answer registering and review flows.
- Confirmed that extracting the answer update/replacement logic to `lib/updateSubmittedAnswers.js` simplifies the state updates in `app/page.jsx` while keeping array immutability and duplicate cleanup.
- Confirmed that extracting the results visual interface to `components/QuizResults.jsx` cleanly isolates the results visual presentation while preserving completing, reviewing, and retrying flows.
- Confirmed that extracting the visual header panels to `components/QuizHero.jsx` cleanly isolates visual layout details while keeping category toolbar switching handlers inline in `app/page.jsx` to prevent callback-prop drilling.
- Confirmed that active quiz feedback UX polish correctly renders high-contrast border and background states, copy metrics, and accessibility styling using ExplanationCard.
- Confirmed that Daily Mission Visibility Polish correctly highlights Today's Mission remaining-question guidance and adds status pills while keeping the layout light and mobile-responsive inside CategorySelector.
- Completed full visual and architectural audit of the remaining layout in `app/page.jsx` and verified component boundary viability of a unified `QuizHero` presentational component with zero visual regression risk.
- Verified hook stability, memoization of callbacks, and the complete absence of React rendering-loop risks.
- Ran all 85 unit tests (85/85 passed) and verified successful Next.js Turbopack production build and dev server smoke check.
- App Status: 100% Healthy & Verified.
~~~
