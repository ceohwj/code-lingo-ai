"use client";

import { useMemo } from "react";

import { getAdaptiveReviewRecommendations } from "../lib/adaptiveReviewLogic";

export function useAdaptiveReviewRecommendations({ categories, categoryProgressByCategory, wrongAnswerIdsByCategory }) {
  const recommendations = useMemo(() => {
    return getAdaptiveReviewRecommendations({
      categories,
      categoryProgressByCategory,
      wrongAnswerIdsByCategory
    });
  }, [categories, categoryProgressByCategory, wrongAnswerIdsByCategory]);

  return {
    reviewRecommendations: recommendations
  };
}
