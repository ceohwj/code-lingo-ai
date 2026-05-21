# PROJECT_STATUS.md

## Current Status
Quiz MVP supports category selection, reusable quiz UI components, dedicated explanation cards, difficulty-based XP, daily streak tracking, improved progress summary UI, clearer wrong-answer review mode, JSON question files, and category-specific browser progress restore.

## Done
- Basic quiz screen
- Python beginner quiz data
- Answer check logic
- Correct/incorrect feedback
- Explanation display
- XP system
- Progress bar
- Basic responsive UI
- Initial tests
- Build check
- Learning checkpoint UI
- Final review summary
- localStorage progress save and restore
- Category selection before quiz start
- Separate selected category storage
- Reusable QuizCard, ProgressBar, and CategorySelector components
- Question data organized under data/questions/*.json
- Local verification for category flow, XP, refresh restore, and category-specific progress
- Improved quiz progress summary after category selection
- Selected category name shown in quiz progress area
- Progress summary shows current question, total questions, progress percentage, and current XP
- Wrong-answer review mode before quiz start
- Incorrect answers saved separately by category
- Review mode reuses QuizCard and ProgressBar without overwriting normal quiz progress
- Question data includes difficulty metadata for future scaling
- Review sessions keep a stable question list while saved wrong answers update
- Category cards show clear wrong-answer counts
- Disabled review buttons show a clearer no-review state
- End-of-review summary shows reviewed, corrected, and remaining wrong answers
- Review mode does not award XP or overwrite normal quiz progress
- Scalable easy / medium / hard difficulty support
- Difficulty-based XP rewards separated in quiz logic
- Current question difficulty and XP reward displayed in quiz UI
- Versioned localStorage payload metadata added for future adaptive learning compatibility
- Dedicated explanation card after each submitted answer
- Explanation card shows correct answer, explanation, earned XP, and difficulty
- Optional common mistake helper text supported in quiz schema
- Explanation rendering is reusable through ExplanationCard
- Daily streak logic added with local calendar day tracking
- Home category screen shows current streak, today completed state, and best streak
- Normal quiz completion marks daily streak once per day
- Wrong-answer review mode does not trigger daily streak completion
- Streak tests cover initial state, first completion, duplicate same-day completion, next-day continuation, missed-day reset, and invalid saved-state normalization

## In Progress
- Project structure stabilization
- Daily reporting workflow
- Multi-agent development setup

## Issues
- Codex environment cannot run Next build/dev because the local Next SWC binary fails code signature validation and wasm fallback packages are not installed.
- npm is unavailable inside the Codex environment, so Codex used direct commands where possible.

## Local Verification
- npm test passed locally
- npm run dev started successfully locally
- Category selection screen was confirmed
- Python / SQL / AI / Bioinformatics buttons were confirmed
- Category-to-quiz flow works
- XP increases after solving questions
- Progress persists after refresh
- Category-specific progress is stored separately

## Recent Codex Report
~~~txt
[Codex Result]
- Read AGENTS.md, PROJECT_STATUS.md, ROADMAP.md, and docs/DAILY_LOG.md before continuing.
- Completed the requested agent review before implementation and chose the MVP-friendly streak approach.
- Added localStorage-only daily streak state under a dedicated streak key.
- Added pure streak logic for local calendar dates, same-day duplicate prevention, consecutive-day incrementing, missed-day reset, and saved-state normalization.
- Added a home/category screen streak summary showing current streak, today completed state, and best streak.
- Connected streak completion only to normal quiz completion; wrong-answer review mode does not trigger streak updates.
- npm test could not run in Codex because npm is unavailable.
- node --test passed in Codex, 18/18 tests.
- npm run build could not run in Codex because npm is unavailable.
- Direct Next build failed in Codex because the environment cannot load the Next SWC binary.
~~~
