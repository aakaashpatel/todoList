import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  username: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === "admin" && password === "password123") {
        state.isLoggedIn = true;
        state.username = username;
        state.error = null;
        localStorage.setItem("isLoggedIn", "true");
      } else {
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.error = null;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
