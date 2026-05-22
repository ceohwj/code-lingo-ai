import assert from "node:assert/strict";
import test from "node:test";

import { getNextWrongAnswerQuestionIds, normalizeWrongAnswerQuestionIds, parseSavedWrongAnswerIds } from "../lib/wrongAnswerHistoryLogic.js";

test("wrong-answer history normalizes valid unique question ids", () => {
  assert.deepEqual(normalizeWrongAnswerQuestionIds(["q1", null, "q1", "q2"]), ["q1", "q2"]);
  assert.deepEqual(normalizeWrongAnswerQuestionIds("q1"), []);
});

test("wrong-answer history parses legacy arrays and versioned payloads", () => {
  assert.deepEqual(parseSavedWrongAnswerIds(JSON.stringify(["q1", "q2"])), ["q1", "q2"]);
  assert.deepEqual(parseSavedWrongAnswerIds(JSON.stringify({ questionIds: ["q2", "q2", "q3"] })), ["q2", "q3"]);
});

test("wrong-answer history removes corrected questions", () => {
  assert.deepEqual(getNextWrongAnswerQuestionIds(["q1", "q2"], "q1", true), ["q2"]);
});

test("wrong-answer history moves repeated misses to the most recent position", () => {
  assert.deepEqual(getNextWrongAnswerQuestionIds(["q1", "q2", "q3"], "q1", false), ["q2", "q3", "q1"]);
});
