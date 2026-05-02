import { useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";
import StudyTimer from "./components/StudyTimer";
import ProgressTracker from "./components/ProgressTracker";

const TASKS_KEY = "study_planner_tasks";
const SESSIONS_KEY = "study_planner_sessions";
const TIMER_KEY = "study_planner_timer_minutes";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(TASKS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem(SESSIONS_KEY);
    return saved ? JSON.parse(saved) : 0;
  });

  const [studyMinutes, setStudyMinutes] = useState(() => {
    const saved = localStorage.getItem(TIMER_KEY);
    return saved ? JSON.parse(saved) : 25;
  });

  const [timeLeft, setTimeLeft] = useState(studyMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessionsCompleted));
  }, [sessionsCompleted]);

  useEffect(() => {
    localStorage.setItem(TIMER_KEY, JSON.stringify(studyMinutes));
  }, [studyMinutes]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setSessionsCompleted((count) => count + 1);
          alert("Time is up! Good job.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
  setTimeLeft(studyMinutes * 60);
}, [studyMinutes]);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const totalTasks = tasks.length;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="app">
      <Dashboard
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        sessionsCompleted={sessionsCompleted}
      />

      <div className="main-grid">
        <TaskManager tasks={tasks} setTasks={setTasks} />
        <div className="right-panel">
          <StudyTimer
            studyMinutes={studyMinutes}
            setStudyMinutes={setStudyMinutes}
            timeLeft={timeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setTimeLeft={setTimeLeft}
          />
          <ProgressTracker
            completedTasks={completedTasks}
            sessionsCompleted={sessionsCompleted}
            progressPercent={progressPercent}
          />
        </div>
      </div>
    </div>
  );
}