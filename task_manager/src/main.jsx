import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./ThemeContext";
import { TaskProvider } from "./context/TaskContext";

import ThemeToggle from "./components/ThemeToggle";
import TeamForm from "./components/TeamForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
          <ThemeToggle />
          <TeamForm />
          <TaskForm />
          <TaskList />
        </div>
      </TaskProvider>
    </ThemeProvider>
  </React.StrictMode>
);
