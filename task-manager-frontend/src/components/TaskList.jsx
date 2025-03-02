import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../redux/taskSlice"; // Assume updateTask action is available
import TaskFilters from "./TaskFilters";
import AddTaskModal from "./AddTaskModal"; // Import the AddTaskModal component


const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState(null); // State to hold task being edited
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const openModal = () => {
    setIsModalOpen(true); // Opens the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Closes the modal
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id); // Set the task being edited
    setTaskData({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
    });
  };

  const handleEditChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: editingTask, ...taskData }));
    setEditingTask(null); // Close the editing mode
    setTaskData({ title: "", description: "", due_date: "" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null); // Close the editing mode
    setTaskData({ title: "", description: "", due_date: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Add Task
        </button>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Task List</h2>
      <TaskFilters />
      {loading && <p className="text-blue-500 text-center">Loading tasks...</p>}
      <ul className="space-y-4 mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <strong className="text-lg text-gray-800">{task.title}</strong>
              <p className="text-gray-600">
                {task.status} (Due: {task.due_date})
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEditClick(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Edit Task</h3>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
              <input
                type="date"
                name="due_date"
                value={taskData.due_date}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Component */}
      {isModalOpen && <AddTaskModal closeModal={closeModal} />}
    </div>
  );
};

export default TaskList;
