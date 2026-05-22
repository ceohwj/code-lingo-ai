"use client";

import { useCallback, useEffect, useState } from "react";

import { getCategoryProgressStorageKey, getCategoryProgressSummary } from "../lib/categoryProgressLogic";

export function useCategoryProgressSummaries(categories) {
  const [categoryProgressByCategory, setCategoryProgressByCategory] = useState({});

  const refreshCategoryProgressSummaries = useCallback(() => {
    const nextCategoryProgressByCategory = {};

    try {
      for (const category of categories) {
        const savedProgress = window.localStorage.getItem(getCategoryProgressStorageKey(category.categoryId));
        nextCategoryProgressByCategory[category.categoryId] = getCategoryProgressSummary(category, savedProgress);
      }
    } catch {
      for (const category of categories) {
        nextCategoryProgressByCategory[category.categoryId] = getCategoryProgressSummary(category, null);
      }
    }

    setCategoryProgressByCategory(nextCategoryProgressByCategory);
  }, [categories]);

  useEffect(() => {
    refreshCategoryProgressSummaries();
  }, [refreshCategoryProgressSummaries]);

  return {
    categoryProgressByCategory,
    refreshCategoryProgressSummaries
  };
}
