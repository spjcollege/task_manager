import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
import TeamForm from "./TeamForm.jsx";
import TaskForm from "./TaskForm.jsx";
import TeamsList from "./TeamsList.jsx";
import TasksTable from "./TasksTable.jsx";

import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api.js";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setTeams(await fetchTeams());
        setTasks(await fetchTasks());
      } catch (err) {
        setError("Failed to load data.");
      }
    }
    loadData();
  }, []);

  async function handleAddTeam() {
    if (!teamName.trim() || !teamMembers.trim()) {
      setError("Please enter both team name and members.");
      return;
    }
    try {
      const membersArray = teamMembers.split(",").map((m) => m.trim()).filter(Boolean);
      const newTeam = await createTeam({ name: teamName, members: membersArray });
      setTeams([...teams, newTeam]);
      setTeamName("");
      setTeamMembers("");
      setError(null);
    } catch (err) {
      setError("Failed to add team.");
    }
  }

  async function handleUpdateTeam(updatedTeam) {
    try {
      const savedTeam = await updateTeam(updatedTeam._id, updatedTeam);
      setTeams(teams.map(t => t._id === savedTeam._id ? savedTeam : t));
      setError(null);
    } catch {
      setError("Failed to update team.");
    }
  }

  async function handleDeleteTeam(id) {
    try {
      await deleteTeam(id);
      setTeams(teams.filter(t => t._id !== id));
      setError(null);
    } catch {
      setError("Failed to delete team.");
    }
  }

  async function handleAddTask() {
    if (!taskName.trim()) {
      setError("Please enter a task name.");
      return;
    }
    try {
      const newTask = await createTask({ task: taskName, done: false, team: null });
      setTasks([...tasks, newTask]);
      setTaskName("");
      setError(null);
    } catch {
      setError("Failed to add task.");
    }
  }

  async function handleUpdateTask(updatedTask) {
    try {
      const savedTask = await updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map(t => t._id === savedTask._id ? savedTask : t));
      setError(null);
    } catch {
      setError("Failed to update task.");
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch {
      setError("Failed to delete task.");
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-700`}>
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

      {error && (
        <div className="max-w-2xl mx-auto my-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto px-6 mt-6">
        <TeamForm
          teamName={teamName}
          setTeamName={setTeamName}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          onAddTeam={handleAddTeam}
        />
        <TaskForm
          taskName={taskName}
          setTaskName={setTaskName}
          onAddTask={handleAddTask}
        />
      </div>

      <TasksTable
        tasks={tasks}
        setTasks={setTasks}
        teams={teams}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      <TeamsList
        teams={teams}
        setTeams={setTeams}
        tasks={tasks}
        setTasks={setTasks}
        onUpdateTeam={handleUpdateTeam}
        onDeleteTeam={handleDeleteTeam}
      />
    </div>
  );
}
