import assert from "node:assert/strict";
import test from "node:test";

import { updateSubmittedAnswers } from "../lib/updateSubmittedAnswers.js";

test("submitted answer update appends a new answer", () => {
  const currentAnswers = [{ questionId: "q1", isCorrect: true }];
  const nextAnswer = { questionId: "q2", isCorrect: false };

  assert.deepEqual(updateSubmittedAnswers(currentAnswers, nextAnswer), [
    { questionId: "q1", isCorrect: true },
    { questionId: "q2", isCorrect: false }
  ]);
});

test("submitted answer update replaces an existing answer for the same question", () => {
  const currentAnswers = [
    { questionId: "q1", isCorrect: false, selectedOptionIndex: 0 },
    { questionId: "q2", isCorrect: true, selectedOptionIndex: 1 }
  ];
  const nextAnswer = { questionId: "q1", isCorrect: true, selectedOptionIndex: 2 };

  assert.deepEqual(updateSubmittedAnswers(currentAnswers, nextAnswer), [
    { questionId: "q2", isCorrect: true, selectedOptionIndex: 1 },
    { questionId: "q1", isCorrect: true, selectedOptionIndex: 2 }
  ]);
});

test("submitted answer update removes duplicate stale answers for the same question", () => {
  const currentAnswers = [
    { questionId: "q1", isCorrect: false },
    { questionId: "q2", isCorrect: true },
    { questionId: "q1", isCorrect: false }
  ];
  const nextAnswer = { questionId: "q1", isCorrect: true };

  assert.deepEqual(updateSubmittedAnswers(currentAnswers, nextAnswer), [
    { questionId: "q2", isCorrect: true },
    { questionId: "q1", isCorrect: true }
  ]);
});

test("submitted answer update does not mutate the current answer array", () => {
  const currentAnswers = [{ questionId: "q1", isCorrect: true }];
  const nextAnswer = { questionId: "q1", isCorrect: false };

  const updatedAnswers = updateSubmittedAnswers(currentAnswers, nextAnswer);

  assert.notEqual(updatedAnswers, currentAnswers);
  assert.deepEqual(currentAnswers, [{ questionId: "q1", isCorrect: true }]);
});
