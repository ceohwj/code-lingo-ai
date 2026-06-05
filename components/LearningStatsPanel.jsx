"use client";

export function LearningStatsPanel({
  accuracyPercent,
  currentStreak,
  dailyGoalCompleted,
  dailyGoalProgressPercent,
  dailyGoalTarget,
  questionsCompleted,
  totalXp
}) {
  const streakLabel = currentStreak === 1 ? "day" : "days";

  return (
    <section className="learning-stats-panel" aria-label="Learning statistics">
      <div className="learning-stats-header">
        <div>
          <span>Learning Stats</span>
          <strong>Progress snapshot</strong>
        </div>
        <small>{dailyGoalProgressPercent}% daily goal</small>
      </div>

      <div className="learning-stats-grid">
        <LearningStatItem label="Total XP" value={totalXp} />
        <LearningStatItem label="Accuracy" value={accuracyPercent + "%"} />
        <LearningStatItem label="Questions Completed" value={questionsCompleted} />
        <LearningStatItem label="Current Streak" value={currentStreak + " " + streakLabel} />
        <LearningStatItem label="Daily Goal" value={dailyGoalCompleted + " / " + dailyGoalTarget} />
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
