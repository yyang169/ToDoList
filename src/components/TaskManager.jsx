import { useState } from "react";

export default function TaskManager({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const addTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingValue("");
    }
  };

  const beginEdit = (task) => {
    setEditingId(task.id);
    setEditingValue(task.title);
  };

  const saveEdit = () => {
    const trimmed = editingValue.trim();
    if (!trimmed || !editingId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingId ? { ...task, title: trimmed } : task
      )
    );

    setEditingId(null);
    setEditingValue("");
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Task Management ({tasks.length})</h2>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>

      <div className="task-input-row">
        <input
          type="text"
          placeholder="What do you need to study?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-box">Nothing here yet — try adding a task above.</div>
        ) : (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  />
                ) : (
                  <span className={task.completed ? "completed" : ""}>
                    {task.title}
                  </span>
                )}
              </div>

              <div className="task-buttons">
                {editingId === task.id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <button onClick={() => beginEdit(task)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}