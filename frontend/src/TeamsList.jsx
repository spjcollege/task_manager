import React from "react";

export default function TeamsList({ teams, setTeams, tasks, setTasks }) {
  const handleDeleteTeam = (tidx) => {
    setTeams(teams.filter((_, i) => i !== tidx));
    setTasks(tasks.map(t => (t.team?.name === teams[tidx].name ? { ...t, team: null } : t)));
  };

  const handleDeleteMember = (tidx, midx) => {
    const updatedMembers = teams[tidx].members.filter((_, i) => i !== midx);
    const updatedTeams = teams.map((t, i) =>
      i === tidx ? { ...t, members: updatedMembers } : t
    );
    setTeams(updatedTeams);
  };

  const handleAddMember = (tidx) => {
    const newMember = teams[tidx].newMember?.trim();
    if (!newMember) return;
    if(teams[tidx].members.includes(newMember)) return; // prevent duplicates
    const updatedMembers = [...teams[tidx].members, newMember];
    const updatedTeams = teams.map((t, i) =>
      i === tidx ? { ...t, members: updatedMembers, newMember: "" } : t
    );
    setTeams(updatedTeams);
  };

  const handleNewMemberChange = (tidx, value) => {
    const updatedTeams = teams.map((t, i) =>
      i === tidx ? { ...t, newMember: value } : t
    );
    setTeams(updatedTeams);
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">👥 Teams List</h2>
      {teams.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No teams added yet.</p>
      ) : (
        <div className="space-y-6">
          {teams.map((team, tidx) => (
            <div key={tidx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{team.name}</h3>
                <button
                  onClick={() => handleDeleteTeam(tidx)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  title="Delete Team"
                >
                  Delete Team
                </button>
              </div>
              <ul className="mb-3 list-disc list-inside text-gray-700 dark:text-gray-300">
                {team.members.map((member, midx) => (
                  <li key={midx} className="flex justify-between items-center">
                    <span>{member}</span>
                    <button
                      onClick={() => handleDeleteMember(tidx, midx)}
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
                  className="flex-grow border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={team.newMember || ""}
                  onChange={(e) => handleNewMemberChange(tidx, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddMember(tidx); }}
                />
                <button
                  onClick={() => handleAddMember(tidx)}
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
