import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // backend root
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if present
API.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export const getCategories = () => API.get("/category");
export const getCategory = (id) => API.get(`/category/${id}`);
export const createCategory = (payload) => API.post("/category", payload);
export const updateCategory = (id, payload) =>
  API.put(`/category/${id}`, payload);
export const deleteCategory = (id) => API.delete(`/category/${id}`);

export const getReviews = () => API.get("/reviews");
export const getReview = (id) => API.get(`/reviews/${id}`);
export const createReview = (payload) => API.post("/reviews", payload);
export const updateReview = (id, payload) => API.put(`/reviews/${id}`, payload);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

export default API;
