import assert from "node:assert/strict";
import test from "node:test";

import { formatConceptLabel, getConceptFocusInsights, getQuestionConceptTags } from "../lib/conceptAnalyticsLogic.js";

const categories = [
  {
    categoryId: "python",
    categoryLabel: "Python",
    questions: [
      { conceptTags: ["loops", "lists"], id: "py-loop" },
      { conceptTag: "strings", id: "py-string" },
      { conceptTag: ["strings", "input"], id: "py-input" }
    ]
  },
  {
    categoryId: "sql",
    categoryLabel: "SQL",
    questions: [
      { conceptTags: ["joins", "left-join"], id: "sql-join" },
      { conceptTags: ["where", "filtering"], id: "sql-where" }
    ]
  }
];

test("question concept tags normalize conceptTags and legacy conceptTag forms", () => {
  assert.deepEqual(getQuestionConceptTags({ conceptTags: [" Loops ", "loops"], conceptTag: ["Lists", ""] }), ["loops", "lists"]);
});

test("concept labels are readable", () => {
  assert.equal(formatConceptLabel("left-join"), "Left Join");
});

test("concept focus returns empty state without concept signals", () => {
  assert.deepEqual(getConceptFocusInsights({ categories, wrongAnswerIdsByCategory: {} }), []);
});

test("concept focus derives frequently missed concepts from wrong-answer history", () => {
  const insights = getConceptFocusInsights({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["py-string", "py-input"]
    }
  });

  assert.equal(insights[0].conceptTag, "strings");
  assert.equal(insights[0].message, "Strings is frequently missed");
  assert.equal(insights[0].missedQuestionCount, 2);
});

test("concept focus uses adaptive review recommendations as review signals", () => {
  const insights = getConceptFocusInsights({
    categories,
    reviewRecommendations: [
      { categoryId: "sql", mostRecentQuestionId: "sql-join" }
    ]
  });

  assert.equal(insights[0].conceptTag, "joins");
  assert.equal(insights[0].message, "Joins needs review");
});

test("concept focus uses weak-area insights as supporting signals", () => {
  const insights = getConceptFocusInsights({
    categories,
    weakAreaInsights: [
      { categoryId: "sql", categoryLabel: "SQL", type: "low-progress" }
    ]
  });

  assert.ok(insights.some((insight) => insight.conceptTag === "joins"));
  assert.ok(insights.some((insight) => insight.conceptTag === "filtering"));
});

test("concept focus ignores unknown wrong-answer ids", () => {
  const insights = getConceptFocusInsights({
    categories,
    wrongAnswerIdsByCategory: {
      python: ["missing"]
    }
  });

  assert.deepEqual(insights, []);
});

test("concept focus respects limits", () => {
  const insights = getConceptFocusInsights({
    categories,
    limit: 1,
    weakAreaInsights: [
      { categoryId: "python", categoryLabel: "Python" },
      { categoryId: "sql", categoryLabel: "SQL" }
    ]
  });

  assert.equal(insights.length, 1);
});
