import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const AddTaskModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.due_date) {
      alert("All fields are required");
      return;
    }
    dispatch(addTask(taskData));
    setTaskData({ title: "", description: "", due_date: "" });
    closeModal(); // Close the modal after task is added
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
        
        {/* Task Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={taskData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
          <input
            type="date"
            name="due_date"
            value={taskData.due_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
          >
            Add Task
          </button>
        </form>
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="mt-4 text-red-500 hover:text-red-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
