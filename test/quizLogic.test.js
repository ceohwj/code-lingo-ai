import assert from "node:assert/strict";
import test from "node:test";

import { pythonBasicsQuiz } from "../data/quizData.js";
import { calculateXp, checkAnswer, getFeedback, getProgressPercent } from "../lib/quizLogic.js";

test("Python basics quiz contains 10 valid multiple-choice questions", () => {
  assert.equal(pythonBasicsQuiz.questions.length, 10);

  const ids = new Set();

  for (const question of pythonBasicsQuiz.questions) {
    assert.equal(typeof question.id, "string");
    assert.equal(ids.has(question.id), false);
    ids.add(question.id);
    assert.ok(question.prompt.length > 0);
    assert.equal(question.options.length, 4);
    assert.ok(question.options.every((option) => option.length > 0));
    assert.ok(question.correctOptionIndex >= 0);
    assert.ok(question.correctOptionIndex < question.options.length);
    assert.equal(typeof question.explanation, "string");
    assert.ok(question.explanation.length > 20);
  }
});

test("checkAnswer returns true for the correct option", () => {
  const question = pythonBasicsQuiz.questions[0];

  assert.equal(checkAnswer(question, question.correctOptionIndex), true);
});

test("checkAnswer returns false for an incorrect option", () => {
  const question = pythonBasicsQuiz.questions[0];
  const incorrectIndex = question.correctOptionIndex === 0 ? 1 : 0;

  assert.equal(checkAnswer(question, incorrectIndex), false);
});

test("XP is based on correct answers only", () => {
  assert.equal(calculateXp(7, pythonBasicsQuiz.xpPerCorrectAnswer), 70);
});

test("progress percentage is rounded and safe for empty quizzes", () => {
  assert.equal(getProgressPercent(3, 10), 30);
  assert.equal(getProgressPercent(1, 3), 33);
  assert.equal(getProgressPercent(1, 0), 0);
});

test("feedback has separate messages for correct and incorrect answers", () => {
  assert.notEqual(getFeedback(true), getFeedback(false));
});
