import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";

const TaskFilters = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const handleFilterChange = () => {
    dispatch(fetchTasks({ status, sort }));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort Filter */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Sort by Due Date</option>
        <option value="asc">Oldest First</option>
        <option value="desc">Newest First</option>
      </select>

      {/* Apply Filters Button */}
      <button
        onClick={handleFilterChange}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default TaskFilters;
