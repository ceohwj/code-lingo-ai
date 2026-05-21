# CodeLingo AI

CodeLingo AI is a Duolingo-style microlearning app for programming and AI.

The MVP focuses on a beginner-friendly Python basics quiz with:

- 10 multiple-choice questions
- answer checking
- explanations after each submission
- progress tracking
- XP scoring
- responsive UI

## Run Locally

```bash
source ~/.nvm/nvm.sh
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Test

```bash
npm test
```

## Project Structure

```text
app/
  page.jsx        Quiz UI and interaction flow
  layout.jsx      App shell metadata
  globals.css     Responsive visual design
data/
  quizData.js     Python quiz content
lib/
  quizLogic.js    Answer checking and scoring helpers
test/
  quizLogic.test.js
```
