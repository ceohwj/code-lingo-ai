"use client";

import { useEffect, useMemo, useState } from "react";

import { getNextWrongAnswerQuestionIds, parseSavedWrongAnswerIds } from "../lib/wrongAnswerHistoryLogic";

export function getWrongAnswersStorageKey(categoryId) {
  return "codelingo-ai-" + categoryId + "-wrong-answers";
}

export function useWrongAnswerHistory(categories) {
  const [wrongAnswerIdsByCategory, setWrongAnswerIdsByCategory] = useState({});
  const [isWrongAnswerHistoryLoaded, setIsWrongAnswerHistoryLoaded] = useState(false);

  useEffect(() => {
    const nextWrongAnswerIdsByCategory = {};

    try {
      for (const category of categories) {
        const savedWrongAnswers = window.localStorage.getItem(getWrongAnswersStorageKey(category.categoryId));
        nextWrongAnswerIdsByCategory[category.categoryId] = savedWrongAnswers
          ? parseSavedWrongAnswerIds(savedWrongAnswers)
          : [];
      }
    } catch {
      for (const category of categories) {
        nextWrongAnswerIdsByCategory[category.categoryId] = nextWrongAnswerIdsByCategory[category.categoryId] ?? [];
      }
    } finally {
      setWrongAnswerIdsByCategory(nextWrongAnswerIdsByCategory);
      setIsWrongAnswerHistoryLoaded(true);
    }
  }, [categories]);

  function updateWrongAnswerIds(categoryId, questionId, isCorrect) {
    if (!questionId) {
      return;
    }

    setWrongAnswerIdsByCategory((currentWrongAnswers) => {
      const nextQuestionIds = getNextWrongAnswerQuestionIds(currentWrongAnswers[categoryId] ?? [], questionId, isCorrect);
      const nextWrongAnswers = {
        ...currentWrongAnswers,
        [categoryId]: nextQuestionIds
      };

      try {
        window.localStorage.setItem(
          getWrongAnswersStorageKey(categoryId),
          JSON.stringify({
            schemaVersion: 1,
            categoryId,
            questionIds: nextQuestionIds,
            updatedAt: new Date().toISOString()
          })
        );
      } catch {
        // Ignore storage failures so answer flow keeps working.
      }

      return nextWrongAnswers;
    });
  }

  const wrongAnswerCountsByCategory = useMemo(() => {
    return Object.fromEntries(
      Object.entries(wrongAnswerIdsByCategory).map(([categoryId, questionIds]) => [categoryId, questionIds.length])
    );
  }, [wrongAnswerIdsByCategory]);

  return {
    isWrongAnswerHistoryLoaded,
    updateWrongAnswerIds,
    wrongAnswerCountsByCategory,
    wrongAnswerIdsByCategory
  };
}
