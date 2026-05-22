"use client";

import { useEffect, useState } from "react";

import { DAILY_GOAL_STORAGE_KEY, addCompletedDailyGoalQuestions, getInitialDailyGoalState, normalizeDailyGoalState } from "../lib/dailyGoalLogic";
import { getLocalDateKey } from "../lib/streakLogic";

export function useDailyGoalState() {
  const [dailyGoalState, setDailyGoalState] = useState(() => getInitialDailyGoalState(getLocalDateKey()));
  const [isDailyGoalLoaded, setIsDailyGoalLoaded] = useState(false);

  useEffect(() => {
    try {
      const todayDateKey = getLocalDateKey();
      const savedDailyGoalState = window.localStorage.getItem(DAILY_GOAL_STORAGE_KEY);
      setDailyGoalState(savedDailyGoalState
        ? normalizeDailyGoalState(JSON.parse(savedDailyGoalState), todayDateKey)
        : getInitialDailyGoalState(todayDateKey));
    } catch {
      setDailyGoalState(getInitialDailyGoalState(getLocalDateKey()));
    } finally {
      setIsDailyGoalLoaded(true);
    }
  }, []);

  function addTodayDailyGoalQuestion() {
    setDailyGoalState((currentDailyGoalState) => {
      const nextDailyGoalState = addCompletedDailyGoalQuestions(currentDailyGoalState, 1, getLocalDateKey());

      try {
        window.localStorage.setItem(DAILY_GOAL_STORAGE_KEY, JSON.stringify(nextDailyGoalState));
      } catch {
        // Ignore storage failures so answer flow keeps working.
      }

      return nextDailyGoalState;
    });
  }

  return {
    addTodayDailyGoalQuestion,
    dailyGoalState,
    isDailyGoalLoaded
  };
}
