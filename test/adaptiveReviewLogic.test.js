import assert from "node:assert/strict";
import test from "node:test";

import { getAdaptiveReviewRecommendations, getCategoryRecommendationScore } from "../lib/adaptiveReviewLogic.js";

const categories = [
  {
    categoryId: "python",
    categoryLabel: "Python",
    questions: [
      { id: "py-easy", difficulty: "easy", prompt: "Easy Python prompt" },
      { id: "py-hard", difficulty: "hard", prompt: "Hard Python prompt" }
    ]
  },
  {
    categoryId: "sql",
    categoryLabel: "SQL",
    questions: [
      { id: "sql-medium", difficulty: "medium", prompt: "Medium SQL prompt" },
      { id: "sql-hard", difficulty: "hard", prompt: "Hard SQL prompt" }
    ]
  },
  {
    categoryId: "ai",
    categoryLabel: "AI",
    questions: [
      { id: "ai-easy", difficulty: "easy", prompt: "Easy AI prompt" }
    ]
  }
];

test("adaptive review returns no recommendations without wrong answers", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    wrongAnswerIdsByCategory: {}
  });

  assert.deepEqual(recommendations, []);
});

test("adaptive review ignores unknown question ids and categories with no valid misses", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["missing-question"]
    }
  });

  assert.deepEqual(recommendations, []);
});

test("adaptive review prioritizes high-difficulty missed questions", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 80 },
      sql: { completionPercentage: 80 }
    },
    wrongAnswerIdsByCategory: {
      python: ["py-easy"],
      sql: ["sql-hard"]
    }
  });

  assert.equal(recommendations[0].categoryId, "sql");
  assert.equal(recommendations[0].hardestDifficulty, "hard");
});

test("adaptive review prioritizes low-progress categories when misses are otherwise similar", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 15 },
      ai: { completionPercentage: 90 }
    },
    wrongAnswerIdsByCategory: {
      python: ["py-easy"],
      ai: ["ai-easy"]
    }
  });

  assert.equal(recommendations[0].categoryId, "python");
  assert.equal(recommendations[0].reason, "Low category progress with saved misses");
});

test("adaptive review uses the latest saved wrong answer as the recent focus", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["py-easy", "py-hard"]
    }
  });

  assert.equal(recommendations[0].mostRecentQuestionId, "py-hard");
  assert.equal(recommendations[0].mostRecentQuestionPrompt, "Hard Python prompt");
});

test("adaptive review caps returned recommendations by limit", () => {
  const recommendations = getAdaptiveReviewRecommendations({
    categories,
    limit: 1,
    wrongAnswerIdsByCategory: {
      python: ["py-easy"],
      sql: ["sql-hard"],
      ai: ["ai-easy"]
    }
  });

  assert.equal(recommendations.length, 1);
});

test("category recommendation score increases for repeated recent misses and lower progress", () => {
  const lowProgressScore = getCategoryRecommendationScore([
    { difficulty: "easy" },
    { difficulty: "easy" }
  ], 10);
  const highProgressScore = getCategoryRecommendationScore([
    { difficulty: "easy" }
  ], 90);

  assert.ok(lowProgressScore > highProgressScore);
});
