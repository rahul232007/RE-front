import { useState, useEffect, useCallback } from 'react';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../services/projectService';

/**
 * Hook for fetching the projects list with filtering and pagination.
 */
export const useProjects = (initialParams = {}) => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects(params);
      setProjects(res.data.projects);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, pagination, loading, error, setParams, refetch: fetchProjects };
};

/**
 * Hook for fetching a single project by slug.
 */
export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getProjectBySlug(slug)
      .then((res) => setProject(res.data.project))
      .catch((err) => setError(err.message || 'Project not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  return { project, loading, error };
};

/**
 * Hook for admin CRUD operations on projects.
 */
export const useProjectAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      return await createProject(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      return await updateProject(id, data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await deleteProject(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
};
