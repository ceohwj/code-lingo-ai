"use client";

import { getFeedback } from "../lib/quizLogic";

export function QuizCard({
  currentResult,
  isSubmitted,
  onRestart,
  onSelectOption,
  onSubmitOrContinue,
  question,
  selectedOptionIndex
}) {
  return (
    <article className="question-panel">
      <h2>{question.prompt}</h2>
      <div className="options" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          const isCorrect = question.correctOptionIndex === index;
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
              onClick={() => onSelectOption(index)}
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
          <p>{question.explanation}</p>
        </div>
      ) : null}

      <div className="actions">
        <button className="secondary-button" type="button" onClick={onRestart}>
          Restart
        </button>
        <button
          className="primary-button"
          type="button"
          disabled={selectedOptionIndex === null}
          onClick={onSubmitOrContinue}
        >
          {isSubmitted ? "Continue" : "Check answer"}
        </button>
      </div>
    </article>
  );
}
