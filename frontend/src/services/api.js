import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const TOKEN_KEY = "orderpro_token";

// Base Axios instance
export const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Request interceptor to add JWT token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper functions for auth token management
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Backend health check function
export const isBackendUp = async () => {
  try {
    const res = await http.get("/health");
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

// Auth API helper endpoints
export const authApi = {
  login: (credentials) => http.post("/auth/login", credentials),
  register: (userData) => http.post("/auth/register", userData),
  getProfile: () => http.get("/profile"),
};

// Order API helper endpoints
export const orderApi = {
  getOrders: () => http.get("/order"),
  createOrder: (data) => http.post("/order", data),
  getOrderById: (id) => http.get(`/order/${id}`),
};

// Cart API helper endpoints
export const cartApi = {
  getCart: () => http.get("/cart"),
  addToCart: (item) => http.post("/cart", item),
  removeFromCart: (itemId) => http.delete(`/cart/${itemId}`),
  clearCart: () => http.delete("/cart"),
};

export default http;