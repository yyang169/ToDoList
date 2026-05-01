function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function StudyTimer({
  studyMinutes,
  setStudyMinutes,
  timeLeft,
  isRunning,
  setIsRunning,
  setTimeLeft,
}) {
  const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(studyMinutes * 60);
  };

  return (
    <div className="card">
      <h2>Study Timer</h2>

      <label>Session Length (minutes)</label>
      <input
        type="number"
        min="1"
        max="180"
        value={studyMinutes}
        onChange={(e) => setStudyMinutes(Number(e.target.value) || 1)}
      />

      <div className="timer-box">
        <p>Time Remaining</p>
        <h1>{formatTime(timeLeft)}</h1>
      </div>

      <div className="timer-buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <p className="timer-status">
        Status: {isRunning ? "Running" : "Stopped"}
      </p>
    </div>
  );
}