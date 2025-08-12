// App.jsx
import React, { useRef } from "react";

export default function App() {
  const taskInputRef = useRef(null);
  const memberInputRef = useRef(null);
  const taskListRef = useRef(null);
  const memberListRef = useRef(null);

  function addTask(e) {
    e.preventDefault();
    const value = taskInputRef.current.value.trim();
    if (value !== "") {
      const li = document.createElement("li");
      li.textContent = value;
      taskListRef.current.appendChild(li);
      taskInputRef.current.value = "";
    }
  }

  function addMember(e) {
    e.preventDefault();
    const value = memberInputRef.current.value.trim();
    if (value !== "") {
      const li = document.createElement("li");
      li.textContent = value;
      memberListRef.current.appendChild(li);
      memberInputRef.current.value = "";
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Collaboration App</h1>
        <p className="text-gray-600">Manage tasks & collaborate with your team</p>
      </header>

      {/* Task Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Task Board</h2>
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            ref={taskInputRef}
            placeholder="Enter a new task"
            className="border p-2 flex-grow rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>
        <ul ref={taskListRef} className="list-disc pl-6"></ul>
      </section>

      {/* Team Members Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Team Members</h2>
        <form onSubmit={addMember} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            ref={memberInputRef}
            placeholder="Enter member name"
            className="border p-2 flex-grow rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Member
          </button>
        </form>
        <ul ref={memberListRef} className="list-disc pl-6"></ul>
      </section>

      <footer className="text-gray-500 text-sm mt-8">
        © 2025 Collaboration App
      </footer>
    </div>
  );
}
