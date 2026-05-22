"use client";

import { useEffect, useState } from "react";

import { STREAK_STORAGE_KEY, completeLearningDay, getInitialStreakState, getLocalDateKey, normalizeStreakState } from "../lib/streakLogic";

export function useStreakState() {
  const [streakState, setStreakState] = useState(() => getInitialStreakState());
  const [isStreakLoaded, setIsStreakLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedStreakState = window.localStorage.getItem(STREAK_STORAGE_KEY);
      setStreakState(savedStreakState
        ? normalizeStreakState(JSON.parse(savedStreakState), getLocalDateKey())
        : getInitialStreakState());
    } catch {
      setStreakState(getInitialStreakState());
    } finally {
      setIsStreakLoaded(true);
    }
  }, []);

  function completeTodayStreak() {
    setStreakState((currentStreakState) => {
      const nextStreakState = completeLearningDay(currentStreakState, getLocalDateKey());

      try {
        window.localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(nextStreakState));
      } catch {
        // Ignore storage failures so quiz completion keeps working.
      }

      return nextStreakState;
    });
  }

  return {
    completeTodayStreak,
    isStreakLoaded,
    streakState
  };
}
