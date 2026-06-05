"use client";

export function NextMilestonePanel({
  dailyMissionRemaining,
  nextAchievementDescription,
  nextAchievementTitle,
  nextXpMilestone,
  xpUntilNextMilestone
}) {
  const dailyMissionText = dailyMissionRemaining === 0
    ? "Mission complete"
    : dailyMissionRemaining + " " + (dailyMissionRemaining === 1 ? "question" : "questions") + " left";

  return (
    <section className="next-milestone-panel" aria-label="Next learning milestone">
      <div className="next-milestone-header">
        <div>
          <span>Next Milestone</span>
          <strong>Keep momentum going</strong>
        </div>
        <small>{xpUntilNextMilestone} XP left</small>
      </div>

      <div className="next-milestone-grid">
        <MilestoneItem
          label="XP Milestone"
          value={nextXpMilestone + " XP"}
          detail={xpUntilNextMilestone + " XP until this checkpoint"}
        />
        <MilestoneItem
          label="Achievement Target"
          value={nextAchievementTitle}
          detail={nextAchievementDescription}
        />
        <MilestoneItem
          label="Daily Mission"
          value={dailyMissionText}
          detail="Finish today's goal to reinforce the habit loop"
        />
      </div>
    </section>
  );
}

function MilestoneItem({ detail, label, value }) {
  return (
    <div className="next-milestone-item">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  );
}
