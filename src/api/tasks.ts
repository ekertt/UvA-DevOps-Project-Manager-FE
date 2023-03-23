/**
 * A module that exports functions for interacting with the API using HTTP requests to manage tasks within projects.
 */
import { CreateTask, TaskModel } from '../models/task-model';

const baseUrl = process.env.REACT_APP_API_URL!;

/**
 * Makes a GET request to retrieve all tasks for a project.
 *
 * @param {string} projectId - The ID of the project.
 * @param {string} token - The authorization token.
 * @returns {Promise<TaskModel[]>} - A Promise that resolves to an array of TaskModel objects.
 */
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

/**
 * Makes a POST request to create a new task for a project.
 *
 * @param {string} projectId - The ID of the project.
 * @param {CreateTask} task - The task to create.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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

/**
 * Makes a PUT request to update an existing task for a project.
 *
 * @param {TaskModel} task - The task to update.
 * @param {string} token - The authorization token.
 * @param {string} projectId - The ID of the project.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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

/**
 * Makes a DELETE request to delete an existing task for a project.
 *
 * @param {string} taskId - The ID of the task to delete.
 * @param {string} token - The authorization token.
 * @param {string} projectId - The ID of the project.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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
