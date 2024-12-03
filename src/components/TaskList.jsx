import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleTask,
  editTask,
  fetchWeather,
} from "../redux/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.items || []);
  const weather = useSelector((state) => state.tasks.weather || {});
  const dispatch = useDispatch();

  const handleEditTask = (id) => {
    const newTask = prompt("Edit your task:");
    if (newTask) {
      dispatch(editTask({ id, text: newTask }));
    }
  };

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.type === "outdoor" && !weather[task.id]) {
        dispatch(fetchWeather(task.id));
      }
    });
  }, [tasks, dispatch, weather]);

  // Sort tasks by priority: High > Medium > Low
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorities = { High: 1, Medium: 2, Low: 3 };
    return priorities[a.priority] - priorities[b.priority];
  });

  return (
    <div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text} ({task.location}) - <b>{task.priority} Priority</b>
            </span>
            {task.type === "outdoor" && (
              <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                {weather?.[task.id]
                  ? `${weather[task.id].temp}°C, ${
                      weather[task.id].description
                    }`
                  : "Fetching weather..."}
              </span>
            )}
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
