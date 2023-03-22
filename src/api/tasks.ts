import { CreateTask, TaskModel } from '../models/task-model';

const baseUrl = process.env.REACT_APP_API_URL!;

export const getTasksForProject = async (
  projectId: string,
  token: string
): Promise<TaskModel[]> => {
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
  return (await response.json()) as TaskModel[];
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
  task: TaskModel,
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
