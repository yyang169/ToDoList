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
          Keep track of your study tasks and sessions.
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