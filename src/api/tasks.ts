import { Task } from '../models/Task';
import { CreateTask } from '../models/Task';

const baseUrl = 'https://tic2b5chf5.execute-api.eu-west-1.amazonaws.com/prod';

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
  const tasks = (await response.json()) as Task[];
  return tasks;
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

export const updateTask = async (taskId: number, task: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task with id ${taskId}`);
  }
  const updatedTask = (await response.json()) as Task;
  return updatedTask;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task with id ${taskId}`);
  }
};
