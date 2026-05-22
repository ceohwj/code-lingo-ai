"use client";

import { useEffect, useMemo, useState } from "react";

import { ACHIEVEMENT_STORAGE_KEY, getAchievementFacts, getAchievementSummary, getInitialAchievementState, normalizeAchievementState, unlockAchievements } from "../lib/achievementLogic";
import { getCategoryProgressStorageKey } from "../lib/categoryProgressLogic";

export function useAchievementState({ categories, categoryProgressByCategory, currentSession, dailyGoalState, streakState }) {
  const [achievementState, setAchievementState] = useState(() => getInitialAchievementState());
  const [isAchievementLoaded, setIsAchievementLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedAchievementState = window.localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
      setAchievementState(savedAchievementState
        ? normalizeAchievementState(JSON.parse(savedAchievementState))
        : getInitialAchievementState());
    } catch {
      setAchievementState(getInitialAchievementState());
    } finally {
      setIsAchievementLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isAchievementLoaded) {
      return;
    }

    const savedProgressByCategory = {};

    try {
      for (const category of categories) {
        savedProgressByCategory[category.categoryId] = window.localStorage.getItem(getCategoryProgressStorageKey(category.categoryId));
      }
    } catch {
      // Ignore storage read failures and derive achievements from in-memory state.
    }

    const facts = getAchievementFacts({
      categories,
      categoryProgressByCategory,
      currentSession,
      dailyGoalState,
      savedProgressByCategory,
      streakState
    });

    setAchievementState((currentAchievementState) => {
      const nextAchievementState = unlockAchievements(currentAchievementState, facts);

      if (nextAchievementState.unlockedAchievementIds.length === currentAchievementState.unlockedAchievementIds.length) {
        return currentAchievementState;
      }

      try {
        window.localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(nextAchievementState));
      } catch {
        // Ignore storage failures so learning flow keeps working.
      }

      return nextAchievementState;
    });
  }, [categories, categoryProgressByCategory, currentSession, dailyGoalState, isAchievementLoaded, streakState]);

  const achievements = useMemo(() => getAchievementSummary(achievementState), [achievementState]);

  return {
    achievements,
    achievementState,
    isAchievementLoaded
  };
}
