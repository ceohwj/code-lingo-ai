import assert from "node:assert/strict";
import test from "node:test";

import { pythonBasicsQuiz, quizzes } from "../data/quizData.js";
import { DEFAULT_XP_BY_DIFFICULTY, SUPPORTED_DIFFICULTIES, calculateDifficultyXp, calculateXp, checkAnswer, getFeedback, getProgressPercent, getQuestionXp } from "../lib/quizLogic.js";

test("quiz data contains the required categories", () => {
  assert.deepEqual(
    quizzes.map((quiz) => quiz.categoryLabel),
    ["Python", "SQL", "AI", "Bioinformatics"]
  );
});

test("all quizzes contain valid multiple-choice questions", () => {
  assert.equal(pythonBasicsQuiz.questions.length, 10);

  const ids = new Set();

  for (const quiz of quizzes) {
    assert.equal(typeof quiz.id, "string");
    assert.equal(typeof quiz.categoryId, "string");
    assert.equal(typeof quiz.categoryLabel, "string");
    assert.equal(typeof quiz.title, "string");
    assert.equal(typeof quiz.subtitle, "string");
    assert.deepEqual(quiz.difficultyLevels, SUPPORTED_DIFFICULTIES);
    assert.deepEqual(quiz.xpByDifficulty, DEFAULT_XP_BY_DIFFICULTY);
    assert.ok(quiz.questions.length > 0);

    for (const question of quiz.questions) {
      assert.equal(typeof question.id, "string");
      assert.equal(ids.has(question.id), false);
      ids.add(question.id);
      assert.ok(question.prompt.length > 0);
      assert.equal(typeof question.difficulty, "string");
      assert.ok(SUPPORTED_DIFFICULTIES.includes(question.difficulty));
      assert.equal(question.options.length, 4);
      assert.ok(question.options.every((option) => option.length > 0));
      assert.ok(question.correctOptionIndex >= 0);
      assert.ok(question.correctOptionIndex < question.options.length);
      assert.equal(typeof question.explanation, "string");
      assert.ok(question.explanation.length > 20);
      assert.ok(Array.isArray(question.conceptTags));
      assert.ok(question.conceptTags.length > 0);
      assert.ok(question.conceptTags.every((conceptTag) => typeof conceptTag === "string" && conceptTag.length > 0));
      if (question.commonMistake !== undefined) {
        assert.equal(typeof question.commonMistake, "string");
        assert.ok(question.commonMistake.length > 20);
      }
    }
  }
});

test("at least one question includes optional common mistake helper text", () => {
  assert.ok(quizzes.some((quiz) => quiz.questions.some((question) => question.commonMistake)));
});

test("quiz content includes easy medium and hard questions", () => {
  const difficulties = new Set(quizzes.flatMap((quiz) => quiz.questions.map((question) => question.difficulty)));

  assert.deepEqual([...difficulties].sort(), [...SUPPORTED_DIFFICULTIES].sort());
});

test("quiz content includes lightweight concept tags", () => {
  const conceptTags = new Set(quizzes.flatMap((quiz) => quiz.questions.flatMap((question) => question.conceptTags)));

  assert.ok(conceptTags.has("loops"));
  assert.ok(conceptTags.has("joins"));
  assert.ok(conceptTags.has("overfitting"));
  assert.ok(conceptTags.has("sequence-alignment"));
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

test("legacy XP helper is based on correct answers only", () => {
  assert.equal(calculateXp(7, pythonBasicsQuiz.xpPerCorrectAnswer), 70);
});

test("difficulty XP rewards scale by question difficulty", () => {
  const easyQuestion = { difficulty: "easy" };
  const mediumQuestion = { difficulty: "medium" };
  const hardQuestion = { difficulty: "hard" };

  assert.equal(getQuestionXp(easyQuestion), 10);
  assert.equal(getQuestionXp(mediumQuestion), 15);
  assert.equal(getQuestionXp(hardQuestion), 25);
});

test("difficulty XP totals only correct answers", () => {
  const questions = [
    { id: "q1", difficulty: "easy" },
    { id: "q2", difficulty: "medium" },
    { id: "q3", difficulty: "hard" }
  ];
  const answers = [
    { questionId: "q1", isCorrect: true },
    { questionId: "q2", isCorrect: false },
    { questionId: "q3", isCorrect: true }
  ];

  assert.equal(calculateDifficultyXp(answers, questions), 35);
});

test("progress percentage is rounded and safe for empty quizzes", () => {
  assert.equal(getProgressPercent(3, 10), 30);
  assert.equal(getProgressPercent(1, 3), 33);
  assert.equal(getProgressPercent(1, 0), 0);
});

test("feedback has separate messages for correct and incorrect answers", () => {
  assert.notEqual(getFeedback(true), getFeedback(false));
});
