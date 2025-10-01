import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle specific errors
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 500) {
      console.error("Server error - please try again later");
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const menuAPI = {
  getAll: () => api.get('/menus'),
  getById: (id) => api.get(`/menus/${id}`),
};

export const reservationAPI = {
  getAll: () => api.get('/reservations'),
  create: (data) => api.post('/reservations', data),
  getMyReservations: () => api.get('/my-reservations'),
};

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  getProfile: () => api.get('/user'),
};

export const tableAPI = {
  getAvailable: () => api.get('/tables/available'),
};

export default api;