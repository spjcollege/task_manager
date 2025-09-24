import React, { useState } from "react";
import TeamForm from "../TeamForm.jsx";
import TaskForm from "../TaskForm.jsx";

export default function Landing({ teams, setTeams, tasks, setTasks }) {
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
  );
}
