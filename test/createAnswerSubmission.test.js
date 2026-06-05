import assert from "node:assert/strict";
import test from "node:test";

import { createAnswerMetadata, createAnswerSubmission } from "../lib/createAnswerSubmission.js";

const quiz = {
  xpByDifficulty: {
    easy: 10,
    medium: 15,
    hard: 25
  }
};

const question = {
  correctOptionIndex: 2,
  difficulty: "hard",
  id: "python-hard-1"
};

test("answer metadata captures question identity difficulty selection and correctness", () => {
  assert.deepEqual(createAnswerMetadata(question, 2), {
    questionId: "python-hard-1",
    questionDifficulty: "hard",
    selectedOptionIndex: 2,
    isCorrect: true
  });
});

test("normal quiz answer submission awards difficulty XP for correct answers", () => {
  assert.deepEqual(createAnswerSubmission({ question, quiz, selectedOptionIndex: 2 }), {
    schemaVersion: 1,
    questionId: "python-hard-1",
    questionDifficulty: "hard",
    selectedOptionIndex: 2,
    isCorrect: true,
    xpAwarded: 25
  });
});

test("answer submission awards no XP for incorrect or review answers", () => {
  assert.equal(createAnswerSubmission({ question, quiz, selectedOptionIndex: 0 }).xpAwarded, 0);
  assert.equal(createAnswerSubmission({ isReviewMode: true, question, quiz, selectedOptionIndex: 2 }).xpAwarded, 0);
});
