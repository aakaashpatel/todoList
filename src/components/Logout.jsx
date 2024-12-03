import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Logout = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <span>Welcome, {username}!</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
