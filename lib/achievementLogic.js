export const ACHIEVEMENT_STORAGE_KEY = "codelingo-ai-achievements";

export const ACHIEVEMENTS = [
  {
    id: "first-quiz-completed",
    title: "First Quiz Completed",
    description: "Complete any category quiz."
  },
  {
    id: "first-correct-answer",
    title: "First Correct Answer",
    description: "Answer one question correctly."
  },
  {
    id: "three-day-streak",
    title: "3-Day Streak",
    description: "Reach a 3-day learning streak."
  },
  {
    id: "ten-correct-answers",
    title: "10 Correct Answers",
    description: "Answer 10 unique questions correctly."
  },
  {
    id: "category-completion",
    title: "Category Completed",
    description: "Finish every question in one category."
  }
];

export function getInitialAchievementState() {
  return {
    schemaVersion: 1,
    unlockedAchievementIds: [],
    unlockedAtById: {},
    updatedAt: null
  };
}

export function normalizeAchievementState(savedState) {
  if (!savedState || typeof savedState !== "object") {
    return getInitialAchievementState();
  }

  const validAchievementIds = new Set(ACHIEVEMENTS.map((achievement) => achievement.id));
  const unlockedAchievementIds = Array.isArray(savedState.unlockedAchievementIds)
    ? [...new Set(savedState.unlockedAchievementIds.filter((id) => validAchievementIds.has(id)))]
    : [];
  const unlockedAtById = {};

  for (const id of unlockedAchievementIds) {
    if (typeof savedState.unlockedAtById?.[id] === "string") {
      unlockedAtById[id] = savedState.unlockedAtById[id];
    }
  }

  return {
    schemaVersion: 1,
    unlockedAchievementIds,
    unlockedAtById,
    updatedAt: typeof savedState.updatedAt === "string" ? savedState.updatedAt : null
  };
}

export function getAchievementFacts({ categories = [], categoryProgressByCategory = {}, currentSession = {}, dailyGoalState = {}, savedProgressByCategory = {}, streakState = {} } = {}) {
  const correctAnswerKeys = new Set();
  const earnedXpValues = Object.values(categoryProgressByCategory).map((progress) => progress?.earnedXp);
  const savedEarnedXp = earnedXpValues.reduce((total, earnedXp) => total + (Number.isFinite(earnedXp) ? earnedXp : 0), 0);
  const currentSessionXp = Number.isFinite(currentSession.xp) && !currentSession.isReviewMode ? currentSession.xp : 0;
  let hasCompletedCategory = Object.values(categoryProgressByCategory).some((progress) => progress?.status === "completed");

  for (const category of categories) {
    const validQuestionIds = new Set((category.questions ?? []).map((question) => question.id));
    const savedProgress = parseSavedProgress(savedProgressByCategory[category.categoryId]);
    const savedAnswers = Array.isArray(savedProgress?.completedQuestions) ? savedProgress.completedQuestions : [];

    for (const answer of savedAnswers) {
      if (answer?.isCorrect && validQuestionIds.has(answer.questionId)) {
        correctAnswerKeys.add(category.categoryId + ":" + answer.questionId);
      }
    }
  }

  if (!currentSession.isReviewMode && currentSession.categoryId) {
    const currentAnswers = Array.isArray(currentSession.submittedAnswers) ? currentSession.submittedAnswers : [];

    for (const answer of currentAnswers) {
      if (answer?.isCorrect && typeof answer.questionId === "string") {
        correctAnswerKeys.add(currentSession.categoryId + ":" + answer.questionId);
      }
    }

    if (currentSession.isComplete) {
      hasCompletedCategory = true;
    }
  }

  return {
    hasCompletedCategory,
    hasCompletedQuiz: hasCompletedCategory,
    currentStreak: Number.isInteger(streakState.currentStreak) ? streakState.currentStreak : 0,
    dailyGoalCompleted: Boolean(dailyGoalState.isCompleted),
    totalCorrectAnswers: correctAnswerKeys.size,
    totalEarnedXp: Math.max(savedEarnedXp, currentSessionXp)
  };
}

export function unlockAchievements(currentState, facts, unlockedAt = new Date().toISOString()) {
  const normalizedState = normalizeAchievementState(currentState);
  const unlockedAchievementIds = new Set(normalizedState.unlockedAchievementIds);
  const unlockedAtById = { ...normalizedState.unlockedAtById };

  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedAchievementIds.has(achievement.id) && isAchievementUnlocked(achievement.id, facts)) {
      unlockedAchievementIds.add(achievement.id);
      unlockedAtById[achievement.id] = unlockedAt;
    }
  }

  const nextUnlockedAchievementIds = [...unlockedAchievementIds];
  const changed = nextUnlockedAchievementIds.length !== normalizedState.unlockedAchievementIds.length;

  return {
    schemaVersion: 1,
    unlockedAchievementIds: nextUnlockedAchievementIds,
    unlockedAtById,
    updatedAt: changed ? unlockedAt : normalizedState.updatedAt
  };
}

export function getAchievementSummary(achievementState) {
  const normalizedState = normalizeAchievementState(achievementState);
  const unlockedAchievementIdSet = new Set(normalizedState.unlockedAchievementIds);

  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    isUnlocked: unlockedAchievementIdSet.has(achievement.id),
    unlockedAt: normalizedState.unlockedAtById[achievement.id] ?? null
  }));
}

function isAchievementUnlocked(id, facts) {
  if (id === "first-quiz-completed") {
    return Boolean(facts.hasCompletedQuiz);
  }

  if (id === "first-correct-answer") {
    return facts.totalCorrectAnswers >= 1;
  }

  if (id === "three-day-streak") {
    return facts.currentStreak >= 3;
  }

  if (id === "ten-correct-answers") {
    return facts.totalCorrectAnswers >= 10;
  }

  if (id === "category-completion") {
    return Boolean(facts.hasCompletedCategory);
  }

  return false;
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
