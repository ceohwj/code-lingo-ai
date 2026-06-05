"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CategorySelector } from "../components/CategorySelector";
import { ProgressBar } from "../components/ProgressBar";
import { QuizCard } from "../components/QuizCard";
import { QuizHero } from "../components/QuizHero";
import { QuizResults } from "../components/QuizResults";
import { quizzes } from "../data/quizData";
import { useAchievementState } from "../hooks/useAchievementState";
import { useAdaptiveReviewRecommendations } from "../hooks/useAdaptiveReviewRecommendations";
import { useCategoryProgressSummaries } from "../hooks/useCategoryProgressSummaries";
import { useConceptFocusInsights } from "../hooks/useConceptFocusInsights";
import { useDailyGoalState } from "../hooks/useDailyGoalState";
import { useLearningProgressState } from "../hooks/useLearningProgressState";
import { LEGACY_PYTHON_PROGRESS_KEY, useQuizProgressStorageState } from "../hooks/useQuizProgressStorageState";
import { useQuizSessionState } from "../hooks/useQuizSessionState";
import { useStreakState } from "../hooks/useStreakState";
import { useWeakAreaInsights } from "../hooks/useWeakAreaInsights";
import { useWrongAnswerHistory } from "../hooks/useWrongAnswerHistory";
import { createAnswerSubmission } from "../lib/createAnswerSubmission";
import { mergeCompletedAnswers } from "../lib/quizProgressLogic";
import { updateSubmittedAnswers } from "../lib/updateSubmittedAnswers";

const SELECTED_CATEGORY_STORAGE_KEY = "codelingo-ai-selected-category";
const QUIZ_MODE = "quiz";
const REVIEW_MODE = "review";

const quizByCategoryId = Object.fromEntries(quizzes.map((quiz) => [quiz.categoryId, quiz]));

function getEmptyCategoryProgress(category) {
  return {
    completedQuestionCount: 0,
    earnedXp: 0,
    totalQuestions: category.questions.length
  };
}

function getNextXpMilestone(totalXp) {
  const safeTotalXp = Number.isFinite(totalXp) ? Math.max(totalXp, 0) : 0;
  return Math.floor(safeTotalXp / 100) * 100 + 100;
}

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [quizMode, setQuizMode] = useState(QUIZ_MODE);
  const {
    currentQuestionIndex,
    isSubmitted,
    resetQuizSessionState,
    selectedOptionIndex,
    setCurrentQuestionIndex,
    setIsSubmitted,
    setSelectedOptionIndex,
    setSubmittedAnswers,
    submittedAnswers
  } = useQuizSessionState();
  const [savedCompletedAnswers, setSavedCompletedAnswers] = useState([]);
  const [savedTotalXp, setSavedTotalXp] = useState(0);
  const [sessionBaselineQuestionIds, setSessionBaselineQuestionIds] = useState([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [reviewSessionQuestionIds, setReviewSessionQuestionIds] = useState([]);
  const { categoryProgressByCategory, refreshCategoryProgressSummaries } = useCategoryProgressSummaries(quizzes);
  const { completeTodayStreak, isStreakLoaded, streakState } = useStreakState();
  const { addTodayDailyGoalQuestion, dailyGoalState, isDailyGoalLoaded } = useDailyGoalState();
  const { isWrongAnswerHistoryLoaded, updateWrongAnswerIds, wrongAnswerCountsByCategory, wrongAnswerIdsByCategory } = useWrongAnswerHistory(quizzes);
  const { reviewRecommendations } = useAdaptiveReviewRecommendations({
    categories: quizzes,
    categoryProgressByCategory,
    wrongAnswerIdsByCategory
  });
  const { weakAreaInsights } = useWeakAreaInsights({
    categories: quizzes,
    categoryProgressByCategory,
    reviewRecommendations,
    wrongAnswerIdsByCategory
  });
  const { conceptFocusInsights } = useConceptFocusInsights({
    categories: quizzes,
    reviewRecommendations,
    weakAreaInsights,
    wrongAnswerIdsByCategory
  });
  const learningStats = useMemo(() => {
    const categoryProgressSummaries = quizzes.map((category) => (
      categoryProgressByCategory[category.categoryId] ?? getEmptyCategoryProgress(category)
    ));
    const totalXpFromCategories = categoryProgressSummaries.reduce((total, progress) => total + progress.earnedXp, 0);
    const completedQuestionCount = categoryProgressSummaries.reduce((total, progress) => total + progress.completedQuestionCount, 0);
    const savedWrongAnswerCount = Object.values(wrongAnswerCountsByCategory).reduce((total, count) => total + count, 0);
    const answeredSignalCount = completedQuestionCount + savedWrongAnswerCount;
    const accuracyPercent = answeredSignalCount > 0
      ? Math.round((completedQuestionCount / answeredSignalCount) * 100)
      : 0;

    return {
      accuracyPercent,
      currentStreak: streakState.currentStreak ?? 0,
      dailyGoalCompleted: dailyGoalState.completedQuestionCount ?? 0,
      dailyGoalProgressPercent: dailyGoalState.progressPercent ?? 0,
      dailyGoalTarget: dailyGoalState.target ?? 5,
      questionsCompleted: completedQuestionCount,
      totalXp: totalXpFromCategories
    };
  }, [categoryProgressByCategory, dailyGoalState, streakState, wrongAnswerCountsByCategory]);

  const selectedQuiz = selectedCategoryId ? quizByCategoryId[selectedCategoryId] : null;
  const activeQuestions = useMemo(() => {
    if (!selectedQuiz) {
      return [];
    }

    if (quizMode !== REVIEW_MODE) {
      return selectedQuiz.questions;
    }

    const reviewQuestionIdSet = new Set(reviewSessionQuestionIds);
    return selectedQuiz.questions.filter((question) => reviewQuestionIdSet.has(question.id));
  }, [quizMode, reviewSessionQuestionIds, selectedQuiz]);
  const isReviewMode = quizMode === REVIEW_MODE;
  const {
    accuracyPercent,
    correctCount,
    currentDifficultyLabel,
    currentQuestion,
    currentQuestionXp,
    isComplete,
    persistedProgress,
    progressPercent,
    sessionXp,
    totalQuestions,
    totalXp
  } = useLearningProgressState({
    activeQuestions,
    currentQuestionIndex,
    isReviewMode,
    savedCompletedAnswers,
    savedTotalXp,
    selectedQuiz,
    sessionBaselineQuestionIds,
    submittedAnswers
  });
  const remainingWrongAnswerCount = selectedCategoryId ? wrongAnswerIdsByCategory[selectedCategoryId]?.length ?? 0 : 0;

  const currentResult = useMemo(() => {
    return submittedAnswers.find((answer) => answer.questionId === currentQuestion?.id);
  }, [currentQuestion?.id, submittedAnswers]);
  const achievementSession = useMemo(() => ({
    categoryId: selectedQuiz?.categoryId ?? null,
    isComplete,
    isReviewMode,
    submittedAnswers,
    xp: sessionXp
  }), [isComplete, isReviewMode, selectedQuiz?.categoryId, sessionXp, submittedAnswers]);
  const { achievements, isAchievementLoaded } = useAchievementState({
    categories: quizzes,
    categoryProgressByCategory,
    currentSession: achievementSession,
    dailyGoalState,
    streakState
  });
  const nextMilestone = useMemo(() => {
    const nextXpMilestone = getNextXpMilestone(learningStats.totalXp);
    const nextAchievement = achievements.find((achievement) => !achievement.isUnlocked);
    const dailyGoalTarget = dailyGoalState.target ?? 5;
    const dailyGoalCompleted = dailyGoalState.completedQuestionCount ?? 0;

    return {
      dailyMissionRemaining: Math.max(dailyGoalTarget - dailyGoalCompleted, 0),
      nextAchievementDescription: nextAchievement?.description ?? "All current achievement targets are complete.",
      nextAchievementTitle: nextAchievement?.title ?? "All achievements unlocked",
      nextXpMilestone,
      xpUntilNextMilestone: Math.max(nextXpMilestone - learningStats.totalXp, 0)
    };
  }, [achievements, dailyGoalState, learningStats]);
  const weeklySnapshot = useMemo(() => ({
    questionsCompleted: learningStats.questionsCompleted,
    snapshotNote: "Exact weekly history is not tracked yet, so this snapshot uses current saved progress as a weekly placeholder.",
    weeklyAccuracy: learningStats.accuracyPercent,
    xpEarned: learningStats.totalXp
  }), [learningStats]);
  const persistSelectedCategory = useCallback((categoryId) => {
    window.localStorage.setItem(SELECTED_CATEGORY_STORAGE_KEY, categoryId);
  }, []);
  const { isProgressLoaded, markProgressUnloaded } = useQuizProgressStorageState({
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
  });

  useEffect(() => {
    try {
      const savedCategoryId = window.localStorage.getItem(SELECTED_CATEGORY_STORAGE_KEY);

      if (savedCategoryId && quizByCategoryId[savedCategoryId]) {
        setSelectedCategoryId(savedCategoryId);
        setQuizMode(QUIZ_MODE);
        return;
      }

      if (window.localStorage.getItem(LEGACY_PYTHON_PROGRESS_KEY)) {
        setSelectedCategoryId("python");
        setQuizMode(QUIZ_MODE);
      }
    } catch {
      // Ignore storage failures and show the category selector.
    } finally {
      setIsCategoryLoaded(true);
    }
  }, []);

  function startCategoryQuiz(categoryId) {
    if (!quizByCategoryId[categoryId]) {
      return;
    }

    setQuizMode(QUIZ_MODE);
    setReviewSessionQuestionIds([]);
    setSelectedCategoryId(categoryId);
  }

  function startWrongAnswerReview(categoryId) {
    if (!quizByCategoryId[categoryId] || (wrongAnswerIdsByCategory[categoryId] ?? []).length === 0) {
      return;
    }

    setQuizMode(REVIEW_MODE);
    setReviewSessionQuestionIds(wrongAnswerIdsByCategory[categoryId] ?? []);
    setSelectedCategoryId(categoryId);
  }

  function changeCategory() {
    refreshCategoryProgressSummaries();
    setSelectedCategoryId(null);
    setQuizMode(QUIZ_MODE);
    setReviewSessionQuestionIds([]);
    markProgressUnloaded();

    try {
      window.localStorage.removeItem(SELECTED_CATEGORY_STORAGE_KEY);
    } catch {
      // Ignore storage failures so navigation still works.
    }
  }

  function submitAnswer() {
    if (selectedOptionIndex === null || !currentQuestion || !selectedQuiz) {
      return;
    }

    const nextAnswer = createAnswerSubmission({
      isReviewMode,
      question: currentQuestion,
      quiz: selectedQuiz,
      selectedOptionIndex
    });

    updateWrongAnswerIds(selectedQuiz.categoryId, currentQuestion.id, nextAnswer.isCorrect);

    if (!isReviewMode) {
      addTodayDailyGoalQuestion();
    }

    setSubmittedAnswers((answers) => updateSubmittedAnswers(answers, nextAnswer));
    setIsSubmitted(true);
  }

  function goToNextQuestion() {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (!isReviewMode && selectedQuiz && nextQuestionIndex >= totalQuestions) {
      completeTodayStreak();
    }

    setCurrentQuestionIndex(nextQuestionIndex);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
  }

  function restartQuiz() {
    if (!isReviewMode) {
      setSavedCompletedAnswers((currentSavedAnswers) => mergeCompletedAnswers(currentSavedAnswers, submittedAnswers));
      setSavedTotalXp(totalXp);
      setSessionBaselineQuestionIds([]);
    }

    resetQuizSessionState();
  }

  if (!isCategoryLoaded || !isStreakLoaded || !isDailyGoalLoaded || !isAchievementLoaded || !isWrongAnswerHistoryLoaded) {
    return null;
  }

  if (!selectedQuiz) {
    return (
      <CategorySelector
        achievements={achievements}
        categories={quizzes}
        categoryProgressByCategory={categoryProgressByCategory}
        conceptFocusInsights={conceptFocusInsights}
        dailyGoal={dailyGoalState}
        learningStats={learningStats}
        nextMilestone={nextMilestone}
        onReviewCategory={startWrongAnswerReview}
        reviewRecommendations={reviewRecommendations}
        onSelectCategory={startCategoryQuiz}
        streak={streakState}
        weakAreaInsights={weakAreaInsights}
        weeklySnapshot={weeklySnapshot}
        wrongAnswerCountsByCategory={wrongAnswerCountsByCategory}
      />
    );
  }

  if (!isProgressLoaded) {
    return null;
  }

  if (isReviewMode && totalQuestions === 0) {
    return (
      <main className="app-shell">
        <section className="results">
          <p className="eyebrow">Review complete</p>
          <h1>No wrong answers</h1>
          <p className="subtitle">There are no saved wrong answers for {selectedQuiz.categoryLabel} right now.</p>
          <div className="actions results-actions">
            <button className="secondary-button" type="button" onClick={changeCategory}>
              Choose category
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (isComplete) {
    return (
      <QuizResults
        accuracyPercent={accuracyPercent}
        answers={submittedAnswers}
        categoryLabel={selectedQuiz.categoryLabel}
        correctCount={correctCount}
        isReviewMode={isReviewMode}
        onChangeCategory={changeCategory}
        onRestart={restartQuiz}
        questions={activeQuestions}
        remainingWrongAnswerCount={remainingWrongAnswerCount}
        sessionXp={sessionXp}
        totalQuestions={totalQuestions}
        totalXp={totalXp}
      />
    );
  }

  return (
    <main className="app-shell">
      <QuizHero
        isReviewMode={isReviewMode}
        sessionXp={sessionXp}
        subtitle={selectedQuiz.subtitle}
        title={selectedQuiz.title}
        totalXp={totalXp}
      />

      <section className="lesson">
        <div className="category-toolbar">
          <span>{selectedQuiz.categoryLabel}{isReviewMode ? " review" : ""}</span>
          <button className="secondary-button compact-button" type="button" onClick={changeCategory}>
            Change category
          </button>
        </div>
        <ProgressBar
          answeredCount={submittedAnswers.length}
          categoryName={isReviewMode ? selectedQuiz.categoryLabel + " Review" : selectedQuiz.categoryLabel}
          currentDifficulty={currentDifficultyLabel}
          currentQuestionIndex={currentQuestionIndex}
          progressPercent={progressPercent}
          totalQuestions={totalQuestions}
          totalXp={isReviewMode ? undefined : totalXp}
          xp={sessionXp}
        />
        <QuizCard
          currentResult={currentResult}
          difficultyLabel={currentDifficultyLabel}
          isSubmitted={isSubmitted}
          onRestart={restartQuiz}
          onSelectOption={setSelectedOptionIndex}
          onSubmitOrContinue={isSubmitted ? goToNextQuestion : submitAnswer}
          question={currentQuestion}
          selectedOptionIndex={selectedOptionIndex}
          xpReward={isReviewMode ? 0 : currentQuestionXp}
        />
      </section>
    </main>
  );
}
