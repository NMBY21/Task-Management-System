import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";

const UpdateTask = ({ task }) => {
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    due_date: task.due_date,
  });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task.id, updatedData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={updatedData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={updatedData.description}
        onChange={handleChange}
      />
      <select name="status" value={updatedData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        name="due_date"
        value={updatedData.due_date}
        onChange={handleChange}
      />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default UpdateTask;
