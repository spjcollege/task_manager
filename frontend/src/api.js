const API_BASE = 'http://localhost:5000/api';

export async function fetchTeams() {
  try {
    const response = await fetch(`${API_BASE}/teams`);
    if (!response.ok) throw new Error("Failed to fetch teams");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function createTeam(team) {
  const response = await fetch(`${API_BASE}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
  if (!response.ok) throw new Error("Failed to create team");
  return await response.json();
}

export async function updateTeam(id, data) {
  const response = await fetch(`${API_BASE}/teams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update team");
  return await response.json();
}

export async function deleteTeam(id) {
  const response = await fetch(`${API_BASE}/teams/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error("Failed to delete team");
  return await response.json();
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return await response.json();
}

export async function updateTask(id, data) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return await response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return await response.json();
}
