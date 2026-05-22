import assert from "node:assert/strict";
import test from "node:test";

import { getNewSessionAnswers, getPersistedQuizProgress, getQuestionIdSet, mergeCompletedAnswers } from "../lib/quizProgressLogic.js";

const questions = [
  { difficulty: "easy", id: "q1" },
  { difficulty: "medium", id: "q2" },
  { difficulty: "hard", id: "q3" }
];

test("question id set keeps valid answer ids only", () => {
  const ids = getQuestionIdSet([{ questionId: "q1" }, { questionId: null }, { questionId: "q2" }]);

  assert.equal(ids.has("q1"), true);
  assert.equal(ids.has("q2"), true);
  assert.equal(ids.has(null), false);
});

test("new session answers exclude answers already saved before the current attempt", () => {
  const answers = getNewSessionAnswers(
    [{ questionId: "q1", isCorrect: true }, { questionId: "q2", isCorrect: true }],
    new Set(["q1"])
  );

  assert.deepEqual(answers, [{ questionId: "q2", isCorrect: true }]);
});

test("completed answers preserve saved progress and allow latest session answer to replace a duplicate", () => {
  const mergedAnswers = mergeCompletedAnswers(
    [{ questionId: "q1", isCorrect: false }, { questionId: "q2", isCorrect: true }],
    [{ questionId: "q1", isCorrect: true }]
  );

  assert.deepEqual(mergedAnswers, [{ questionId: "q1", isCorrect: true }, { questionId: "q2", isCorrect: true }]);
});

test("persisted quiz progress preserves total XP when retry session is empty", () => {
  const progress = getPersistedQuizProgress({
    questions,
    savedCompletedAnswers: [{ questionId: "q1", isCorrect: true }],
    savedTotalXp: 40,
    sessionAnswers: [],
    sessionBaselineQuestionIds: []
  });

  assert.equal(progress.totalXp, 40);
  assert.deepEqual(progress.completedQuestions, [{ questionId: "q1", isCorrect: true }]);
});

test("persisted quiz progress adds only new current-session XP to saved total", () => {
  const progress = getPersistedQuizProgress({
    questions,
    savedCompletedAnswers: [{ questionId: "q1", isCorrect: true }],
    savedTotalXp: 10,
    sessionAnswers: [
      { questionId: "q1", isCorrect: true, xpAwarded: 10 },
      { questionId: "q2", isCorrect: true, xpAwarded: 15 },
      { questionId: "q3", isCorrect: false, xpAwarded: 0 }
    ],
    sessionBaselineQuestionIds: ["q1"]
  });

  assert.equal(progress.totalXp, 25);
  assert.equal(progress.completedQuestions.length, 3);
});

test("persisted quiz progress can accumulate XP from a fresh retry attempt", () => {
  const progress = getPersistedQuizProgress({
    questions,
    savedCompletedAnswers: [{ questionId: "q1", isCorrect: true }],
    savedTotalXp: 10,
    sessionAnswers: [{ questionId: "q1", isCorrect: true, xpAwarded: 10 }],
    sessionBaselineQuestionIds: []
  });

  assert.equal(progress.totalXp, 20);
  assert.deepEqual(progress.completedQuestions, [{ questionId: "q1", isCorrect: true, xpAwarded: 10 }]);
});

test("persisted quiz progress safely handles invalid saved XP", () => {
  const progress = getPersistedQuizProgress({
    questions,
    savedTotalXp: Number.NaN,
    sessionAnswers: [{ questionId: "q1", isCorrect: true, xpAwarded: 10 }]
  });

  assert.equal(progress.totalXp, 10);
});
