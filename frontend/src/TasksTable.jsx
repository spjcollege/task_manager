import React from "react";

export default function TasksTable({ tasks, teams, onUpdateTask, onDeleteTask }) {
  const handleToggleDone = (task) => {
    onUpdateTask({ ...task, done: !task.done });
  };

  const handleAssignTeam = (task, teamName) => {
    const newTeam = teams.find(t => t.name === teamName) || null;
    onUpdateTask({ ...task, team: newTeam ? newTeam._id : null });
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-10 p-6 rounded-2xl shadow-lg max-w-6xl mx-auto transition-colors duration-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📌 Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tasks added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm rounded-xl overflow-hidden">
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
              {tasks.map(task => (
                <tr key={task._id} className="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <td className="px-4 py-2 font-bold">
                    <span className={task.done ? "line-through text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-100"}>
                      {task.task}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">{task.done ? "Done" : "Pending"}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                    {task.team ? (
                      <>
                        <div className="font-semibold">{teams.find(t => t._id === task.team)?.name || ''}</div>
                        <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-300">
                          {teams.find(t => t._id === task.team)?.members.map((member, i) => (
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
                      value={task.team ? teams.find(t => t._id === task.team)?.name : ""}
                      onChange={e => handleAssignTeam(task, e.target.value)}
                      className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    >
                      <option value="">Assign Team</option>
                      {teams.map(team => (
                        <option key={team._id} value={team.name}>{team.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleToggleDone(task)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      {task.done ? "Undo" : "Mark Done"}
                    </button>
                    <button
                      onClick={() => onDeleteTask(task._id)}
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
  );
}
