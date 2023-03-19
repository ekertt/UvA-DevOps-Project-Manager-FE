import axios, { AxiosResponse } from 'axios';
import { Project } from '../models/Project';

const baseUrl = '<<API_URL>>';

export const getProjects = async (): Promise<Project[]> => {
  const response: AxiosResponse<Project[]> = await axios.get(
    `${baseUrl}/projects`
  );
  return response.data;
};

export const getProjectById = async (projectId: number): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.get(
    `${baseUrl}/projects/${projectId}`
  );
  return response.data;
};

export const createProject = async (project: Project): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.post(
    `${baseUrl}/projects`,
    project
  );
  return response.data;
};

export const updateProject = async (
  projectId: number,
  project: Project
): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.put(
    `${baseUrl}/projects/${projectId}`,
    project
  );
  return response.data;
};

export const deleteProject = async (projectId: number): Promise<void> => {
  await axios.delete(`${baseUrl}/projects/${projectId}`);
};
