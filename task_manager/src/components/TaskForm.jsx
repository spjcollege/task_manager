import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function TaskForm() {
  const { teams, addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !teamId) return;

    addTask(title, teamId);
    setTitle("");
    setTeamId("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2 text-black"
      />
      <select
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="border p-2 rounded w-full mb-2 text-black"
      >
        <option value="">Select Team</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Add Task
      </button>
    </form>
  );
}
