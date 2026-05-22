const DIFFICULTY_WEIGHTS = {
  easy: 10,
  medium: 20,
  hard: 35
};

export function getAdaptiveReviewRecommendations({ categories = [], categoryProgressByCategory = {}, limit = 3, wrongAnswerIdsByCategory = {} } = {}) {
  const recommendations = [];

  for (const category of categories) {
    const wrongQuestionIds = normalizeQuestionIds(wrongAnswerIdsByCategory[category.categoryId]);

    if (wrongQuestionIds.length === 0) {
      continue;
    }

    const questionById = new Map((category.questions ?? []).map((question) => [question.id, question]));
    const missedQuestions = wrongQuestionIds
      .map((questionId, index) => {
        const question = questionById.get(questionId);

        if (!question) {
          return null;
        }

        return {
          id: question.id,
          difficulty: normalizeDifficulty(question.difficulty),
          prompt: question.prompt,
          recencyRank: index + 1
        };
      })
      .filter(Boolean);

    if (missedQuestions.length === 0) {
      continue;
    }

    const categoryProgress = categoryProgressByCategory[category.categoryId] ?? {};
    const completionPercentage = getSafePercentage(categoryProgress.completionPercentage);
    const hardestDifficulty = getHardestDifficulty(missedQuestions);
    const mostRecentQuestion = missedQuestions[missedQuestions.length - 1];
    const score = getCategoryRecommendationScore(missedQuestions, completionPercentage);

    recommendations.push({
      categoryId: category.categoryId,
      categoryLabel: category.categoryLabel,
      completionPercentage,
      hardestDifficulty,
      missedQuestionCount: missedQuestions.length,
      mostRecentQuestionId: mostRecentQuestion.id,
      mostRecentQuestionPrompt: mostRecentQuestion.prompt,
      priorityScore: score,
      reason: getRecommendationReason({ completionPercentage, hardestDifficulty, missedQuestionCount: missedQuestions.length })
    });
  }

  return recommendations
    .sort((first, second) => {
      if (second.priorityScore !== first.priorityScore) {
        return second.priorityScore - first.priorityScore;
      }

      return second.missedQuestionCount - first.missedQuestionCount;
    })
    .slice(0, Math.max(0, limit));
}

export function getCategoryRecommendationScore(missedQuestions, completionPercentage) {
  const recentQuestion = missedQuestions[missedQuestions.length - 1];
  const recentDifficultyBonus = DIFFICULTY_WEIGHTS[recentQuestion?.difficulty] ?? DIFFICULTY_WEIGHTS.easy;
  const hardestDifficultyBonus = Math.max(...missedQuestions.map((question) => DIFFICULTY_WEIGHTS[question.difficulty] ?? DIFFICULTY_WEIGHTS.easy));
  const recencyBonus = missedQuestions.length * 6;
  const lowProgressBonus = Math.round((100 - getSafePercentage(completionPercentage)) / 4);

  return recentDifficultyBonus + hardestDifficultyBonus + recencyBonus + lowProgressBonus;
}

function normalizeQuestionIds(questionIds) {
  if (!Array.isArray(questionIds)) {
    return [];
  }

  return [...new Set(questionIds.filter((questionId) => typeof questionId === "string"))];
}

function normalizeDifficulty(difficulty) {
  return DIFFICULTY_WEIGHTS[difficulty] ? difficulty : "easy";
}

function getHardestDifficulty(questions) {
  return questions.reduce((hardestDifficulty, question) => {
    return DIFFICULTY_WEIGHTS[question.difficulty] > DIFFICULTY_WEIGHTS[hardestDifficulty]
      ? question.difficulty
      : hardestDifficulty;
  }, "easy");
}

function getSafePercentage(value) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}

function getRecommendationReason({ completionPercentage, hardestDifficulty, missedQuestionCount }) {
  if (hardestDifficulty === "hard") {
    return "Hard missed question needs review";
  }

  if (completionPercentage < 50) {
    return "Low category progress with saved misses";
  }

  if (missedQuestionCount > 1) {
    return "Multiple saved wrong answers";
  }

  return "Recent wrong answer saved";
}
