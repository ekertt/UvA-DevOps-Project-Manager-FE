import {CreateTask, Task} from '../models/Task';

const baseUrl = 'https://pk2kqkbu6l.execute-api.eu-west-1.amazonaws.com/prod';

export const getTasksForProject = async (
  projectId: string,
  token: string
): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}/projects/${projectId}/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks for project with id ${projectId}`);
  }
  return (await response.json()) as Task[];
};

export const createTask = async (
  projectId: string,
  task: CreateTask,
  token: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

export const updateTask = async (
  task: Task,
  token: String,
  projectId: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects/${projectId}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (
  taskId: string,
  token: string,
  projectId: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
