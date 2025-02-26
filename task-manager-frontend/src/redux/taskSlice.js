import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks";

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
});

// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }) => {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedData);
    return response.data;
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
