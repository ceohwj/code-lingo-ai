import assert from "node:assert/strict";
import test from "node:test";

import { getWeakAreaInsights } from "../lib/weakAreaInsightLogic.js";

const categories = [
  {
    categoryId: "python",
    categoryLabel: "Python",
    title: "Python basics",
    questions: [
      { id: "py-easy-1", difficulty: "easy" },
      { id: "py-hard-1", difficulty: "hard" }
    ]
  },
  {
    categoryId: "sql",
    categoryLabel: "SQL",
    title: "SQL basics",
    questions: [
      { id: "sql-hard-1", difficulty: "hard" },
      { id: "sql-hard-2", difficulty: "hard" },
      { id: "sql-medium-1", difficulty: "medium" }
    ]
  },
  {
    categoryId: "ai",
    categoryLabel: "AI",
    title: "AI basics",
    questions: [
      { id: "ai-easy-1", difficulty: "easy" }
    ]
  }
];

test("weak-area insights return empty state without weak signals", () => {
  const insights = getWeakAreaInsights({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 80 }
    },
    wrongAnswerIdsByCategory: {}
  });

  assert.deepEqual(insights, []);
});

test("weak-area insights detect low-progress categories", () => {
  const insights = getWeakAreaInsights({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 25 }
    }
  });

  assert.equal(insights[0].type, "low-progress");
  assert.equal(insights[0].message, "Python basics progress is low");
});

test("weak-area insights ignore not-started categories as weak areas", () => {
  const insights = getWeakAreaInsights({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 0 }
    }
  });

  assert.deepEqual(insights, []);
});

test("weak-area insights detect categories with repeated wrong answers", () => {
  const insights = getWeakAreaInsights({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["py-easy-1", "py-hard-1"]
    }
  });

  assert.equal(insights[0].type, "repeated-wrong-answers");
  assert.equal(insights[0].message, "You have repeated misses in Python");
});

test("weak-area insights detect repeated difficulty patterns", () => {
  const insights = getWeakAreaInsights({
    categories,
    wrongAnswerIdsByCategory: {
      sql: ["sql-hard-1", "sql-hard-2"]
    }
  });

  assert.equal(insights[0].type, "difficulty-pattern");
  assert.equal(insights[0].message, "You frequently miss hard SQL questions");
});

test("weak-area insights ignore unknown wrong-answer question ids", () => {
  const insights = getWeakAreaInsights({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["missing-1", "missing-2"]
    }
  });

  assert.deepEqual(insights, []);
});

test("weak-area insights use adaptive review recommendation priority as a supporting signal", () => {
  const insights = getWeakAreaInsights({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 25 },
      ai: { completionPercentage: 25 }
    },
    reviewRecommendations: [
      { categoryId: "ai", priorityScore: 80 }
    ]
  });

  assert.equal(insights[0].categoryId, "ai");
});

test("weak-area insights respect the requested limit", () => {
  const insights = getWeakAreaInsights({
    categories,
    categoryProgressByCategory: {
      python: { completionPercentage: 25 },
      sql: { completionPercentage: 20 },
      ai: { completionPercentage: 15 }
    },
    limit: 2
  });

  assert.equal(insights.length, 2);
});
