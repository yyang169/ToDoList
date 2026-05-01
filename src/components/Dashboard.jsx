export default function Dashboard({
  totalTasks,
  completedTasks,
  sessionsCompleted,
}) {
  return (
    <div className="dashboard">
      <div>
        <h1>Study Session Planner</h1>
        <p>
          Organize your study tasks, focus with a timer, and track your
          progress.
        </p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Sessions</h3>
          <p>{sessionsCompleted}</p>
        </div>
      </div>
    </div>
  );
}