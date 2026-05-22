import { calculateDifficultyXp } from "./quizLogic.js";

export function getQuestionIdSet(answers) {
  return new Set(
    (Array.isArray(answers) ? answers : [])
      .map((answer) => answer?.questionId)
      .filter((questionId) => typeof questionId === "string")
  );
}

export function getNewSessionAnswers(sessionAnswers, baselineQuestionIds) {
  const baselineSet = baselineQuestionIds instanceof Set ? baselineQuestionIds : new Set(baselineQuestionIds ?? []);

  return (Array.isArray(sessionAnswers) ? sessionAnswers : []).filter((answer) => {
    return typeof answer?.questionId === "string" && !baselineSet.has(answer.questionId);
  });
}

export function mergeCompletedAnswers(savedAnswers, sessionAnswers) {
  const answerByQuestionId = new Map();

  for (const answer of Array.isArray(savedAnswers) ? savedAnswers : []) {
    if (typeof answer?.questionId === "string") {
      answerByQuestionId.set(answer.questionId, answer);
    }
  }

  for (const answer of Array.isArray(sessionAnswers) ? sessionAnswers : []) {
    if (typeof answer?.questionId === "string") {
      answerByQuestionId.set(answer.questionId, answer);
    }
  }

  return [...answerByQuestionId.values()];
}

export function getPersistedQuizProgress({ questions = [], savedCompletedAnswers = [], savedTotalXp = 0, sessionAnswers = [], sessionBaselineQuestionIds = [], xpByDifficulty } = {}) {
  const newSessionAnswers = getNewSessionAnswers(sessionAnswers, sessionBaselineQuestionIds);
  const newSessionXp = calculateDifficultyXp(newSessionAnswers, questions, xpByDifficulty);
  const safeSavedTotalXp = Number.isFinite(savedTotalXp) ? Math.max(0, savedTotalXp) : 0;

  return {
    completedQuestions: mergeCompletedAnswers(savedCompletedAnswers, sessionAnswers),
    totalXp: safeSavedTotalXp + newSessionXp
  };
}
