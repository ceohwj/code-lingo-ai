"use client";

import { useMemo } from "react";

import { getWeakAreaInsights } from "../lib/weakAreaInsightLogic";

export function useWeakAreaInsights({ categories, categoryProgressByCategory, reviewRecommendations, wrongAnswerIdsByCategory }) {
  const weakAreaInsights = useMemo(() => {
    return getWeakAreaInsights({
      categories,
      categoryProgressByCategory,
      reviewRecommendations,
      wrongAnswerIdsByCategory
    });
  }, [categories, categoryProgressByCategory, reviewRecommendations, wrongAnswerIdsByCategory]);

  return {
    weakAreaInsights
  };
}
