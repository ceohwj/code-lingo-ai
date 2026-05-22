const DIFFICULTY_PRIORITY = {
  easy: 1,
  medium: 2,
  hard: 3
};

const LOW_PROGRESS_THRESHOLD = 50;
const REPEATED_WRONG_ANSWER_THRESHOLD = 2;

export function getWeakAreaInsights({ categories = [], categoryProgressByCategory = {}, limit = 3, reviewRecommendations = [], wrongAnswerIdsByCategory = {} } = {}) {
  const recommendationByCategory = new Map(reviewRecommendations.map((recommendation) => [recommendation.categoryId, recommendation]));
  const insights = [];

  for (const category of categories) {
    const categoryId = category.categoryId;
    const categoryLabel = category.categoryLabel ?? categoryId;
    const categoryTitle = category.title ?? categoryLabel;
    const progress = categoryProgressByCategory[categoryId] ?? {};
    const completionPercentage = getSafePercentage(progress.completionPercentage);
    const wrongQuestionIds = normalizeQuestionIds(wrongAnswerIdsByCategory[categoryId]);
    const missedQuestions = getMissedQuestions(category, wrongQuestionIds);
    const recommendation = recommendationByCategory.get(categoryId);

    if (completionPercentage > 0 && completionPercentage < LOW_PROGRESS_THRESHOLD) {
      insights.push({
        id: categoryId + "-low-progress",
        categoryId,
        categoryLabel,
        detail: completionPercentage + "% complete",
        message: categoryTitle + " progress is low",
        priorityScore: 50 - completionPercentage + (recommendation?.priorityScore ?? 0) / 10,
        type: "low-progress"
      });
    }

    if (missedQuestions.length >= REPEATED_WRONG_ANSWER_THRESHOLD) {
      insights.push({
        id: categoryId + "-repeated-misses",
        categoryId,
        categoryLabel,
        detail: missedQuestions.length + " saved wrong answers",
        message: "You have repeated misses in " + categoryLabel,
        priorityScore: 35 + missedQuestions.length * 6 + (recommendation?.priorityScore ?? 0) / 12,
        type: "repeated-wrong-answers"
      });
    }

    const difficultyPattern = getDifficultyPattern(missedQuestions);

    if (difficultyPattern) {
      insights.push({
        id: categoryId + "-" + difficultyPattern.difficulty + "-difficulty",
        categoryId,
        categoryLabel,
        detail: difficultyPattern.count + " " + difficultyPattern.difficulty + " misses",
        message: "You frequently miss " + difficultyPattern.difficulty + " " + categoryLabel + " questions",
        priorityScore: 45 + difficultyPattern.count * 7 + DIFFICULTY_PRIORITY[difficultyPattern.difficulty] * 9 + (recommendation?.priorityScore ?? 0) / 12,
        type: "difficulty-pattern"
      });
    }
  }

  return insights
    .sort((first, second) => {
      if (second.priorityScore !== first.priorityScore) {
        return second.priorityScore - first.priorityScore;
      }

      return first.message.localeCompare(second.message);
    })
    .slice(0, Math.max(0, limit));
}

function getMissedQuestions(category, wrongQuestionIds) {
  const questionById = new Map((category.questions ?? []).map((question) => [question.id, question]));

  return wrongQuestionIds
    .map((questionId) => questionById.get(questionId))
    .filter(Boolean)
    .map((question) => ({
      id: question.id,
      difficulty: normalizeDifficulty(question.difficulty)
    }));
}

function getDifficultyPattern(missedQuestions) {
  const countsByDifficulty = missedQuestions.reduce((counts, question) => {
    counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
    return counts;
  }, {});

  return Object.entries(countsByDifficulty)
    .filter(([, count]) => count >= REPEATED_WRONG_ANSWER_THRESHOLD)
    .map(([difficulty, count]) => ({ count, difficulty }))
    .sort((first, second) => {
      if (second.count !== first.count) {
        return second.count - first.count;
      }

      return DIFFICULTY_PRIORITY[second.difficulty] - DIFFICULTY_PRIORITY[first.difficulty];
    })[0] ?? null;
}

function normalizeQuestionIds(questionIds) {
  if (!Array.isArray(questionIds)) {
    return [];
  }

  return [...new Set(questionIds.filter((questionId) => typeof questionId === "string"))];
}

function normalizeDifficulty(difficulty) {
  return DIFFICULTY_PRIORITY[difficulty] ? difficulty : "easy";
}

function getSafePercentage(value) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}
