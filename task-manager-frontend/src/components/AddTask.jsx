import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.due_date) {
      setError("All fields are required");
      return;
    }
    dispatch(addTask(taskData));
    setTaskData({ title: "", description: "", due_date: "" });
    setError("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Task</h2>
      
      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description Textarea */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>

        {/* Due Date Input */}
        <input
          type="date"
          name="due_date"
          value={taskData.due_date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Add Task Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
