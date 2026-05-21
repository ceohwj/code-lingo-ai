"use client";

import { ExplanationCard } from "./ExplanationCard";

export function QuizCard({
  currentResult,
  difficultyLabel,
  isSubmitted,
  onRestart,
  onSelectOption,
  onSubmitOrContinue,
  question,
  selectedOptionIndex,
  xpReward
}) {
  const correctAnswer = question.options[question.correctOptionIndex];
  const earnedXp = currentResult?.isCorrect ? currentResult.xpAwarded ?? xpReward : 0;

  return (
    <article className="question-panel">
      <div className="question-meta" aria-label="Question details">
        <span>{difficultyLabel}</span>
        <span>{xpReward} XP</span>
      </div>
      <h2>{question.prompt}</h2>
      <div className="options" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          const isCorrect = question.correctOptionIndex === index;
          const resultClass = isSubmitted && isCorrect ? " is-correct" : "";
          const incorrectClass = isSubmitted && isSelected && !isCorrect ? " is-incorrect" : "";

          return (
            <button
              className={"option-button" + (isSelected ? " is-selected" : "") + resultClass + incorrectClass}
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
        <ExplanationCard
          commonMistake={question.commonMistake}
          correctAnswer={correctAnswer}
          difficultyLabel={difficultyLabel}
          earnedXp={earnedXp}
          explanation={question.explanation}
        />
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
