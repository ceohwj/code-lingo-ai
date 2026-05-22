"use client";

import { useMemo } from "react";

import { getConceptFocusInsights } from "../lib/conceptAnalyticsLogic";

export function useConceptFocusInsights({ categories, reviewRecommendations, weakAreaInsights, wrongAnswerIdsByCategory }) {
  const conceptFocusInsights = useMemo(() => {
    return getConceptFocusInsights({
      categories,
      reviewRecommendations,
      weakAreaInsights,
      wrongAnswerIdsByCategory
    });
  }, [categories, reviewRecommendations, weakAreaInsights, wrongAnswerIdsByCategory]);

  return {
    conceptFocusInsights
  };
}
