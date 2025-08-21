import { useTaskContext } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, teams } = useTaskContext();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const team = teams.find(t => t.id === task.teamId);
            return (
              <li key={task.id} className="p-2 border-b border-gray-300 dark:border-gray-700">
                <span className={task.done ? "line-through" : ""}>{task.title}</span>
                {team && (
                  <span className="ml-2 text-sm text-gray-500">({team.name})</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
