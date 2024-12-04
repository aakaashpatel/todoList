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
    <div className="my-5 p-4 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4 bg-gray-50">
        Create Your ToDo with Weather
      </h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task description"
        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="w-full md:w-1/2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="general">General</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-3 mt-4 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTask}
        className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
