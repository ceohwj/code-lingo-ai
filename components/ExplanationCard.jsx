"use client";

export function ExplanationCard({ commonMistake, correctAnswer, difficultyLabel, earnedXp, explanation }) {
  return (
    <section className="explanation-card" role="status" aria-label="Answer explanation">
      <div className="explanation-card-header">
        <div>
          <span className="explanation-card-label">Explanation</span>
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
