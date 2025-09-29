import axios from "axios";

const api = axios.create({
  baseURL: "https://pitychick-production.up.railway.app/api",
  withCredentials: false, // Change to false dulu
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Set Authorization header otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;