export const DAILY_GOAL_STORAGE_KEY = "codelingo-ai-daily-goal";
export const DEFAULT_DAILY_GOAL_TARGET = 5;

export function getInitialDailyGoalState(todayDateKey, target = DEFAULT_DAILY_GOAL_TARGET) {
  const cleanTarget = normalizeTarget(target);

  return {
    schemaVersion: 1,
    dateKey: todayDateKey,
    completedQuestionCount: 0,
    target: cleanTarget,
    progressPercent: 0,
    isCompleted: false,
    updatedAt: null
  };
}

export function normalizeDailyGoalState(savedState, todayDateKey, defaultTarget = DEFAULT_DAILY_GOAL_TARGET) {
  if (!savedState || typeof savedState !== "object") {
    return getInitialDailyGoalState(todayDateKey, defaultTarget);
  }

  const target = normalizeTarget(savedState.target ?? defaultTarget);

  if (savedState.dateKey !== todayDateKey) {
    return getInitialDailyGoalState(todayDateKey, target);
  }

  const completedQuestionCount = Number.isInteger(savedState.completedQuestionCount) && savedState.completedQuestionCount > 0
    ? savedState.completedQuestionCount
    : 0;

  return createDailyGoalState({
    dateKey: todayDateKey,
    completedQuestionCount,
    target,
    updatedAt: typeof savedState.updatedAt === "string" ? savedState.updatedAt : null
  });
}

export function addCompletedDailyGoalQuestions(currentState, completedQuestionCount = 1, todayDateKey, defaultTarget = DEFAULT_DAILY_GOAL_TARGET) {
  const normalizedState = normalizeDailyGoalState(currentState, todayDateKey, defaultTarget);
  const cleanCompletedQuestionCount = Number.isInteger(completedQuestionCount) && completedQuestionCount > 0
    ? completedQuestionCount
    : 0;

  return createDailyGoalState({
    dateKey: todayDateKey,
    completedQuestionCount: normalizedState.completedQuestionCount + cleanCompletedQuestionCount,
    target: normalizedState.target,
    updatedAt: new Date().toISOString()
  });
}

function createDailyGoalState({ dateKey, completedQuestionCount, target, updatedAt }) {
  return {
    schemaVersion: 1,
    dateKey,
    completedQuestionCount,
    target,
    progressPercent: getDailyGoalProgressPercent(completedQuestionCount, target),
    isCompleted: completedQuestionCount >= target,
    updatedAt
  };
}

function getDailyGoalProgressPercent(completedQuestionCount, target) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((completedQuestionCount / target) * 100));
}

function normalizeTarget(target) {
  return Number.isInteger(target) && target > 0 ? target : DEFAULT_DAILY_GOAL_TARGET;
}
