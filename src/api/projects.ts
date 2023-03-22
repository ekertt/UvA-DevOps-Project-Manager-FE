import { ProjectModel } from '../models/project-model';
import { CreateProjectModel } from '../models/create-project-model';
import { UpdateProjectModel } from '../models/update-project-model';

const baseUrl = process.env.REACT_APP_API_URL!;

export const getProjects = (token: string): Promise<ProjectModel[]> => {
  return fetch(`${baseUrl}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json() as Promise<ProjectModel[]>;
  });
};

export const getProjectById = (
  projectId: string,
  token: string
): Promise<ProjectModel> => {
  return fetch(`${baseUrl}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json() as Promise<ProjectModel>;
  });
};

export const createProject = async (
  project: CreateProjectModel,
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
  project: UpdateProjectModel,
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
