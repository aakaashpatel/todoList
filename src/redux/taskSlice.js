import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load tasks from localStorage
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

// Save tasks to localStorage
const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let nextId = loadFromLocalStorage().length
  ? Math.max(...loadFromLocalStorage().map((t) => t.id)) + 1
  : 1;

// Async action to fetch weather
export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (taskId, { getState }) => {
    const state = getState();
    const task = state.tasks.items.find((t) => t.id === taskId);

    if (!task || task.type !== "outdoor") {
      return { taskId, weather: null };
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          task.location || "Delhi"
        }&units=metric&appid=fd349e68f481e6bc427a352a932423a9`
      );

      return {
        taskId,
        weather: {
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
        },
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return { taskId, weather: null };
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: loadFromLocalStorage(), weather: {} },
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        id: nextId++,
        ...action.payload,
        completed: false,
      });
      saveToLocalStorage(state.items);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    toggleTask: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToLocalStorage(state.items);
    },
    editTask: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload.id);
      if (task) task.text = action.payload.text;
      saveToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather[action.payload.taskId] = action.payload.weather;
    });
  },
});

export const { addTask, deleteTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
