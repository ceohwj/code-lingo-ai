"use client";

import { useEffect, useMemo, useState } from "react";

import { CategorySelector } from "../components/CategorySelector";
import { ProgressBar } from "../components/ProgressBar";
import { QuizCard } from "../components/QuizCard";
import { quizzes } from "../data/quizData";
import { DAILY_GOAL_STORAGE_KEY, addCompletedDailyGoalQuestions, getInitialDailyGoalState, normalizeDailyGoalState } from "../lib/dailyGoalLogic";
import { calculateDifficultyXp, checkAnswer, getDifficultyLabel, getProgressPercent, getQuestionDifficulty, getQuestionXp } from "../lib/quizLogic";
import { STREAK_STORAGE_KEY, completeLearningDay, getInitialStreakState, getLocalDateKey, normalizeStreakState } from "../lib/streakLogic";

const LEGACY_PYTHON_PROGRESS_KEY = "codelingo-ai-python-basics-progress";
const SELECTED_CATEGORY_STORAGE_KEY = "codelingo-ai-selected-category";
const QUIZ_MODE = "quiz";
const REVIEW_MODE = "review";

const progressStorageKeys = {
  ai: "codelingo-ai-ai-basics-progress",
  bioinformatics: "codelingo-ai-bioinformatics-basics-progress",
  python: LEGACY_PYTHON_PROGRESS_KEY,
  sql: "codelingo-ai-sql-basics-progress"
};

const quizByCategoryId = Object.fromEntries(quizzes.map((quiz) => [quiz.categoryId, quiz]));

function getProgressStorageKey(categoryId) {
  return progressStorageKeys[categoryId] ?? "codelingo-ai-" + categoryId + "-progress";
}

function getWrongAnswersStorageKey(categoryId) {
  return "codelingo-ai-" + categoryId + "-wrong-answers";
}

function getInitialProgressState() {
  return {
    currentQuestionIndex: 0,
    isSubmitted: false,
    selectedOptionIndex: null,
    submittedAnswers: []
  };
}

function getUniqueQuestionIds(questionIds) {
  return [...new Set(questionIds.filter((questionId) => typeof questionId === "string"))];
}

function parseSavedWrongAnswerIds(savedWrongAnswers) {
  const parsedWrongAnswers = JSON.parse(savedWrongAnswers);

  if (Array.isArray(parsedWrongAnswers)) {
    return getUniqueQuestionIds(parsedWrongAnswers);
  }

  if (Array.isArray(parsedWrongAnswers.questionIds)) {
    return getUniqueQuestionIds(parsedWrongAnswers.questionIds);
  }

  return [];
}

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [quizMode, setQuizMode] = useState(QUIZ_MODE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [wrongAnswerIdsByCategory, setWrongAnswerIdsByCategory] = useState({});
  const [reviewSessionQuestionIds, setReviewSessionQuestionIds] = useState([]);
  const [streakState, setStreakState] = useState(() => getInitialStreakState());
  const [isStreakLoaded, setIsStreakLoaded] = useState(false);
  const [dailyGoalState, setDailyGoalState] = useState(() => getInitialDailyGoalState(getLocalDateKey()));
  const [isDailyGoalLoaded, setIsDailyGoalLoaded] = useState(false);

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
  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const correctCount = submittedAnswers.filter((answer) => answer.isCorrect).length;
  const isReviewMode = quizMode === REVIEW_MODE;
  const currentDifficulty = getQuestionDifficulty(currentQuestion);
  const currentDifficultyLabel = getDifficultyLabel(currentDifficulty);
  const currentQuestionXp = getQuestionXp(currentQuestion, selectedQuiz?.xpByDifficulty);
  const xp = isReviewMode ? 0 : calculateDifficultyXp(submittedAnswers, selectedQuiz?.questions ?? [], selectedQuiz?.xpByDifficulty);
  const progressPercent = getProgressPercent(submittedAnswers.length, totalQuestions);
  const remainingWrongAnswerCount = selectedCategoryId ? wrongAnswerIdsByCategory[selectedCategoryId]?.length ?? 0 : 0;
  const isComplete = Boolean(selectedQuiz) && currentQuestionIndex >= totalQuestions;

  const currentResult = useMemo(() => {
    return submittedAnswers.find((answer) => answer.questionId === currentQuestion?.id);
  }, [currentQuestion?.id, submittedAnswers]);

  useEffect(() => {
    const nextWrongAnswerIdsByCategory = {};

    try {
      for (const quiz of quizzes) {
        const savedWrongAnswers = window.localStorage.getItem(getWrongAnswersStorageKey(quiz.categoryId));
        nextWrongAnswerIdsByCategory[quiz.categoryId] = savedWrongAnswers
          ? parseSavedWrongAnswerIds(savedWrongAnswers)
          : [];
      }

      setWrongAnswerIdsByCategory(nextWrongAnswerIdsByCategory);

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
      setWrongAnswerIdsByCategory(nextWrongAnswerIdsByCategory);
    } finally {
      setIsCategoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    try {
      const savedStreakState = window.localStorage.getItem(STREAK_STORAGE_KEY);
      setStreakState(savedStreakState
        ? normalizeStreakState(JSON.parse(savedStreakState), getLocalDateKey())
        : getInitialStreakState());
    } catch {
      setStreakState(getInitialStreakState());
    } finally {
      setIsStreakLoaded(true);
    }
  }, []);

  useEffect(() => {
    try {
      const todayDateKey = getLocalDateKey();
      const savedDailyGoalState = window.localStorage.getItem(DAILY_GOAL_STORAGE_KEY);
      setDailyGoalState(savedDailyGoalState
        ? normalizeDailyGoalState(JSON.parse(savedDailyGoalState), todayDateKey)
        : getInitialDailyGoalState(todayDateKey));
    } catch {
      setDailyGoalState(getInitialDailyGoalState(getLocalDateKey()));
    } finally {
      setIsDailyGoalLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!selectedQuiz) {
      setIsProgressLoaded(false);
      return;
    }

    setIsProgressLoaded(false);

    if (isReviewMode) {
      const cleanProgress = getInitialProgressState();
      setCurrentQuestionIndex(cleanProgress.currentQuestionIndex);
      setSubmittedAnswers(cleanProgress.submittedAnswers);
      setSelectedOptionIndex(cleanProgress.selectedOptionIndex);
      setIsSubmitted(cleanProgress.isSubmitted);
      setIsProgressLoaded(true);
      return;
    }

    try {
      window.localStorage.setItem(SELECTED_CATEGORY_STORAGE_KEY, selectedQuiz.categoryId);

      const savedProgress = window.localStorage.getItem(getProgressStorageKey(selectedQuiz.categoryId));

      if (!savedProgress) {
        const cleanProgress = getInitialProgressState();
        setCurrentQuestionIndex(cleanProgress.currentQuestionIndex);
        setSubmittedAnswers(cleanProgress.submittedAnswers);
        setSelectedOptionIndex(cleanProgress.selectedOptionIndex);
        setIsSubmitted(cleanProgress.isSubmitted);
        return;
      }

      const parsedProgress = JSON.parse(savedProgress);
      const savedQuestionIndex = Number(parsedProgress.currentQuestionIndex);
      const savedCompletedQuestions = Array.isArray(parsedProgress.completedQuestions)
        ? parsedProgress.completedQuestions
        : [];
      const savedSelectedOptionIndex = Number.isInteger(parsedProgress.selectedOptionIndex)
        ? parsedProgress.selectedOptionIndex
        : null;

      const cleanProgress = getInitialProgressState();
      setCurrentQuestionIndex(
        savedQuestionIndex >= 0 && savedQuestionIndex <= selectedQuiz.questions.length
          ? savedQuestionIndex
          : cleanProgress.currentQuestionIndex
      );
      setSubmittedAnswers(savedCompletedQuestions);
      setSelectedOptionIndex(savedSelectedOptionIndex);
      setIsSubmitted(Boolean(parsedProgress.isSubmitted));
    } catch {
      const cleanProgress = getInitialProgressState();
      setCurrentQuestionIndex(cleanProgress.currentQuestionIndex);
      setSubmittedAnswers(cleanProgress.submittedAnswers);
      setSelectedOptionIndex(cleanProgress.selectedOptionIndex);
      setIsSubmitted(cleanProgress.isSubmitted);
    } finally {
      setIsProgressLoaded(true);
    }
  }, [isReviewMode, selectedQuiz]);

  useEffect(() => {
    if (!isProgressLoaded || !selectedQuiz || isReviewMode) {
      return;
    }

    try {
      window.localStorage.setItem(
        getProgressStorageKey(selectedQuiz.categoryId),
        JSON.stringify({
          schemaVersion: 2,
          categoryId: selectedQuiz.categoryId,
          completedQuestions: submittedAnswers,
          currentQuestionIndex,
          isSubmitted,
          mode: QUIZ_MODE,
          selectedOptionIndex,
          xp,
          xpByDifficulty: selectedQuiz.xpByDifficulty
        })
      );
    } catch {
      // Ignore storage failures so quiz interactions keep working.
    }
  }, [currentQuestionIndex, isProgressLoaded, isReviewMode, isSubmitted, selectedOptionIndex, selectedQuiz, submittedAnswers, xp]);

  function updateWrongAnswerIds(categoryId, questionId, isCorrect) {
    if (!questionId) {
      return;
    }

    setWrongAnswerIdsByCategory((currentWrongAnswers) => {
      const currentQuestionIds = currentWrongAnswers[categoryId] ?? [];
      const nextQuestionIds = isCorrect
        ? currentQuestionIds.filter((savedQuestionId) => savedQuestionId !== questionId)
        : getUniqueQuestionIds([...currentQuestionIds, questionId]);
      const nextWrongAnswers = {
        ...currentWrongAnswers,
        [categoryId]: nextQuestionIds
      };

      try {
        window.localStorage.setItem(
          getWrongAnswersStorageKey(categoryId),
          JSON.stringify({
            schemaVersion: 1,
            categoryId,
            questionIds: nextQuestionIds,
            updatedAt: new Date().toISOString()
          })
        );
      } catch {
        // Ignore storage failures so answer flow keeps working.
      }

      return nextWrongAnswers;
    });
  }

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
    setSelectedCategoryId(null);
    setQuizMode(QUIZ_MODE);
    setReviewSessionQuestionIds([]);
    setIsProgressLoaded(false);

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

    const nextAnswer = {
      schemaVersion: 1,
      questionId: currentQuestion.id,
      questionDifficulty: getQuestionDifficulty(currentQuestion),
      selectedOptionIndex,
      isCorrect: checkAnswer(currentQuestion, selectedOptionIndex),
      xpAwarded: checkAnswer(currentQuestion, selectedOptionIndex) && !isReviewMode ? getQuestionXp(currentQuestion, selectedQuiz.xpByDifficulty) : 0
    };

    updateWrongAnswerIds(selectedQuiz.categoryId, currentQuestion.id, nextAnswer.isCorrect);

    if (!isReviewMode) {
      addTodayDailyGoalQuestion();
    }

    setSubmittedAnswers((answers) => {
      const withoutCurrent = answers.filter((answer) => answer.questionId !== currentQuestion.id);
      return [...withoutCurrent, nextAnswer];
    });
    setIsSubmitted(true);
  }

  function addTodayDailyGoalQuestion() {
    setDailyGoalState((currentDailyGoalState) => {
      const nextDailyGoalState = addCompletedDailyGoalQuestions(currentDailyGoalState, 1, getLocalDateKey());

      try {
        window.localStorage.setItem(DAILY_GOAL_STORAGE_KEY, JSON.stringify(nextDailyGoalState));
      } catch {
        // Ignore storage failures so answer flow keeps working.
      }

      return nextDailyGoalState;
    });
  }

  function completeTodayStreak() {
    setStreakState((currentStreakState) => {
      const nextStreakState = completeLearningDay(currentStreakState, getLocalDateKey());

      try {
        window.localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(nextStreakState));
      } catch {
        // Ignore storage failures so quiz completion keeps working.
      }

      return nextStreakState;
    });
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
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setSubmittedAnswers([]);
    setIsSubmitted(false);
  }

  if (!isCategoryLoaded || !isStreakLoaded || !isDailyGoalLoaded) {
    return null;
  }

  if (!selectedQuiz) {
    return (
      <CategorySelector
        categories={quizzes}
        dailyGoal={dailyGoalState}
        onReviewCategory={startWrongAnswerReview}
        onSelectCategory={startCategoryQuiz}
        streak={streakState}
        wrongAnswerCountsByCategory={Object.fromEntries(
          Object.entries(wrongAnswerIdsByCategory).map(([categoryId, questionIds]) => [categoryId, questionIds.length])
        )}
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
      <main className="app-shell">
        <section className="results">
          <p className="eyebrow">{isReviewMode ? "Review complete" : "Mission complete"}</p>
          <h1>{isReviewMode ? "Review summary" : xp + " XP earned"}</h1>
          <p className="subtitle">
            {isReviewMode
              ? "You reviewed " + totalQuestions + " saved " + selectedQuiz.categoryLabel + " questions."
              : "You answered " + correctCount + " of " + totalQuestions + " " + selectedQuiz.categoryLabel + " quiz questions correctly."}
          </p>
          <div className="summary-grid">
            {isReviewMode ? (
              <>
                <ScoreStat value={totalQuestions} label="Reviewed" />
                <ScoreStat value={correctCount} label="Corrected" />
                <ScoreStat value={remainingWrongAnswerCount} label="Remaining" />
              </>
            ) : (
              <>
                <ScoreStat value={getProgressPercent(correctCount, totalQuestions) + "%"} label="Accuracy" />
                <ScoreStat value={totalQuestions} label="Questions" />
                <ScoreStat value={correctCount} label="Correct" />
              </>
            )}
          </div>
          <div className="review-list" aria-label="Answer review">
            {activeQuestions.map((question, index) => {
              const answer = submittedAnswers.find((item) => item.questionId === question.id);
              const selectedAnswer = question.options[answer?.selectedOptionIndex];
              const correctAnswer = question.options[question.correctOptionIndex];

              return (
                <article className={"review-item" + (answer?.isCorrect ? " is-correct" : " is-incorrect")} key={question.id}>
                  <div className="review-item-topline">
                    <span>Mission {index + 1}</span>
                    <strong>{answer?.isCorrect ? "Correct" : "Review"}</strong>
                  </div>
                  <h2>{question.prompt}</h2>
                  <p>
                    Your answer: <strong>{selectedAnswer}</strong>
                  </p>
                  {!answer?.isCorrect ? (
                    <p>
                      Correct answer: <strong>{correctAnswer}</strong>
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
          <div className="actions results-actions">
            <button className="secondary-button" type="button" onClick={changeCategory}>
              Change category
            </button>
            <button className="primary-button" type="button" onClick={restartQuiz}>
              {isReviewMode ? "Review again" : "Try again"}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">CodeLingo AI</p>
          <h1>{selectedQuiz.title}</h1>
          <p className="subtitle">{isReviewMode ? "Review saved wrong answers and clear them by answering correctly." : selectedQuiz.subtitle}</p>
        </div>
        <div className="score-panel" aria-label="Current score">
          <span>{xp}</span>
          <small>XP</small>
        </div>
      </section>

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
          xp={xp}
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

function ScoreStat({ value, label }) {
  return (
    <div>
      <span>{value}</span>
      <small>{label}</small>
    </div>
  );
}
