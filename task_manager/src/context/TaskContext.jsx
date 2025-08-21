import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [teams, setTeams] = useLocalStorage("teams", []);
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Add team
  const addTeam = (name, members) => {
    setTeams([...teams, { id: Date.now(), name, members }]);
  };

  // Add task
  const addTask = (title, teamId) => {
    setTasks([...tasks, { id: Date.now(), title, teamId, done: false }]);
  };

  return (
    <TaskContext.Provider value={{ teams, tasks, addTeam, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
