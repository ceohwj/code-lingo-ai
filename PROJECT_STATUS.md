# PROJECT_STATUS.md

## Current Status
Quiz MVP supports category selection, reusable quiz UI components, improved progress summary UI, wrong-answer review mode, JSON question files, and category-specific browser progress restore.

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
- Implemented wrong-answer review mode from the category selection screen.
- Saves incorrect question IDs separately by category using codelingo-ai-<category>-wrong-answers keys.
- Correct answers remove questions from that category's wrong-answer bank.
- Review mode reuses QuizCard and ProgressBar and does not overwrite normal category progress storage.
- Kept existing XP calculation and answer checking flow compatible.
- Added difficulty metadata to question JSON for future difficulty-level scaling.
- npm test could not run in Codex because npm is unavailable.
- node --test passed in Codex as the direct equivalent.
- npm run build could not run in Codex because npm is unavailable.
- Direct Next build failed in Codex because the environment cannot load the Next SWC binary.
~~~
