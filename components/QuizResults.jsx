"use client";

export function QuizResults({
  accuracyPercent,
  answers,
  categoryLabel,
  correctCount,
  isReviewMode,
  onChangeCategory,
  onRestart,
  questions,
  remainingWrongAnswerCount,
  sessionXp,
  totalQuestions,
  totalXp
}) {
  return (
    <main className="app-shell">
      <section className="results">
        <p className="eyebrow">{isReviewMode ? "Review complete" : "Mission complete"}</p>
        <h1>{isReviewMode ? "Review summary" : sessionXp + " XP earned"}</h1>
        <p className="subtitle">
          {isReviewMode
            ? "You reviewed " + totalQuestions + " saved " + categoryLabel + " questions."
            : "You answered " + correctCount + " of " + totalQuestions + " " + categoryLabel + " quiz questions correctly."}
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
              <ScoreStat value={accuracyPercent + "%"} label="Accuracy" />
              <ScoreStat value={totalQuestions} label="Questions" />
              <ScoreStat value={correctCount} label="Correct" />
              <ScoreStat value={totalXp} label="Total XP" />
            </>
          )}
        </div>
        <div className="review-list" aria-label="Answer review">
          {questions.map((question, index) => {
            const answer = answers.find((item) => item.questionId === question.id);
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
          <button className="secondary-button" type="button" onClick={onChangeCategory}>
            Change category
          </button>
          <button className="primary-button" type="button" onClick={onRestart}>
            {isReviewMode ? "Review again" : "Try again"}
          </button>
        </div>
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
