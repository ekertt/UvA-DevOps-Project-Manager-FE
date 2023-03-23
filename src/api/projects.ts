/**
 * A module that exports functions for interacting with the API using HTTP requests to manage projects.
 */
import { ProjectModel } from '../models/project-model';
import { CreateProjectModel } from '../models/create-project-model';
import { UpdateProjectModel } from '../models/update-project-model';

const baseUrl = process.env.REACT_APP_API_URL!;

/**
 * Makes a GET request to retrieve all projects.
 *
 * @param {string} token - The authorization token.
 * @returns {Promise<ProjectModel[]>} - A Promise that resolves to an array of ProjectModel objects.
 */
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

/**
 * Makes a GET request to retrieve a single project by its ID.
 *
 * @param {string} projectId - The ID of the project to retrieve.
 * @param {string} token - The authorization token.
 * @returns {Promise<ProjectModel>} - A Promise that resolves to a ProjectModel object.
 */
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

/**
 * Makes a POST request to create a new project.
 *
 * @param {CreateProjectModel} project - The project to create.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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

/**
 * Makes a PUT request to update an existing project.
 *
 * @param {UpdateProjectModel} project - The project to update.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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

/**
 * Makes a DELETE request to delete an existing project.
 *
 * @param {string} projectId - The ID of the project to delete.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
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
