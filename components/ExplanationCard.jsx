"use client";

export function ExplanationCard({ commonMistake, correctAnswer, difficultyLabel, earnedXp, explanation, isCorrect }) {
  const resultLabel = isCorrect ? "Correct" : "Review";
  const resultMessage = isCorrect
    ? "Nice work. This answer is correct."
    : "Not quite. Review the correct answer before continuing.";

  return (
    <section className={"explanation-card" + (isCorrect ? " is-correct" : " is-incorrect")} role="status" aria-label="Answer explanation">
      <div className="explanation-card-header">
        <div>
          <span className="explanation-card-label">{resultLabel}</span>
          <p className="explanation-card-result">{resultMessage}</p>
          <strong>Correct answer: {correctAnswer}</strong>
        </div>
        <div className="explanation-card-meta" aria-label="Answer result details">
          <span>{difficultyLabel}</span>
          <span>{earnedXp} XP earned</span>
        </div>
      </div>
      <p>{explanation}</p>
      {commonMistake ? (
        <div className="common-mistake">
          <strong>Common mistake</strong>
          <p>{commonMistake}</p>
        </div>
      ) : null}
    </section>
  );
}
