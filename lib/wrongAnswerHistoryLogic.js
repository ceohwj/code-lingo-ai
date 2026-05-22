export function parseSavedWrongAnswerIds(savedWrongAnswers) {
  const parsedWrongAnswers = JSON.parse(savedWrongAnswers);

  if (Array.isArray(parsedWrongAnswers)) {
    return normalizeWrongAnswerQuestionIds(parsedWrongAnswers);
  }

  if (Array.isArray(parsedWrongAnswers?.questionIds)) {
    return normalizeWrongAnswerQuestionIds(parsedWrongAnswers.questionIds);
  }

  return [];
}

export function getNextWrongAnswerQuestionIds(currentQuestionIds, questionId, isCorrect) {
  const normalizedQuestionIds = normalizeWrongAnswerQuestionIds(currentQuestionIds);

  if (typeof questionId !== "string") {
    return normalizedQuestionIds;
  }

  if (isCorrect) {
    return normalizedQuestionIds.filter((savedQuestionId) => savedQuestionId !== questionId);
  }

  return [...normalizedQuestionIds.filter((savedQuestionId) => savedQuestionId !== questionId), questionId];
}

export function normalizeWrongAnswerQuestionIds(questionIds) {
  if (!Array.isArray(questionIds)) {
    return [];
  }

  return [...new Set(questionIds.filter((item) => typeof item === "string"))];
}
