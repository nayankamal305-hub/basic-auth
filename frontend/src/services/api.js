import axios from 'axios';

// Set up base URL for Render or Local
const API_URL = import.meta.env.VITE_API_URL || 'https://basic-auth-qzax.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
