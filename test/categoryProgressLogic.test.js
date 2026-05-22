import assert from "node:assert/strict";
import test from "node:test";

import { pythonBasicsQuiz } from "../data/quizData.js";
import { getCategoryProgressStatus, getCategoryProgressStorageKey, getCategoryProgressSummary } from "../lib/categoryProgressLogic.js";

test("category progress storage keys preserve existing progress keys", () => {
  assert.equal(getCategoryProgressStorageKey("python"), "codelingo-ai-python-basics-progress");
  assert.equal(getCategoryProgressStorageKey("sql"), "codelingo-ai-sql-basics-progress");
  assert.equal(getCategoryProgressStorageKey("ai"), "codelingo-ai-ai-basics-progress");
  assert.equal(getCategoryProgressStorageKey("bioinformatics"), "codelingo-ai-bioinformatics-basics-progress");
  assert.equal(getCategoryProgressStorageKey("custom"), "codelingo-ai-custom-progress");
});

test("category progress summary returns not started without saved progress", () => {
  const summary = getCategoryProgressSummary(pythonBasicsQuiz, null);

  assert.deepEqual(summary, {
    categoryId: "python",
    completedQuestionCount: 0,
    totalQuestions: pythonBasicsQuiz.questions.length,
    completionPercentage: 0,
    earnedXp: 0,
    status: "not-started"
  });
});

test("category progress summary derives completed count percentage and XP from saved progress", () => {
  const savedProgress = JSON.stringify({
    completedQuestions: [
      { questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true },
      { questionId: pythonBasicsQuiz.questions[1].id, isCorrect: false },
      { questionId: pythonBasicsQuiz.questions[2].id, isCorrect: true }
    ],
    xp: 35
  });
  const summary = getCategoryProgressSummary(pythonBasicsQuiz, savedProgress);

  assert.equal(summary.completedQuestionCount, 3);
  assert.equal(summary.totalQuestions, pythonBasicsQuiz.questions.length);
  assert.equal(summary.completionPercentage, 30);
  assert.equal(summary.earnedXp, 35);
  assert.equal(summary.status, "in-progress");
});

test("category progress summary ignores duplicate and unknown question ids", () => {
  const savedProgress = JSON.stringify({
    completedQuestions: [
      { questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true },
      { questionId: pythonBasicsQuiz.questions[0].id, isCorrect: false },
      { questionId: "missing-question", isCorrect: true }
    ]
  });
  const summary = getCategoryProgressSummary(pythonBasicsQuiz, savedProgress);

  assert.equal(summary.completedQuestionCount, 1);
  assert.equal(summary.completionPercentage, 10);
});

test("category progress summary marks completed when all questions are done", () => {
  const savedProgress = JSON.stringify({
    completedQuestions: pythonBasicsQuiz.questions.map((question) => ({
      questionId: question.id,
      isCorrect: true
    }))
  });
  const summary = getCategoryProgressSummary(pythonBasicsQuiz, savedProgress);

  assert.equal(summary.completedQuestionCount, pythonBasicsQuiz.questions.length);
  assert.equal(summary.completionPercentage, 100);
  assert.equal(summary.status, "completed");
});

test("category progress summary safely handles invalid saved progress", () => {
  const summary = getCategoryProgressSummary(pythonBasicsQuiz, "not-json");

  assert.equal(summary.completedQuestionCount, 0);
  assert.equal(summary.completionPercentage, 0);
  assert.equal(summary.earnedXp, 0);
  assert.equal(summary.status, "not-started");
});

test("category progress statuses distinguish not started in progress and completed", () => {
  assert.equal(getCategoryProgressStatus(0, 10), "not-started");
  assert.equal(getCategoryProgressStatus(4, 10), "in-progress");
  assert.equal(getCategoryProgressStatus(10, 10), "completed");
});
