import { useState, useEffect, useCallback } from 'react';
import { getContacts, updateContactStatus, deleteContact } from '../services/contactService';

/**
 * Hook for admin contact management.
 */
export const useContacts = (initialParams = {}) => {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getContacts(params);
      setContacts(res.data.contacts);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const changeStatus = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      // Update locally for instant UI feedback
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
    } catch (err) {
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setPagination((prev) => prev ? { ...prev, total: prev.total - 1 } : prev);
    } catch (err) {
      throw err;
    }
  };

  return {
    contacts,
    pagination,
    loading,
    error,
    setParams,
    refetch: fetchContacts,
    changeStatus,
    remove,
  };
};
