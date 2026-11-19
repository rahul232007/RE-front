import api from './api';

/**
 * Contact service
 * Communicates with /api/contact endpoints
 */

// POST /api/contact  — Public (contact form submission)
export const submitContact = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data; // { success, message, data: { contact } }
};

// GET /api/contact  — Admin only
export const getContacts = async (params = {}) => {
  const response = await api.get('/contact', { params });
  return response.data; // { success, message, data: { contacts, pagination } }
};

// PATCH /api/contact/:id/status  — Admin only
export const updateContactStatus = async (id, status) => {
  const response = await api.patch(`/contact/${id}/status`, { status });
  return response.data;
};

// DELETE /api/contact/:id  — Admin only
export const deleteContact = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};
