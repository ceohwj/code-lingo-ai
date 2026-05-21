export const STREAK_STORAGE_KEY = "codelingo-ai-daily-streak";

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

export function getInitialStreakState(todayDateKey = getLocalDateKey()) {
  return {
    schemaVersion: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedDates: [],
    todayCompleted: false,
    todayDateKey,
    updatedAt: null
  };
}

export function normalizeStreakState(savedState, todayDateKey = getLocalDateKey()) {
  if (!savedState || typeof savedState !== "object") {
    return getInitialStreakState(todayDateKey);
  }

  const completedDates = Array.isArray(savedState.completedDates)
    ? getUniqueDateKeys(savedState.completedDates)
    : [];
  const currentStreak = Number.isInteger(savedState.currentStreak) && savedState.currentStreak > 0
    ? savedState.currentStreak
    : 0;
  const longestStreak = Number.isInteger(savedState.longestStreak) && savedState.longestStreak > 0
    ? savedState.longestStreak
    : currentStreak;
  const lastCompletedDate = isDateKey(savedState.lastCompletedDate)
    ? savedState.lastCompletedDate
    : null;

  return {
    schemaVersion: 1,
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    lastCompletedDate,
    completedDates,
    todayCompleted: lastCompletedDate === todayDateKey,
    todayDateKey,
    updatedAt: typeof savedState.updatedAt === "string" ? savedState.updatedAt : null
  };
}

export function completeLearningDay(currentState, todayDateKey = getLocalDateKey()) {
  const normalizedState = normalizeStreakState(currentState, todayDateKey);

  if (normalizedState.lastCompletedDate === todayDateKey) {
    return normalizedState;
  }

  const previousDateKey = getPreviousDateKey(todayDateKey);
  const nextCurrentStreak = normalizedState.lastCompletedDate === previousDateKey
    ? normalizedState.currentStreak + 1
    : 1;
  const completedDates = getUniqueDateKeys([...normalizedState.completedDates, todayDateKey]);

  return {
    ...normalizedState,
    currentStreak: nextCurrentStreak,
    longestStreak: Math.max(normalizedState.longestStreak, nextCurrentStreak),
    lastCompletedDate: todayDateKey,
    completedDates,
    todayCompleted: true,
    updatedAt: new Date().toISOString()
  };
}

function getPreviousDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const previousDate = new Date(year, month - 1, day - 1);

  return getLocalDateKey(previousDate);
}

function getUniqueDateKeys(dateKeys) {
  return [...new Set(dateKeys.filter(isDateKey))];
}

function isDateKey(dateKey) {
  return typeof dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateKey);
}
