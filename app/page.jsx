"use client";

import { useEffect, useMemo, useState } from "react";

import { CategorySelector } from "../components/CategorySelector";
import { ProgressBar } from "../components/ProgressBar";
import { QuizCard } from "../components/QuizCard";
import { quizzes } from "../data/quizData";
import { calculateXp, checkAnswer, getProgressPercent } from "../lib/quizLogic";

const LEGACY_PYTHON_PROGRESS_KEY = "codelingo-ai-python-basics-progress";
const SELECTED_CATEGORY_STORAGE_KEY = "codelingo-ai-selected-category";

const progressStorageKeys = {
  ai: "codelingo-ai-ai-basics-progress",
  bioinformatics: "codelingo-ai-bioinformatics-basics-progress",
  python: LEGACY_PYTHON_PROGRESS_KEY,
  sql: "codelingo-ai-sql-basics-progress"
};

const quizByCategoryId = Object.fromEntries(quizzes.map((quiz) => [quiz.categoryId, quiz]));

function getProgressStorageKey(categoryId) {
  return progressStorageKeys[categoryId] ?? `codelingo-ai-${categoryId}-progress`;
}

function getInitialProgressState() {
  return {
    currentQuestionIndex: 0,
    isSubmitted: false,
    selectedOptionIndex: null,
    submittedAnswers: []
  };
}

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  const selectedQuiz = selectedCategoryId ? quizByCategoryId[selectedCategoryId] : null;
  const totalQuestions = selectedQuiz?.questions.length ?? 0;
  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];
  const correctCount = submittedAnswers.filter((answer) => answer.isCorrect).length;
  const xp = calculateXp(correctCount, selectedQuiz?.xpPerCorrectAnswer ?? 0);
  const progressPercent = getProgressPercent(submittedAnswers.length, totalQuestions);
  const isComplete = Boolean(selectedQuiz) && currentQuestionIndex >= totalQuestions;

  const currentResult = useMemo(() => {
    return submittedAnswers.find((answer) => answer.questionId === currentQuestion?.id);
  }, [currentQuestion?.id, submittedAnswers]);

  useEffect(() => {
    try {
      const savedCategoryId = window.localStorage.getItem(SELECTED_CATEGORY_STORAGE_KEY);

      if (savedCategoryId && quizByCategoryId[savedCategoryId]) {
        setSelectedCategoryId(savedCategoryId);
        return;
      }

      if (window.localStorage.getItem(LEGACY_PYTHON_PROGRESS_KEY)) {
        setSelectedCategoryId("python");
      }
    } catch {
      // Ignore storage failures so the category screen still works.
    } finally {
      setIsCategoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!selectedQuiz) {
      setIsProgressLoaded(false);
      return;
    }

    setIsProgressLoaded(false);

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
  }, [selectedQuiz]);

  useEffect(() => {
    if (!isProgressLoaded || !selectedQuiz) {
      return;
    }

    try {
      window.localStorage.setItem(
        getProgressStorageKey(selectedQuiz.categoryId),
        JSON.stringify({
          categoryId: selectedQuiz.categoryId,
          completedQuestions: submittedAnswers,
          currentQuestionIndex,
          isSubmitted,
          selectedOptionIndex,
          xp
        })
      );
    } catch {
      // Ignore storage failures so quiz interactions keep working.
    }
  }, [currentQuestionIndex, isProgressLoaded, isSubmitted, selectedOptionIndex, selectedQuiz, submittedAnswers, xp]);

  function selectCategory(categoryId) {
    if (!quizByCategoryId[categoryId]) {
      return;
    }

    setSelectedCategoryId(categoryId);
  }

  function changeCategory() {
    setSelectedCategoryId(null);
    setIsProgressLoaded(false);

    try {
      window.localStorage.removeItem(SELECTED_CATEGORY_STORAGE_KEY);
    } catch {
      // Ignore storage failures so navigation still works.
    }
  }

  function submitAnswer() {
    if (selectedOptionIndex === null || !currentQuestion) {
      return;
    }

    const nextAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndex,
      isCorrect: checkAnswer(currentQuestion, selectedOptionIndex)
    };

    setSubmittedAnswers((answers) => {
      const withoutCurrent = answers.filter((answer) => answer.questionId !== currentQuestion.id);
      return [...withoutCurrent, nextAnswer];
    });
    setIsSubmitted(true);
  }

  function goToNextQuestion() {
    setCurrentQuestionIndex((index) => index + 1);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setSubmittedAnswers([]);
    setIsSubmitted(false);
  }

  if (!isCategoryLoaded) {
    return null;
  }

  if (!selectedQuiz) {
    return <CategorySelector categories={quizzes} onSelectCategory={selectCategory} />;
  }

  if (!isProgressLoaded) {
    return null;
  }

  if (isComplete) {
    return (
      <main className="app-shell">
        <section className="results">
          <p className="eyebrow">Mission complete</p>
          <h1>{xp} XP earned</h1>
          <p className="subtitle">
            You answered {correctCount} of {totalQuestions} {selectedQuiz.categoryLabel} questions correctly.
          </p>
          <div className="summary-grid">
            <ScoreStat value={`${getProgressPercent(correctCount, totalQuestions)}%`} label="Accuracy" />
            <ScoreStat value={totalQuestions} label="Questions" />
            <ScoreStat value={correctCount} label="Correct" />
          </div>
          <div className="review-list" aria-label="Answer review">
            {selectedQuiz.questions.map((question, index) => {
              const answer = submittedAnswers.find((item) => item.questionId === question.id);
              const selectedAnswer = question.options[answer?.selectedOptionIndex];
              const correctAnswer = question.options[question.correctOptionIndex];

              return (
                <article className={`review-item${answer?.isCorrect ? " is-correct" : " is-incorrect"}`} key={question.id}>
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
              Try again
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
          <p className="subtitle">{selectedQuiz.subtitle}</p>
        </div>
        <div className="score-panel" aria-label="Current score">
          <span>{xp}</span>
          <small>XP</small>
        </div>
      </section>

      <section className="lesson">
        <div className="category-toolbar">
          <span>{selectedQuiz.categoryLabel}</span>
          <button className="secondary-button compact-button" type="button" onClick={changeCategory}>
            Change category
          </button>
        </div>
        <ProgressBar
          answeredCount={submittedAnswers.length}
          currentQuestionIndex={currentQuestionIndex}
          progressPercent={progressPercent}
          totalQuestions={totalQuestions}
        />
        <QuizCard
          currentResult={currentResult}
          isSubmitted={isSubmitted}
          onRestart={restartQuiz}
          onSelectOption={setSelectedOptionIndex}
          onSubmitOrContinue={isSubmitted ? goToNextQuestion : submitAnswer}
          question={currentQuestion}
          selectedOptionIndex={selectedOptionIndex}
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
