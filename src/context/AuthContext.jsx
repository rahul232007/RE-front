import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, login as loginService, logout as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // Checking session on mount
  const [error, setError] = useState(null);

  // Verify existing session on app load
  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMe();
      setAdmin(res.data.admin);
    } catch {
      setAdmin(null); // Not logged in
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();

    // Listen for 401 events from axios interceptor
    const handleUnauthorized = () => {
      setAdmin(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [checkSession]);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await loginService(email, password);
      setAdmin(res.data.admin);
      return res;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        isAuthenticated: !!admin,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
