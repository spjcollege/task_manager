import React from "react";

export default function TaskForm({ taskName, setTaskName, onAddTask }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📝 Add Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-700"
      />
      <button
        onClick={onAddTask}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-700"
      >
        Add Task
      </button>
    </div>
  );
}
