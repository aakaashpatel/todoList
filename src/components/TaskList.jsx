import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask, fetchWeather } from "../redux/taskSlice";
import { logout } from "../redux/userSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const weather = useSelector((state) => state.tasks.weather);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.type === "outdoor" && !weather[task.id]?.temp) {
        dispatch(fetchWeather(task.id));
      }
    });
  }, [tasks, dispatch, weather]);

  const handleEditTask = (taskId) => {
    const newTask = prompt("Edit the task:");
    if (newTask) {
      dispatch(editTask({ id: taskId, text: newTask }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        <span>
          Welcome, <b>{username}</b>!
        </span>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.text} - {task.priority} priority
            </span>
            {task.type === "outdoor" && weather[task.id] && (
              <span style={{ marginLeft: "10px" }}>
                {weather[task.id].temp}°C
              </span>
            )}
            <button
              onClick={() => handleEditTask(task.id)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
