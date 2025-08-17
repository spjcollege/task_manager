import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";  // Context for Dark/Light mode
import useLocalStorage from "./hooks/useLocalStorage"; // Custom hook for data persistence

export default function App() {
  // Access theme state (light/dark) and toggle function from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Store teams and tasks in localStorage so they persist after refresh
  const [teams, setTeams] = useLocalStorage("teams", []);
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Local states for form inputs
  const [teamName, setTeamName] = React.useState("");
  const [teamMembers, setTeamMembers] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [selectedTeam, setSelectedTeam] = React.useState("");

  // Add a new team with members
  const handleAddTeam = () => {
    if (!teamName.trim() || !teamMembers.trim()) return;
    const membersArray = teamMembers.split(",").map((m) => m.trim()); // split members by comma
    setTeams([...teams, { name: teamName, members: membersArray }]);
    setTeamName("");     // reset input
    setTeamMembers("");  // reset input
  };

  // Add a new task assigned to a selected team
  const handleAddTask = () => {
    if (!taskName.trim() || !selectedTeam) return;
    const team = teams.find((t) => t.name === selectedTeam); // find selected team
    setTasks([...tasks, { task: taskName, team }]);
    setTaskName("");      // reset input
    setSelectedTeam("");  // reset dropdown
  };

  return (
    // Overall App Container with gradient + dark mode support
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-700">
      
      {/* HEADER: Title + Theme Toggle Switch */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* App Title */}
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow-md transition-colors duration-700">
          🌟 Collaboration App
        </h1>

        {/* Dark/Light Mode Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"}   // checkbox tracks theme
            onChange={toggleTheme}       // toggle on change
            className="sr-only peer"
          />
          {/* Toggle UI: sliding circle */}
          <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 dark:peer-focus:ring-yellow-400 rounded-full peer dark:bg-gray-600 transition-colors duration-700
              peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:duration-500 dark:after:bg-yellow-400" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-700">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </label>
      </div>

      {/* MAIN SECTION: Forms to Add Teams and Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto px-6 mt-6">
        
        {/* FORM 1: Add Team */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            ➕ Add Team
          </h2>
          {/* Team Name Input */}
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors duration-700"
          />
          {/* Members Input */}
          <input
            type="text"
            placeholder="Members (comma separated)"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors duration-700"
          />
          {/* Add Team Button */}
          <button
            onClick={handleAddTeam}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-700"
          >
            Add Team
          </button>
        </div>

        {/* FORM 2: Add Task */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-colors duration-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            📝 Add Task
          </h2>
          {/* Task Name Input */}
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors duration-700"
          />
          {/* Select Team Dropdown */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full mb-3 bg-white dark:bg-gray-700 dark:text-white transition-colors duration-700"
          >
            <option value="">Select Team</option>
            {teams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          {/* Add Task Button */}
          <button
            onClick={handleAddTask}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-700"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* TASK LIST SECTION */}
      <div className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto transition-colors duration-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          📌 Task List
        </h2>
        
        {/* If no tasks yet */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No tasks added yet.
          </p>
        ) : (
          /* Show all tasks with team + members */
          <div className="space-y-4">
            {tasks.map((t, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition-colors duration-700"
              >
                <p className="font-bold text-lg text-gray-700 dark:text-gray-100">
                  {t.task}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Team: {t.team.name}
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
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
