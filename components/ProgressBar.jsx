"use client";

export function ProgressBar({ answeredCount, currentQuestionIndex, progressPercent, totalQuestions }) {
  return (
    <>
      <div className="lesson-topline">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span>{progressPercent}% complete</span>
      </div>
      <div className="progress-track" aria-label="Quiz progress">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
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
              className={`checkpoint-dot${index < answeredCount ? " is-complete" : ""}${
                index === currentQuestionIndex ? " is-current" : ""
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
