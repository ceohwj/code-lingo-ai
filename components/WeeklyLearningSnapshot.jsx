"use client";

export function WeeklyLearningSnapshot({
  questionsCompleted,
  snapshotNote,
  weeklyAccuracy,
  xpEarned
}) {
  return (
    <section className="weekly-snapshot-panel" aria-label="Weekly learning snapshot">
      <div className="weekly-snapshot-header">
        <div>
          <span>Weekly Snapshot</span>
          <strong>Current progress proxy</strong>
        </div>
        <small>Estimated</small>
      </div>

      <div className="weekly-snapshot-grid">
        <WeeklySnapshotItem label="Questions Completed This Week" value={questionsCompleted} />
        <WeeklySnapshotItem label="XP Earned This Week" value={xpEarned} />
        <WeeklySnapshotItem label="Weekly Accuracy" value={weeklyAccuracy + "%"} />
      </div>

      <p>{snapshotNote}</p>
    </section>
  );
}

function WeeklySnapshotItem({ label, value }) {
  return (
    <div className="weekly-snapshot-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
