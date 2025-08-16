import React, { useState } from "react";

export default function App() {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Form states
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [taskName, setTaskName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  // Add team
  const handleAddTeam = () => {
    if (!teamName.trim() || !teamMembers.trim()) return;
    const membersArray = teamMembers.split(",").map(m => m.trim());
    setTeams([...teams, { name: teamName, members: membersArray }]);
    setTeamName("");
    setTeamMembers("");
  };

  // Add task
  const handleAddTask = () => {
    if (!taskName.trim() || !selectedTeam) return;
    const team = teams.find(t => t.name === selectedTeam);
    setTasks([...tasks, { task: taskName, team }]);
    setTaskName("");
    setSelectedTeam("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Collaboration App</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {/* Add Team */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Team</h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-3"
          />
          <input
            type="text"
            placeholder="Members (comma separated)"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-3"
          />
          <button
            onClick={handleAddTeam}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            Add Team
          </button>
        </div>

        {/* Add Task */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-3"
          />
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full mb-3"
          >
            <option value="">Select Team</option>
            {teams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white mt-10 p-6 rounded-2xl shadow-lg w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((t, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-lg text-gray-700">{t.task}</p>
                <p className="text-sm text-gray-600 mb-2">Team: {t.team.name}</p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {t.team.members.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
