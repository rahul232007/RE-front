import axios from 'axios';

// ─── AXIOS INSTANCE ───────────────────────────────────────────────────────────
// Base URL is sourced from environment variable — never hardcoded.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,          // Send HttpOnly cookies on every request
  timeout: 15000,                 // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Optionally attach a request timestamp for debugging
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    // Unwrap the data envelope so callers get response.data directly
    return response;
  },
  (error) => {
    const { response } = error;

    if (!response) {
      // Network error — no response received
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        isNetworkError: true,
      });
    }

    const { status, data } = response;

    // Session expired or unauthorised — redirect to login
    if (status === 401) {
      // Avoid redirect loop on the login page itself
      if (!window.location.pathname.includes('/admin/login')) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    // Normalise the error shape
    const normalised = {
      message: data?.message || 'Something went wrong',
      errors: data?.errors || [],
      status,
    };

    return Promise.reject(normalised);
  }
);

export default api;
