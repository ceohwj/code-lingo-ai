import assert from "node:assert/strict";
import test from "node:test";

import { pythonBasicsQuiz, quizzes } from "../data/quizData.js";
import { ACHIEVEMENT_STORAGE_KEY, getAchievementFacts, getAchievementSummary, getInitialAchievementState, normalizeAchievementState, unlockAchievements } from "../lib/achievementLogic.js";

test("achievement storage key and initial state are versioned", () => {
  assert.equal(ACHIEVEMENT_STORAGE_KEY, "codelingo-ai-achievements");
  assert.deepEqual(getInitialAchievementState(), {
    schemaVersion: 1,
    unlockedAchievementIds: [],
    unlockedAtById: {},
    updatedAt: null
  });
});

test("achievement state normalizes invalid saved data", () => {
  const normalized = normalizeAchievementState({
    schemaVersion: 99,
    unlockedAchievementIds: ["first-correct-answer", "missing", "first-correct-answer"],
    unlockedAtById: {
      "first-correct-answer": "2026-05-22T00:00:00.000Z",
      missing: "2026-05-22T00:00:00.000Z"
    },
    updatedAt: 42
  });

  assert.deepEqual(normalized, {
    schemaVersion: 1,
    unlockedAchievementIds: ["first-correct-answer"],
    unlockedAtById: {
      "first-correct-answer": "2026-05-22T00:00:00.000Z"
    },
    updatedAt: null
  });
});

test("achievement facts derive correct answers from saved quiz progress", () => {
  const facts = getAchievementFacts({
    categories: [pythonBasicsQuiz],
    savedProgressByCategory: {
      python: JSON.stringify({
        completedQuestions: [
          { questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true },
          { questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true },
          { questionId: "unknown", isCorrect: true },
          { questionId: pythonBasicsQuiz.questions[1].id, isCorrect: false }
        ]
      })
    }
  });

  assert.equal(facts.totalCorrectAnswers, 1);
  assert.equal(facts.hasCompletedQuiz, false);
});

test("achievement facts ignore review-mode session answers", () => {
  const facts = getAchievementFacts({
    categories: [pythonBasicsQuiz],
    currentSession: {
      categoryId: "python",
      isComplete: true,
      isReviewMode: true,
      submittedAnswers: [{ questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true }],
      xp: 25
    }
  });

  assert.equal(facts.totalCorrectAnswers, 0);
  assert.equal(facts.hasCompletedQuiz, false);
  assert.equal(facts.totalEarnedXp, 0);
});

test("achievement facts include current normal quiz, streak, daily goal, XP, and category progress context", () => {
  const facts = getAchievementFacts({
    categories: [pythonBasicsQuiz],
    categoryProgressByCategory: {
      python: {
        completedQuestionCount: pythonBasicsQuiz.questions.length,
        totalQuestions: pythonBasicsQuiz.questions.length,
        completionPercentage: 100,
        earnedXp: 120,
        status: "completed"
      }
    },
    currentSession: {
      categoryId: "python",
      isComplete: true,
      isReviewMode: false,
      submittedAnswers: [{ questionId: pythonBasicsQuiz.questions[0].id, isCorrect: true }],
      xp: 10
    },
    dailyGoalState: { isCompleted: true },
    streakState: { currentStreak: 3 }
  });

  assert.equal(facts.hasCompletedCategory, true);
  assert.equal(facts.hasCompletedQuiz, true);
  assert.equal(facts.currentStreak, 3);
  assert.equal(facts.dailyGoalCompleted, true);
  assert.equal(facts.totalCorrectAnswers, 1);
  assert.equal(facts.totalEarnedXp, 120);
});

test("unlockAchievements unlocks milestone achievements from facts", () => {
  const unlocked = unlockAchievements(getInitialAchievementState(), {
    hasCompletedQuiz: true,
    hasCompletedCategory: true,
    currentStreak: 3,
    totalCorrectAnswers: 10
  }, "2026-05-22T01:00:00.000Z");

  assert.deepEqual(unlocked.unlockedAchievementIds, [
    "first-quiz-completed",
    "first-correct-answer",
    "three-day-streak",
    "ten-correct-answers",
    "category-completion"
  ]);
  assert.equal(unlocked.updatedAt, "2026-05-22T01:00:00.000Z");
});

test("unlockAchievements unlocks each achievement only once", () => {
  const first = unlockAchievements(getInitialAchievementState(), {
    hasCompletedQuiz: false,
    hasCompletedCategory: false,
    currentStreak: 0,
    totalCorrectAnswers: 1
  }, "2026-05-22T01:00:00.000Z");
  const second = unlockAchievements(first, {
    hasCompletedQuiz: false,
    hasCompletedCategory: false,
    currentStreak: 0,
    totalCorrectAnswers: 1
  }, "2026-05-23T01:00:00.000Z");

  assert.deepEqual(second.unlockedAchievementIds, ["first-correct-answer"]);
  assert.equal(second.unlockedAtById["first-correct-answer"], "2026-05-22T01:00:00.000Z");
  assert.equal(second.updatedAt, "2026-05-22T01:00:00.000Z");
});

test("achievement summary distinguishes locked and unlocked achievements", () => {
  const summary = getAchievementSummary({
    schemaVersion: 1,
    unlockedAchievementIds: ["first-correct-answer"],
    unlockedAtById: { "first-correct-answer": "2026-05-22T01:00:00.000Z" },
    updatedAt: "2026-05-22T01:00:00.000Z"
  });

  const firstCorrect = summary.find((achievement) => achievement.id === "first-correct-answer");
  const tenCorrect = summary.find((achievement) => achievement.id === "ten-correct-answers");

  assert.equal(summary.length, 5);
  assert.equal(firstCorrect.isUnlocked, true);
  assert.equal(firstCorrect.unlockedAt, "2026-05-22T01:00:00.000Z");
  assert.equal(tenCorrect.isUnlocked, false);
  assert.equal(tenCorrect.unlockedAt, null);
});

test("all configured quizzes can contribute to category completion achievements", () => {
  const completedProgressByCategory = Object.fromEntries(quizzes.map((quiz) => [quiz.categoryId, {
    completedQuestionCount: quiz.questions.length,
    totalQuestions: quiz.questions.length,
    completionPercentage: 100,
    earnedXp: 100,
    status: "completed"
  }]));
  const facts = getAchievementFacts({
    categories: quizzes,
    categoryProgressByCategory: completedProgressByCategory
  });

  assert.equal(facts.hasCompletedCategory, true);
});
