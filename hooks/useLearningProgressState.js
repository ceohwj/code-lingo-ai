import { useMemo } from "react";

import { getPersistedQuizProgress } from "../lib/quizProgressLogic";
import { calculateDifficultyXp, getDifficultyLabel, getProgressPercent, getQuestionDifficulty, getQuestionXp } from "../lib/quizLogic";

export function useLearningProgressState({
  activeQuestions = [],
  currentQuestionIndex = 0,
  isReviewMode = false,
  savedCompletedAnswers = [],
  savedTotalXp = 0,
  selectedQuiz = null,
  sessionBaselineQuestionIds = [],
  submittedAnswers = []
}) {
  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const correctCount = useMemo(() => {
    return submittedAnswers.filter((answer) => answer.isCorrect).length;
  }, [submittedAnswers]);
  const currentDifficulty = getQuestionDifficulty(currentQuestion);
  const currentDifficultyLabel = getDifficultyLabel(currentDifficulty);
  const currentQuestionXp = getQuestionXp(currentQuestion, selectedQuiz?.xpByDifficulty);
  const sessionXp = isReviewMode
    ? 0
    : calculateDifficultyXp(submittedAnswers, selectedQuiz?.questions ?? [], selectedQuiz?.xpByDifficulty);
  const persistedProgress = useMemo(() => {
    if (!selectedQuiz || isReviewMode) {
      return {
        completedQuestions: savedCompletedAnswers,
        totalXp: savedTotalXp
      };
    }

    return getPersistedQuizProgress({
      questions: selectedQuiz.questions,
      savedCompletedAnswers,
      savedTotalXp,
      sessionAnswers: submittedAnswers,
      sessionBaselineQuestionIds,
      xpByDifficulty: selectedQuiz.xpByDifficulty
    });
  }, [isReviewMode, savedCompletedAnswers, savedTotalXp, selectedQuiz, sessionBaselineQuestionIds, submittedAnswers]);

  return {
    accuracyPercent: getProgressPercent(correctCount, totalQuestions),
    correctCount,
    currentDifficultyLabel,
    currentQuestion,
    currentQuestionXp,
    isComplete: Boolean(selectedQuiz) && currentQuestionIndex >= totalQuestions,
    persistedProgress,
    progressPercent: getProgressPercent(submittedAnswers.length, totalQuestions),
    sessionXp,
    totalQuestions,
    totalXp: isReviewMode ? savedTotalXp : persistedProgress.totalXp
  };
}
