import { calculateDifficultyXp, getProgressPercent } from "./quizLogic.js";

export const CATEGORY_PROGRESS_STORAGE_KEYS = {
  ai: "codelingo-ai-ai-basics-progress",
  bioinformatics: "codelingo-ai-bioinformatics-basics-progress",
  python: "codelingo-ai-python-basics-progress",
  sql: "codelingo-ai-sql-basics-progress"
};

export function getCategoryProgressStorageKey(categoryId) {
  return CATEGORY_PROGRESS_STORAGE_KEYS[categoryId] ?? "codelingo-ai-" + categoryId + "-progress";
}

export function getCategoryProgressSummary(quiz, savedProgressText) {
  const totalQuestions = Array.isArray(quiz?.questions) ? quiz.questions.length : 0;
  const parsedProgress = parseSavedProgress(savedProgressText);
  const completedAnswers = Array.isArray(parsedProgress?.completedQuestions)
    ? parsedProgress.completedQuestions
    : [];
  const validQuestionIds = new Set((quiz?.questions ?? []).map((question) => question.id));
  const completedQuestionIds = getUniqueCompletedQuestionIds(completedAnswers, validQuestionIds);
  const completedQuestionCount = Math.min(completedQuestionIds.length, totalQuestions);
  const completionPercentage = getProgressPercent(completedQuestionCount, totalQuestions);
  const earnedXp = Number.isFinite(parsedProgress?.xp)
    ? parsedProgress.xp
    : calculateDifficultyXp(completedAnswers, quiz?.questions ?? [], quiz?.xpByDifficulty);

  return {
    categoryId: quiz?.categoryId ?? null,
    completedQuestionCount,
    totalQuestions,
    completionPercentage,
    earnedXp,
    status: getCategoryProgressStatus(completedQuestionCount, totalQuestions)
  };
}

export function getCategoryProgressStatus(completedQuestionCount, totalQuestions) {
  if (completedQuestionCount <= 0) {
    return "not-started";
  }

  if (totalQuestions > 0 && completedQuestionCount >= totalQuestions) {
    return "completed";
  }

  return "in-progress";
}

function parseSavedProgress(savedProgressText) {
  if (!savedProgressText) {
    return null;
  }

  try {
    const parsedProgress = JSON.parse(savedProgressText);
    return parsedProgress && typeof parsedProgress === "object" ? parsedProgress : null;
  } catch {
    return null;
  }
}

function getUniqueCompletedQuestionIds(completedAnswers, validQuestionIds) {
  return [
    ...new Set(
      completedAnswers
        .map((answer) => answer?.questionId)
        .filter((questionId) => typeof questionId === "string" && validQuestionIds.has(questionId))
    )
  ];
}
