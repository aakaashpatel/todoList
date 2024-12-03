import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../redux/taskSlice";
import userReducer from "../redux/userSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
});

export default store;
