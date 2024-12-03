import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './App.css'

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div style={{ padding: "20px" }}>
      {isLoggedIn ? (
        <>
          <TaskInput />
          <TaskList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
