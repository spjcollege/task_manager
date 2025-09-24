import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [teams, setTeams] = useLocalStorage("teams", []);
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [teamName, setTeamName] = React.useState("");
  const [teamMembers, setTeamMembers] = React.useState("");
  const [taskName, setTaskName] = React.useState("");

  // Add new team
  const handleAddTeam = () => {
    if (!teamName.trim() || !teamMembers.trim()) return;
    const membersArray = teamMembers.split(",").map((m) => m.trim());
    setTeams([...teams, { name: teamName, members: membersArray }]);
    setTeamName("");
    setTeamMembers("");
  };

  // Add new task
  const handleAddTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { task: taskName, team: null, done: false }]);
    setTaskName("");
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // Toggle done/undone
  const handleToggleDone = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
  };

  // Assign/reassign team from dropdown
  const handleAssignTeam = (index, newTeamName) => {
    const newTeam = teams.find((t) => t.name === newTeamName);
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, team: newTeam } : t
    );
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow-md transition-colors duration-700">
          🌟 Collaboration App
        </h1>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 dark:peer-focus:ring-yellow-400 rounded-full peer dark:bg-gray-600 transition-colors duration-700 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:duration-500 dark:after:bg-yellow-400" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-700">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </label>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto px-6 mt-6">
        {/* Add Team */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            ➕ Add Team
          </h2>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-700"
          />
          <input
            type="text"
            placeholder="Members (comma separated)"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-700"
          />
          <button
            onClick={handleAddTeam}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-700"
          >
            Add Team
          </button>
        </div>

        {/* Add Task */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            📝 Add Task
          </h2>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-700"
          />
          <button
            onClick={handleAddTask}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-700"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto transition-colors duration-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          📌 Task List
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No tasks added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Task</th>
                  <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
                  <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Team</th>
                  <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Assign/Reassign Team</th>
                  <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <td className="px-4 py-2 font-bold">
                      <span className={t.done ? "line-through text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-100"}>
                        {t.task}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{t.done ? "Done" : "Pending"}</td>
                    <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                      {t.team ? (
                        <>
                          <div className="font-semibold">{t.team.name}</div>
                          <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-300">
                            {t.team.members.map((member, i) => (
                              <li key={i}>{member}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <span className="italic text-gray-400">No Team</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={t.team ? t.team.name : ""}
                        onChange={(e) => handleAssignTeam(index, e.target.value)}
                        className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      >
                        <option value="">Assign Team</option>
                        {teams.map((team, i) => (
                          <option key={i} value={team.name}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleToggleDone(index)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        {t.done ? "Undo" : "Mark Done"}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
