import api from './api';

/**
 * Authentication service
 * Communicates with /api/auth endpoints
 */

// POST /api/auth/login
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // { success, message, data: { admin } }
};

// POST /api/auth/logout
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// GET /api/auth/me
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data; // { success, message, data: { admin } }
};
