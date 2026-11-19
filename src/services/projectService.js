import api from './api';

/**
 * Project service
 * Communicates with /api/projects endpoints
 */

// GET /api/projects
export const getProjects = async (params = {}) => {
  const response = await api.get('/projects', { params });
  return response.data; // { success, message, data: { projects, pagination } }
};

// GET /api/projects/:slug
export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data; // { success, message, data: { project } }
};

// POST /api/projects  — Admin only
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

// PUT /api/projects/:id  — Admin only
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

// DELETE /api/projects/:id  — Admin only
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};
