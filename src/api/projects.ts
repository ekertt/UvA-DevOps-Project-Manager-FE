import {Project} from '../models/Project';
import {CreateProject} from '../models/CreateProject';
import {UpdateProject} from '../models/UpdateProject';

const baseUrl = 'https://pk2kqkbu6l.execute-api.eu-west-1.amazonaws.com/prod';

export const getProjects = (token: string): Promise<Project[]> => {
  return fetch(`${baseUrl}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json() as Promise<Project[]>;
  });
};

export const getProjectById = (
  projectId: string,
  token: string
): Promise<Project> => {
  return fetch(`${baseUrl}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json() as Promise<Project>;
  });
};

export const createProject = async (
  project: CreateProject,
  token: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (
  project: UpdateProject,
  token: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects/${project.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
    }),
  });
};

export const deleteProject = async (
  projectId: string,
  token: string
): Promise<void> => {
  await fetch(`${baseUrl}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
