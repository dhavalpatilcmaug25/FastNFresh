import axios from "axios";
import { getToken } from "./TokenService";

const API_URL = "http://localhost:3000/orders";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getOrders() {
  return axios.get(API_URL, {
    headers: authHeaders(),
  });
}

export async function getOrdersByUserId(userId) {
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: authHeaders(),
  });
}

export async function getOrderById(id) {
  return axios.get(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
}

export async function createOrder(data) {
  return axios.post(API_URL, data, {
    headers: authHeaders(),
  });
}

export async function updateOrderStatus(id, status) {
  return axios.put(
    `${API_URL}/${id}`,
    { status },
    {
      headers: authHeaders(),
    }
  );
}

export async function deleteOrder(id) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
}
