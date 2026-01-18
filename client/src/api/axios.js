import axios from "axios";

// 1️⃣ Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3001", // backend base URL
});

// 2️⃣ Request interceptor → attach token automatically
api.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("userAuth"));
    const token = authData?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3️⃣ Response interceptor → auto logout on token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("userAuth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
