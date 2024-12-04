import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center bg-white mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
