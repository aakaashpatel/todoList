import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../redux/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleEditTask = (id) => {
    const newTask = prompt("Edit your task:");
    if (newTask) {
      dispatch(editTask({ id, text: newTask }));
    }
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ margin: "10px 0", display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              style={{ marginRight: "10px" }}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleEditTask(task.id)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
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
