import React, { useState } from "react";

export default function TeamsList({ teams, onUpdateTeam, onDeleteTeam, tasks }) {
  const [newMembers, setNewMembers] = useState({});

  const handleDeleteMember = (teamId, member) => {
    const team = teams.find(t => t._id === teamId);
    if (!team) return;
    const updatedMembers = team.members.filter(m => m !== member);
    onUpdateTeam({ ...team, members: updatedMembers });
  };

  const handleAddMember = (teamId) => {
    const newMember = newMembers[teamId]?.trim();
    if (!newMember) return;
    const team = teams.find(t => t._id === teamId);
    if (!team) return;
    if (team.members.includes(newMember)) return;
    const updatedMembers = [...team.members, newMember];
    onUpdateTeam({ ...team, members: updatedMembers });
    setNewMembers({ ...newMembers, [teamId]: "" });
  };

  const handleNewMemberChange = (teamId, value) => {
    setNewMembers({ ...newMembers, [teamId]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg max-w-6xl mx-auto transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">👥 Teams List</h2>
      {teams.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No teams added yet.</p>
      ) : (
        <div className="space-y-6">
          {teams.map(team => (
            <div key={team._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{team.name}</h3>
                <button
                  onClick={() => onDeleteTeam(team._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  title="Delete Team"
                >
                  Delete Team
                </button>
              </div>
              <ul className="mb-3 list-disc list-inside text-gray-700 dark:text-gray-300">
                {team.members.map(member => (
                  <li key={member} className="flex justify-between items-center">
                    <span>{member}</span>
                    <button
                      onClick={() => handleDeleteMember(team._id, member)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Member"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add member"
                  value={newMembers[team._id] || ""}
                  onChange={(e) => handleNewMemberChange(team._id, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddMember(team._id); }}
                  className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={() => handleAddMember(team._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Add Member
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
