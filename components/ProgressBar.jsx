"use client";

export function ProgressBar({ answeredCount, categoryName, currentQuestionIndex, progressPercent, totalQuestions, xp }) {
  return (
    <section className="progress-panel" aria-label="Quiz progress summary">
      <div className="progress-panel-header">
        <div>
          <span className="progress-category">{categoryName}</span>
          <strong>Quiz progress</strong>
        </div>
        <span className="progress-percent-pill">{progressPercent}% complete</span>
      </div>

      <div className="progress-summary-grid">
        <ProgressSummaryItem label="Current" value={currentQuestionIndex + 1} />
        <ProgressSummaryItem label="Total" value={totalQuestions} />
        <ProgressSummaryItem label="Progress" value={progressPercent + "%"} />
        <ProgressSummaryItem label="XP" value={xp} />
      </div>

      <div className="progress-track" aria-label="Quiz progress">
        <div className="progress-fill" style={{ width: progressPercent + "%" }} />
      </div>

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
              className={"checkpoint-dot" + (index < answeredCount ? " is-complete" : "") + (index === currentQuestionIndex ? " is-current" : "")}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressSummaryItem({ label, value }) {
  return (
    <div className="progress-summary-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
