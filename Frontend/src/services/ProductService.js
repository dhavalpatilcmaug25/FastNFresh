import axios from "axios";
import { getToken } from "./TokenService";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function addProduct(data) {
  return axios.post("http://localhost:3000/products", data, {
    headers: authHeaders(),
  });
}

export async function getAllProduct() {
  return axios.get("http://localhost:3000/products");
}

export async function deleteProduct(id) {
  return axios.delete(`http://localhost:3000/products/${id}`, {
    headers: authHeaders(),
  });
}

export async function getProductById(id) {
  return axios.get(`http://localhost:3000/products/${id}`, {
    headers: authHeaders(),
  });
}

export async function updateProduct(id, data) {
  return axios.put(`http://localhost:3000/products/${id}`, data, {
    headers: authHeaders(),
  });
}
