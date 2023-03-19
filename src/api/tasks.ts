import axios, { AxiosResponse } from 'axios';
import { Task } from '../models/Task';

const baseUrl = '<<API_URL>>';

export const getTasksForProject = async (
  projectId: number
): Promise<Task[]> => {
  const response: AxiosResponse<Task[]> = await axios.get(
    `${baseUrl}/projects/${projectId}/tasks`
  );
  return response.data;
};

export const createTask = async (
  projectId: number,
  task: Task
): Promise<Task> => {
  const response: AxiosResponse<Task> = await axios.post(
    `${baseUrl}/projects/${projectId}/tasks`,
    task
  );
  return response.data;
};

export const updateTask = async (taskId: number, task: Task): Promise<Task> => {
  const response: AxiosResponse<Task> = await axios.put(
    `${baseUrl}/tasks/${taskId}`,
    task
  );
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${baseUrl}/tasks/${taskId}`);
};
