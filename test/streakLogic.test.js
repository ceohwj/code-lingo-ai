import assert from "node:assert/strict";
import test from "node:test";

import { completeLearningDay, getInitialStreakState, getLocalDateKey, normalizeStreakState } from "../lib/streakLogic.js";

test("initial streak state starts empty for the local day", () => {
  const state = getInitialStreakState("2026-05-21");

  assert.deepEqual(state, {
    schemaVersion: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedDates: [],
    todayCompleted: false,
    todayDateKey: "2026-05-21",
    updatedAt: null
  });
});

test("first completion starts a one-day streak", () => {
  const state = completeLearningDay(getInitialStreakState("2026-05-21"), "2026-05-21");

  assert.equal(state.currentStreak, 1);
  assert.equal(state.longestStreak, 1);
  assert.equal(state.lastCompletedDate, "2026-05-21");
  assert.deepEqual(state.completedDates, ["2026-05-21"]);
  assert.equal(state.todayCompleted, true);
  assert.equal(typeof state.updatedAt, "string");
});

test("same-day duplicate completion does not increment streak", () => {
  const firstState = completeLearningDay(getInitialStreakState("2026-05-21"), "2026-05-21");
  const duplicateState = completeLearningDay(firstState, "2026-05-21");

  assert.equal(duplicateState.currentStreak, 1);
  assert.equal(duplicateState.longestStreak, 1);
  assert.deepEqual(duplicateState.completedDates, ["2026-05-21"]);
});

test("next-day completion increments a consecutive streak", () => {
  const dayOneState = completeLearningDay(getInitialStreakState("2026-05-21"), "2026-05-21");
  const dayTwoState = completeLearningDay(dayOneState, "2026-05-22");

  assert.equal(dayTwoState.currentStreak, 2);
  assert.equal(dayTwoState.longestStreak, 2);
  assert.equal(dayTwoState.lastCompletedDate, "2026-05-22");
  assert.deepEqual(dayTwoState.completedDates, ["2026-05-21", "2026-05-22"]);
});

test("missed-day completion resets current streak and preserves longest streak", () => {
  const savedState = {
    schemaVersion: 1,
    currentStreak: 3,
    longestStreak: 3,
    lastCompletedDate: "2026-05-21",
    completedDates: ["2026-05-19", "2026-05-20", "2026-05-21"],
    todayCompleted: false,
    todayDateKey: "2026-05-23",
    updatedAt: "2026-05-21T00:00:00.000Z"
  };
  const resetState = completeLearningDay(savedState, "2026-05-23");

  assert.equal(resetState.currentStreak, 1);
  assert.equal(resetState.longestStreak, 3);
  assert.equal(resetState.lastCompletedDate, "2026-05-23");
  assert.deepEqual(resetState.completedDates, ["2026-05-19", "2026-05-20", "2026-05-21", "2026-05-23"]);
});

test("normalization cleans invalid saved state", () => {
  const normalizedState = normalizeStreakState({
    currentStreak: -4,
    longestStreak: "bad",
    lastCompletedDate: 20260521,
    completedDates: ["2026-05-21", "bad", "2026-05-21", null],
    todayCompleted: true,
    updatedAt: 123
  }, "2026-05-22");

  assert.deepEqual(normalizedState, {
    schemaVersion: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedDates: ["2026-05-21"],
    todayCompleted: false,
    todayDateKey: "2026-05-22",
    updatedAt: null
  });
});

test("local date keys use the provided Date object local calendar fields", () => {
  assert.equal(getLocalDateKey(new Date(2026, 4, 21, 23, 59)), "2026-05-21");
});
