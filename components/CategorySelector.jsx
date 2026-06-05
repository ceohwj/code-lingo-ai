"use client";

import { LearningStatsPanel } from "./LearningStatsPanel";
import { NextMilestonePanel } from "./NextMilestonePanel";
import { WeeklyLearningSnapshot } from "./WeeklyLearningSnapshot";

export function CategorySelector({ achievements = [], categories, categoryProgressByCategory = {}, conceptFocusInsights = [], dailyGoal = {}, learningStats, nextMilestone, onReviewCategory, onSelectCategory, reviewRecommendations = [], streak = {}, weakAreaInsights = [], weeklySnapshot, wrongAnswerCountsByCategory = {} }) {
  const stats = learningStats ?? {
    accuracyPercent: 0,
    questionsCompleted: 0,
    totalXp: 0
  };
  const milestone = nextMilestone ?? {
    nextAchievementDescription: "All current achievement targets are complete.",
    nextAchievementTitle: "All achievements unlocked",
    nextXpMilestone: 100,
    xpUntilNextMilestone: 100
  };
  const snapshot = weeklySnapshot ?? {
    questionsCompleted: 0,
    snapshotNote: "Weekly history is not tracked yet, so this uses current saved progress as a placeholder.",
    weeklyAccuracy: 0,
    xpEarned: 0
  };
  const completedDailyQuestions = dailyGoal.completedQuestionCount ?? 0;
  const dailyGoalTarget = dailyGoal.target ?? 5;
  const remainingDailyQuestions = Math.max(dailyGoalTarget - completedDailyQuestions, 0);
  const dailyMissionMessage = dailyGoal.isCompleted
    ? "Mission complete. Keep the streak warm with a review."
    : "Answer " + remainingDailyQuestions + " more " + (remainingDailyQuestions === 1 ? "question" : "questions") + " to finish today.";

  return (
    <main className="app-shell">
      <section className="category-selector">
        <p className="eyebrow">CodeLingo AI</p>
        <h1>Dashboard</h1>
        <p className="subtitle">Track today&apos;s learning momentum, review priorities, and category progress.</p>

        <section className="dashboard-section dashboard-section-primary" aria-labelledby="today-focus-heading">
          <div className="dashboard-section-header">
            <div>
              <span>Today</span>
              <h2 id="today-focus-heading">Learning focus</h2>
            </div>
          </div>

          <div className="today-summary-grid">
            <section className="daily-goal-panel" aria-label="Daily goal progress">
              <div className="daily-goal-panel-header">
                <div>
                  <span>Today&apos;s mission</span>
                  <strong>{dailyMissionMessage}</strong>
                </div>
                <strong className={"daily-goal-status" + (dailyGoal.isCompleted ? " is-complete" : "")}>{dailyGoal.isCompleted ? "Completed" : "In progress"}</strong>
              </div>
              <div className="daily-goal-count">
                <span>Daily goal</span>
                <strong>{completedDailyQuestions} / {dailyGoalTarget} questions</strong>
              </div>
              <div className="daily-goal-track" aria-hidden="true">
                <div className="daily-goal-fill" style={{ width: (dailyGoal.progressPercent ?? 0) + "%" }} />
              </div>
              <p>{dailyGoal.progressPercent ?? 0}% complete today</p>
            </section>

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
          </div>
        </section>

        <section className="dashboard-section dashboard-section-secondary" aria-labelledby="learning-paths-heading">
          <div className="dashboard-section-header">
            <div>
              <span>Progress</span>
              <h2 id="learning-paths-heading">Learning paths</h2>
            </div>
          </div>
          <div className="category-grid" aria-label="Quiz categories">
            {categories.map((category) => {
              const progress = categoryProgressByCategory[category.categoryId] ?? getEmptyCategoryProgress(category);
              const wrongAnswerCount = wrongAnswerCountsByCategory[category.categoryId] ?? 0;
              const wrongAnswerText = wrongAnswerCount === 0
                ? "No wrong answers yet"
                : wrongAnswerCount + " wrong " + (wrongAnswerCount === 1 ? "answer" : "answers") + " to review";

              return (
                <article className={"category-card category-progress-" + progress.status} key={category.categoryId}>
                  <button className="category-card-main" type="button" onClick={() => onSelectCategory(category.categoryId)}>
                    <span>{category.categoryLabel}</span>
                    <strong>{category.title}</strong>
                    <small>{category.questions.length} questions</small>
                  </button>
                  <div className="category-progress-summary" aria-label={category.categoryLabel + " progress"}>
                    <div className="category-progress-topline">
                      <span>{getCategoryProgressLabel(progress.status)}</span>
                      <strong>{progress.completionPercentage}%</strong>
                    </div>
                    <div className="category-progress-track" aria-hidden="true">
                      <div className="category-progress-fill" style={{ width: progress.completionPercentage + "%" }} />
                    </div>
                    <div className="category-progress-meta">
                      <span>{progress.completedQuestionCount} / {progress.totalQuestions} done</span>
                      <span>{progress.earnedXp} total XP</span>
                    </div>
                  </div>
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

        <section className="dashboard-section dashboard-section-secondary" aria-labelledby="learning-context-heading">
          <div className="dashboard-section-header">
            <div>
              <span>Context</span>
              <h2 id="learning-context-heading">Learning context</h2>
            </div>
          </div>

          <LearningStatsPanel
            accuracyPercent={stats.accuracyPercent}
            questionsCompleted={stats.questionsCompleted}
            totalXp={stats.totalXp}
          />

          <NextMilestonePanel
            nextAchievementDescription={milestone.nextAchievementDescription}
            nextAchievementTitle={milestone.nextAchievementTitle}
            nextXpMilestone={milestone.nextXpMilestone}
            xpUntilNextMilestone={milestone.xpUntilNextMilestone}
          />

          <WeeklyLearningSnapshot
            questionsCompleted={snapshot.questionsCompleted}
            snapshotNote={snapshot.snapshotNote}
            weeklyAccuracy={snapshot.weeklyAccuracy}
            xpEarned={snapshot.xpEarned}
          />

          <section className="recommended-review-panel" aria-label="Recommended review">
            <div className="recommended-review-header">
              <div>
                <span>Recommended Review</span>
                <strong>{reviewRecommendations.length === 0 ? "Nothing urgent" : reviewRecommendations.length + " focused " + (reviewRecommendations.length === 1 ? "review" : "reviews")}</strong>
              </div>
            </div>
            {reviewRecommendations.length === 0 ? (
              <p className="recommended-review-empty">No saved wrong answers need review right now.</p>
            ) : (
              <div className="recommended-review-grid">
                {reviewRecommendations.map((recommendation) => (
                  <article className="recommended-review-item" key={recommendation.categoryId}>
                    <div>
                      <span>{recommendation.categoryLabel}</span>
                      <strong>{recommendation.missedQuestionCount} saved {recommendation.missedQuestionCount === 1 ? "miss" : "misses"}</strong>
                    </div>
                    <p>{recommendation.reason}</p>
                    <small>{recommendation.hardestDifficulty} difficulty - {recommendation.completionPercentage}% complete</small>
                    <button className="review-mode-button" type="button" onClick={() => onReviewCategory(recommendation.categoryId)}>
                      Start Recommended Review
                      <small>Review</small>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="weak-area-panel" aria-label="Weak areas">
            <div className="weak-area-header">
              <div>
                <span>Weak Areas</span>
                <strong>{weakAreaInsights.length === 0 ? "No clear weak area" : weakAreaInsights.length + " insight" + (weakAreaInsights.length === 1 ? "" : "s")}</strong>
              </div>
            </div>
            {weakAreaInsights.length === 0 ? (
              <p className="weak-area-empty">Keep answering questions to reveal learning patterns.</p>
            ) : (
              <div className="weak-area-grid">
                {weakAreaInsights.map((insight) => (
                  <article className="weak-area-item" key={insight.id}>
                    <span>{insight.categoryLabel}</span>
                    <strong>{insight.message}</strong>
                    <small>{insight.detail}</small>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="concept-focus-panel" aria-label="Concept focus">
            <div className="concept-focus-header">
              <div>
                <span>Concept Focus</span>
                <strong>{conceptFocusInsights.length === 0 ? "No concept pattern yet" : conceptFocusInsights.length + " concept" + (conceptFocusInsights.length === 1 ? "" : "s")}</strong>
              </div>
            </div>
            {conceptFocusInsights.length === 0 ? (
              <p className="concept-focus-empty">Concept patterns will appear after more review data.</p>
            ) : (
              <div className="concept-focus-grid">
                {conceptFocusInsights.map((concept) => (
                  <article className="concept-focus-item" key={concept.id}>
                    <span>{concept.conceptLabel}</span>
                    <strong>{concept.message}</strong>
                    <small>{concept.categoryLabels.join(", ") || "Review"}</small>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>

        <section className="dashboard-section dashboard-section-secondary" aria-labelledby="achievement-heading">
          <div className="achievement-panel" aria-label="Achievement summary">
            <div className="achievement-panel-header">
              <div>
                <span>Achievements</span>
                <strong id="achievement-heading">{achievements.filter((achievement) => achievement.isUnlocked).length} / {achievements.length} unlocked</strong>
              </div>
            </div>
            <div className="achievement-grid">
              {achievements.map((achievement) => (
                <article className={"achievement-item" + (achievement.isUnlocked ? " is-unlocked" : " is-locked")} key={achievement.id}>
                  <span>{achievement.isUnlocked ? "Unlocked" : "Locked"}</span>
                  <strong>{achievement.title}</strong>
                  <p>{achievement.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}


function getEmptyCategoryProgress(category) {
  return {
    completedQuestionCount: 0,
    totalQuestions: category.questions.length,
    completionPercentage: 0,
    earnedXp: 0,
    status: "not-started"
  };
}

function getCategoryProgressLabel(status) {
  if (status === "completed") {
    return "Completed";
  }

  if (status === "in-progress") {
    return "In progress";
  }

  return "Not started";
}
