import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import TeamForm from "./TeamForm";
import TaskForm from "./TaskForm";
import TeamsList from "./TeamsList";
import TasksTable from "./TasksTable";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [teams, setTeams] = useLocalStorage("teams", []);
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleAddTeam = () => {
    if (!teamName.trim() || !teamMembers.trim()) return;
    const membersArray = teamMembers.split(",").map((m) => m.trim());
    setTeams([...teams, { name: teamName, members: membersArray, newMember: "" }]);
    setTeamName("");
    setTeamMembers("");
  };

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { task: taskName, team: null, done: false }]);
    setTaskName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700">
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
          <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 dark:peer-focus:ring-yellow-400 rounded-full peer dark:bg-gray-600 transition-colors duration-700
            peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:duration-500 dark:after:bg-yellow-400" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-700">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto px-6 mt-6">
        <TeamForm
          teamName={teamName}
          setTeamName={setTeamName}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          onAddTeam={handleAddTeam}
        />

        <TaskForm taskName={taskName} setTaskName={setTaskName} onAddTask={handleAddTask} />
      </div>

      <TasksTable tasks={tasks} setTasks={setTasks} teams={teams} />

      <TeamsList teams={teams} setTeams={setTeams} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
