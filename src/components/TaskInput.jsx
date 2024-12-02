import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        style={{ padding: "10px", width: "70%" }}
      />
      <button
        onClick={handleAddTask}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
