import axios from "axios";
import { getToken } from "./TokenService";
const API_URL = "http://localhost:3000/category";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCategory() {
  return axios.get(API_URL);
}

export async function addCategory(data) {
  return axios.post(API_URL, data, {
    headers: authHeaders(),
  });
}

export async function deleteCategory(id) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
}

export async function getCategoryById(id) {
  return axios.get(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
}

export async function updateCategory(id, data) {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: authHeaders(),
  });
}
