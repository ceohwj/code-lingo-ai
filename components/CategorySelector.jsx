"use client";

export function CategorySelector({ categories, onSelectCategory }) {
  return (
    <main className="app-shell">
      <section className="category-selector">
        <p className="eyebrow">CodeLingo AI</p>
        <h1>Choose a category</h1>
        <p className="subtitle">Pick a quiz path and continue building XP from short, focused missions.</p>
        <div className="category-grid" aria-label="Quiz categories">
          {categories.map((category) => (
            <button
              className="category-card"
              type="button"
              key={category.categoryId}
              onClick={() => onSelectCategory(category.categoryId)}
            >
              <span>{category.categoryLabel}</span>
              <strong>{category.title}</strong>
              <small>{category.questions.length} questions</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
