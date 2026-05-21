"use client";

export function CategorySelector({ categories, onReviewCategory, onSelectCategory, wrongAnswerCountsByCategory = {} }) {
  return (
    <main className="app-shell">
      <section className="category-selector">
        <p className="eyebrow">CodeLingo AI</p>
        <h1>Choose a category</h1>
        <p className="subtitle">Pick a quiz path or review saved wrong answers before starting again.</p>
        <div className="category-grid" aria-label="Quiz categories">
          {categories.map((category) => {
            const wrongAnswerCount = wrongAnswerCountsByCategory[category.categoryId] ?? 0;

            return (
              <article className="category-card" key={category.categoryId}>
                <button className="category-card-main" type="button" onClick={() => onSelectCategory(category.categoryId)}>
                  <span>{category.categoryLabel}</span>
                  <strong>{category.title}</strong>
                  <small>{category.questions.length} questions</small>
                </button>
                <button
                  className="review-mode-button"
                  type="button"
                  disabled={wrongAnswerCount === 0}
                  onClick={() => onReviewCategory(category.categoryId)}
                >
                  Review Wrong Answers
                  <small>{wrongAnswerCount} saved</small>
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
