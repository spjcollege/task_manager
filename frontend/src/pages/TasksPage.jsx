import React from "react";
import TasksTable from "../TasksTable.jsx";

export default function TasksPage({ tasks, setTasks, teams }) {
  return <TasksTable tasks={tasks} setTasks={setTasks} teams={teams} />;
}
