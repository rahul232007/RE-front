import api from './api';

/**
 * Health check service
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
