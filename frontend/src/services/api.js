import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-request': 'true',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service functions
export const authService = {
  login: (credentials) => api.post('/signin', credentials),
  register: (userData) => api.post('/signup', userData),
  getUserProfile: (userId) => api.get(`/users/profile/${userId}`),
};

export const problemService = {
  getAllProblems: () => api.get('/problems'),
  getProblemBySlug: (slug) => api.get(`/problems/slug/${slug}`),
  getProblemById: (id) => api.get(`/problems/${id}`),
};

export const submissionService = {
  submitCode: (submissionData) => api.post('/submissions', submissionData),
  getSubmissionResult: (token) => api.get(`/submissions/${token}`),
};

export default api;