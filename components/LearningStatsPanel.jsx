"use client";

export function LearningStatsPanel({
  accuracyPercent,
  questionsCompleted,
  totalXp
}) {
  return (
    <section className="learning-stats-panel" aria-label="Learning statistics">
      <div className="learning-stats-header">
        <div>
          <span>Learning Stats</span>
          <strong>Progress snapshot</strong>
        </div>
        <small>Summary</small>
      </div>

      <div className="learning-stats-grid">
        <LearningStatItem label="Total XP" value={totalXp} />
        <LearningStatItem label="Accuracy" value={accuracyPercent + "%"} />
        <LearningStatItem label="Questions Completed" value={questionsCompleted} />
      </div>
    </section>
  );
}

function LearningStatItem({ label, value }) {
  return (
    <div className="learning-stat-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
