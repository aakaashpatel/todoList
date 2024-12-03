import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 className="text-2xl">To-Do List with Weather</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
