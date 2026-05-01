export default function ProgressTracker({
  completedTasks,
  sessionsCompleted,
  progressPercent,
}) {
  return (
    <div className="card">
      <h2>Progress Tracking</h2>

      <div className="progress-row">
        <span>Task Completion</span>
        <span>{progressPercent}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="progress-stats">
        <div className="mini-card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="mini-card">
          <h3>Finished Sessions</h3>
          <p>{sessionsCompleted}</p>
        </div>
      </div>

      <p className="progress-note">
        Stay consistent: complete your tasks and finish study sessions to raise
        your progress.
      </p>
    </div>
  );
}