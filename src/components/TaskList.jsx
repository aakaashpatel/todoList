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
          <li key={task.id}>
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
              {task.text}
            </span>
            <button onClick={() => handleEditTask(task.id)} className="edit">
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="delete"
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
