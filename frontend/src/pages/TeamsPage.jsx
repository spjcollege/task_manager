import React from "react";
import TeamsList from "../TeamsList.jsx";

export default function TeamsPage({ teams, setTeams, tasks, setTasks }) {
  return <TeamsList teams={teams} setTeams={setTeams} tasks={tasks} setTasks={setTasks} />;
}
