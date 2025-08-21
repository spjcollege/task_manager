import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function TeamForm() {
  const { addTeam } = useTaskContext();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim() || !members.trim()) return;

    addTeam(teamName, members.split(",").map(m => m.trim()));
    setTeamName("");
    setMembers("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Add Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="border p-2 rounded w-full mb-2 text-black"
      />
      <input
        type="text"
        placeholder="Members (comma separated)"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        className="border p-2 rounded w-full mb-2 text-black"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add Team
      </button>
    </form>
  );
}
