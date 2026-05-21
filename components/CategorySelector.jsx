"use client";

export function CategorySelector({ categories, dailyGoal = {}, onReviewCategory, onSelectCategory, streak = {}, wrongAnswerCountsByCategory = {} }) {
  return (
    <main className="app-shell">
      <section className="category-selector">
        <p className="eyebrow">CodeLingo AI</p>
        <h1>Choose a category</h1>
        <p className="subtitle">Pick a quiz path or review saved wrong answers before starting again.</p>
        <section className="streak-panel" aria-label="Daily learning streak">
          <div>
            <span>Current streak</span>
            <strong>{streak.currentStreak ?? 0} {(streak.currentStreak ?? 0) === 1 ? "day" : "days"}</strong>
          </div>
          <div>
            <span>Today</span>
            <strong>{streak.todayCompleted ? "Completed" : "Not completed yet"}</strong>
          </div>
          <div>
            <span>Best streak</span>
            <strong>{streak.longestStreak ?? 0} {(streak.longestStreak ?? 0) === 1 ? "day" : "days"}</strong>
          </div>
        </section>
        <section className="daily-goal-panel" aria-label="Daily goal progress">
          <div className="daily-goal-panel-header">
            <div>
              <span>Daily goal</span>
              <strong>{dailyGoal.completedQuestionCount ?? 0} / {dailyGoal.target ?? 5} questions</strong>
            </div>
            <strong>{dailyGoal.isCompleted ? "Completed" : "Not completed"}</strong>
          </div>
          <div className="daily-goal-track" aria-hidden="true">
            <div className="daily-goal-fill" style={{ width: (dailyGoal.progressPercent ?? 0) + "%" }} />
          </div>
          <p>{dailyGoal.progressPercent ?? 0}% complete today</p>
        </section>
        <div className="category-grid" aria-label="Quiz categories">
          {categories.map((category) => {
            const wrongAnswerCount = wrongAnswerCountsByCategory[category.categoryId] ?? 0;
            const wrongAnswerText = wrongAnswerCount === 0
              ? "No wrong answers yet"
              : wrongAnswerCount + " wrong " + (wrongAnswerCount === 1 ? "answer" : "answers") + " to review";

            return (
              <article className="category-card" key={category.categoryId}>
                <button className="category-card-main" type="button" onClick={() => onSelectCategory(category.categoryId)}>
                  <span>{category.categoryLabel}</span>
                  <strong>{category.title}</strong>
                  <small>{category.questions.length} questions</small>
                </button>
                <p className="wrong-answer-count">{wrongAnswerText}</p>
                <button
                  className="review-mode-button"
                  type="button"
                  disabled={wrongAnswerCount === 0}
                  onClick={() => onReviewCategory(category.categoryId)}
                >
                  {wrongAnswerCount === 0 ? "No review needed" : "Review Wrong Answers"}
                  <small>{wrongAnswerCount === 0 ? "Clear" : wrongAnswerCount + " saved"}</small>
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
