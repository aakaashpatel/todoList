import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("general");
  const [priority, setPriority] = useState("Medium"); // Default priority

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(
        addTask({
          text: task,
          location: location.trim() || "Delhi",
          type,
          priority,
        })
      );
      setTask("");
      setLocation("");
      setPriority("Medium"); // Reset priority
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task description"
        style={{ padding: "10px", width: "70%" }}
      />
      <div className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          style={{
            padding: "10px",
            width: "70%",
            marginTop: "10px",
            display: "block",
          }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "10px", marginTop: "10px", display: "block" }}
        >
          <option value="general">General</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: "10px", marginTop: "10px", display: "block" }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTask}
        style={{
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
