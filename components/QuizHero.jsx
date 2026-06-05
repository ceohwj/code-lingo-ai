"use client";

export function QuizHero({
  isReviewMode,
  sessionXp,
  subtitle,
  title,
  totalXp
}) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">CodeLingo AI</p>
        <h1>{title}</h1>
        <p className="subtitle">{isReviewMode ? "Review saved wrong answers and clear them by answering correctly." : subtitle}</p>
      </div>
      <div className="score-panel" aria-label="Current score">
        <span>{sessionXp}</span>
        <small>Session XP</small>
        {!isReviewMode ? <small>Total {totalXp} XP</small> : null}
      </div>
    </section>
  );
}
