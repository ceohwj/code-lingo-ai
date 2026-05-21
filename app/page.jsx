"use client";

import { useMemo, useState } from "react";

import { pythonBasicsQuiz } from "../data/quizData";
import { calculateXp, checkAnswer, getFeedback, getProgressPercent } from "../lib/quizLogic";

export default function HomePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = pythonBasicsQuiz.questions.length;
  const currentQuestion = pythonBasicsQuiz.questions[currentQuestionIndex];
  const correctCount = submittedAnswers.filter((answer) => answer.isCorrect).length;
  const xp = calculateXp(correctCount, pythonBasicsQuiz.xpPerCorrectAnswer);
  const progressPercent = getProgressPercent(submittedAnswers.length, totalQuestions);
  const isComplete = currentQuestionIndex >= totalQuestions;

  const currentResult = useMemo(() => {
    return submittedAnswers.find((answer) => answer.questionId === currentQuestion?.id);
  }, [currentQuestion?.id, submittedAnswers]);

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

  if (isComplete) {
    return (
      <main className="app-shell">
        <section className="results">
          <p className="eyebrow">Mission complete</p>
          <h1>{xp} XP earned</h1>
          <p className="subtitle">
            You answered {correctCount} of {totalQuestions} Python basics questions correctly.
          </p>
          <div className="summary-grid">
            <ScoreStat value={`${getProgressPercent(correctCount, totalQuestions)}%`} label="Accuracy" />
            <ScoreStat value={totalQuestions} label="Questions" />
            <ScoreStat value={correctCount} label="Correct" />
          </div>
          <div className="review-list" aria-label="Answer review">
            {pythonBasicsQuiz.questions.map((question, index) => {
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
          <button className="primary-button" type="button" onClick={restartQuiz}>
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">CodeLingo AI</p>
          <h1>{pythonBasicsQuiz.title}</h1>
          <p className="subtitle">{pythonBasicsQuiz.subtitle}</p>
        </div>
        <div className="score-panel" aria-label="Current score">
          <span>{xp}</span>
          <small>XP</small>
        </div>
      </section>

      <section className="lesson">
        <div className="lesson-topline">
          <span>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span>{progressPercent}% complete</span>
        </div>
        <div className="progress-track" aria-label="Quiz progress">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <article className="question-panel">
          <div className="checkpoint-strip" aria-label="Lesson progress">
            <div className="checkpoint-copy">
              <span>Lesson checkpoint</span>
              <strong>
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </strong>
            </div>
            <div className="checkpoint-dots" aria-hidden="true">
              {Array.from({ length: totalQuestions }).map((_, index) => (
                <span
                  className={`checkpoint-dot${index < submittedAnswers.length ? " is-complete" : ""}${
                    index === currentQuestionIndex ? " is-current" : ""
                  }`}
                  key={index}
                />
              ))}
            </div>
          </div>
          <h2>{currentQuestion.prompt}</h2>
          <div className="options" role="radiogroup" aria-label="Answer options">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              const isCorrect = currentQuestion.correctOptionIndex === index;
              const resultClass = isSubmitted && isCorrect ? " is-correct" : "";
              const incorrectClass = isSubmitted && isSelected && !isCorrect ? " is-incorrect" : "";

              return (
                <button
                  className={`option-button${isSelected ? " is-selected" : ""}${resultClass}${incorrectClass}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isSubmitted}
                  key={option}
                  onClick={() => setSelectedOptionIndex(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {isSubmitted ? (
            <div className={`explanation ${currentResult?.isCorrect ? "success" : "warning"}`} role="status">
              <strong>{getFeedback(Boolean(currentResult?.isCorrect))}</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
          ) : null}

          <div className="actions">
            <button className="secondary-button" type="button" onClick={restartQuiz}>
              Restart
            </button>
            <button
              className="primary-button"
              type="button"
              disabled={selectedOptionIndex === null}
              onClick={isSubmitted ? goToNextQuestion : submitAnswer}
            >
              {isSubmitted ? "Continue" : "Check answer"}
            </button>
          </div>
        </article>
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
