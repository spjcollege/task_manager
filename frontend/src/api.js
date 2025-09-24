const API_BASE = 'http://localhost:5000/api';  // Change port if needed

// Teams APIs
export async function fetchTeams() {
  const response = await fetch(`${API_BASE}/teams`);
  return response.json();
}

export async function createTeam(team) {
  const response = await fetch(`${API_BASE}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
  return response.json();
}

export async function updateTeam(id, data) {
  const response = await fetch(`${API_BASE}/teams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTeam(id) {
  const response = await fetch(`${API_BASE}/teams/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

// Tasks APIs
export async function fetchTasks() {
  const response = await fetch(`${API_BASE}/tasks`);
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id, data) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
