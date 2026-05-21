import assert from "node:assert/strict";
import test from "node:test";

import {
  DAILY_GOAL_STORAGE_KEY,
  DEFAULT_DAILY_GOAL_TARGET,
  addCompletedDailyGoalQuestions,
  getInitialDailyGoalState,
  normalizeDailyGoalState
}
from "../lib/dailyGoalLogic.js";

test("daily goal exports a stable storage key and default target", () => {
  assert.equal(DAILY_GOAL_STORAGE_KEY, "codelingo-ai-daily-goal");
  assert.equal(DEFAULT_DAILY_GOAL_TARGET, 5);
});

test("initial daily goal state starts empty for the local day", () => {
  assert.deepEqual(getInitialDailyGoalState("2026-05-21"), {
    schemaVersion: 1,
    dateKey: "2026-05-21",
    completedQuestionCount: 0,
    target: 5,
    progressPercent: 0,
    isCompleted: false,
    updatedAt: null
  });
});

test("daily goal increments completed normal quiz questions", () => {
  const state = addCompletedDailyGoalQuestions(getInitialDailyGoalState("2026-05-21"), 2, "2026-05-21");

  assert.equal(state.completedQuestionCount, 2);
  assert.equal(state.target, 5);
  assert.equal(state.progressPercent, 40);
  assert.equal(state.isCompleted, false);
  assert.equal(typeof state.updatedAt, "string");
});

test("daily goal is completed when completed question count reaches target", () => {
  const state = addCompletedDailyGoalQuestions({
    schemaVersion: 1,
    dateKey: "2026-05-21",
    completedQuestionCount: 4,
    target: 5,
    progressPercent: 80,
    isCompleted: false,
    updatedAt: null
  }, 1, "2026-05-21");

  assert.equal(state.completedQuestionCount, 5);
  assert.equal(state.progressPercent, 100);
  assert.equal(state.isCompleted, true);
});

test("daily goal progress percentage is capped at 100", () => {
  const state = addCompletedDailyGoalQuestions(getInitialDailyGoalState("2026-05-21"), 8, "2026-05-21");

  assert.equal(state.completedQuestionCount, 8);
  assert.equal(state.progressPercent, 100);
  assert.equal(state.isCompleted, true);
});

test("daily goal resets on a new local calendar day", () => {
  const normalizedState = normalizeDailyGoalState({
    schemaVersion: 1,
    dateKey: "2026-05-21",
    completedQuestionCount: 5,
    target: 5,
    progressPercent: 100,
    isCompleted: true,
    updatedAt: "2026-05-21T00:00:00.000Z"
  }, "2026-05-22");

  assert.deepEqual(normalizedState, {
    schemaVersion: 1,
    dateKey: "2026-05-22",
    completedQuestionCount: 0,
    target: 5,
    progressPercent: 0,
    isCompleted: false,
    updatedAt: null
  });
});

test("daily goal normalization cleans invalid saved state", () => {
  const normalizedState = normalizeDailyGoalState({
    schemaVersion: 1,
    dateKey: "2026-05-21",
    completedQuestionCount: -3,
    target: "bad",
    progressPercent: 99,
    isCompleted: true,
    updatedAt: 123
  }, "2026-05-21");

  assert.deepEqual(normalizedState, {
    schemaVersion: 1,
    dateKey: "2026-05-21",
    completedQuestionCount: 0,
    target: 5,
    progressPercent: 0,
    isCompleted: false,
    updatedAt: null
  });
});
