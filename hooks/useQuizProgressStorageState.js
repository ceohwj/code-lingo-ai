import { useCallback, useEffect, useState } from "react";

import { getQuestionIdSet } from "../lib/quizProgressLogic";
import { calculateDifficultyXp } from "../lib/quizLogic";
import { getInitialQuizSessionState } from "./useQuizSessionState";

export const LEGACY_PYTHON_PROGRESS_KEY = "codelingo-ai-python-basics-progress";

const QUIZ_MODE = "quiz";

const progressStorageKeys = {
  ai: "codelingo-ai-ai-basics-progress",
  bioinformatics: "codelingo-ai-bioinformatics-basics-progress",
  python: LEGACY_PYTHON_PROGRESS_KEY,
  sql: "codelingo-ai-sql-basics-progress"
};

function getProgressStorageKey(categoryId) {
  return progressStorageKeys[categoryId] ?? "codelingo-ai-" + categoryId + "-progress";
}

export function useQuizProgressStorageState({
  currentQuestionIndex,
  isReviewMode,
  isSubmitted,
  persistSelectedCategory,
  persistedProgress,
  resetQuizSessionState,
  selectedOptionIndex,
  selectedQuiz,
  setCurrentQuestionIndex,
  setIsSubmitted,
  setSavedCompletedAnswers,
  setSavedTotalXp,
  setSelectedOptionIndex,
  setSessionBaselineQuestionIds,
  setSubmittedAnswers
}) {
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  const markProgressUnloaded = useCallback(() => {
    setIsProgressLoaded(false);
  }, []);

  useEffect(() => {
    if (!selectedQuiz) {
      setIsProgressLoaded(false);
      return;
    }

    setIsProgressLoaded(false);

    if (isReviewMode) {
      resetQuizSessionState();
      setSessionBaselineQuestionIds([]);
      setIsProgressLoaded(true);
      return;
    }

    try {
      persistSelectedCategory(selectedQuiz.categoryId);

      const savedProgress = window.localStorage.getItem(getProgressStorageKey(selectedQuiz.categoryId));

      if (!savedProgress) {
        resetQuizSessionState();
        setSavedCompletedAnswers([]);
        setSavedTotalXp(0);
        setSessionBaselineQuestionIds([]);
        return;
      }

      const parsedProgress = JSON.parse(savedProgress);
      const savedQuestionIndex = Number(parsedProgress.currentQuestionIndex);
      const savedCompletedQuestions = Array.isArray(parsedProgress.completedQuestions)
        ? parsedProgress.completedQuestions
        : [];
      const savedXp = Number.isFinite(parsedProgress.xp)
        ? parsedProgress.xp
        : calculateDifficultyXp(savedCompletedQuestions, selectedQuiz.questions, selectedQuiz.xpByDifficulty);
      const savedSelectedOptionIndex = Number.isInteger(parsedProgress.selectedOptionIndex)
        ? parsedProgress.selectedOptionIndex
        : null;

      const cleanProgress = getInitialQuizSessionState();
      setCurrentQuestionIndex(
        savedQuestionIndex >= 0 && savedQuestionIndex <= selectedQuiz.questions.length
          ? savedQuestionIndex
          : cleanProgress.currentQuestionIndex
      );
      setSubmittedAnswers(savedCompletedQuestions);
      setSavedCompletedAnswers(savedCompletedQuestions);
      setSavedTotalXp(savedXp);
      setSessionBaselineQuestionIds([...getQuestionIdSet(savedCompletedQuestions)]);
      setSelectedOptionIndex(savedSelectedOptionIndex);
      setIsSubmitted(Boolean(parsedProgress.isSubmitted));
    } catch {
      resetQuizSessionState();
      setSavedCompletedAnswers([]);
      setSavedTotalXp(0);
      setSessionBaselineQuestionIds([]);
    } finally {
      setIsProgressLoaded(true);
    }
  }, [
    isReviewMode,
    persistSelectedCategory,
    resetQuizSessionState,
    selectedQuiz,
    setCurrentQuestionIndex,
    setIsSubmitted,
    setSavedCompletedAnswers,
    setSavedTotalXp,
    setSelectedOptionIndex,
    setSessionBaselineQuestionIds,
    setSubmittedAnswers
  ]);

  useEffect(() => {
    if (!isProgressLoaded || !selectedQuiz || isReviewMode) {
      return;
    }

    try {
      window.localStorage.setItem(
        getProgressStorageKey(selectedQuiz.categoryId),
        JSON.stringify({
          schemaVersion: 2,
          categoryId: selectedQuiz.categoryId,
          completedQuestions: persistedProgress.completedQuestions,
          currentQuestionIndex,
          isSubmitted,
          mode: QUIZ_MODE,
          selectedOptionIndex,
          xp: persistedProgress.totalXp,
          xpByDifficulty: selectedQuiz.xpByDifficulty
        })
      );
    } catch {
      // Ignore storage failures so quiz interactions keep working.
    }
  }, [currentQuestionIndex, isProgressLoaded, isReviewMode, isSubmitted, persistedProgress, selectedOptionIndex, selectedQuiz]);

  return {
    isProgressLoaded,
    markProgressUnloaded
  };
}
