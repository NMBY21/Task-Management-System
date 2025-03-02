import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import React from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";


const Home = () => {
  return (
    <div>
      <TaskList />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
