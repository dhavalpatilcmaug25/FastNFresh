import axios from "axios";
import { getToken } from "./TokenService";

const API_URL = "http://localhost:3000/cart";

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Get user's cart items
export async function getUserCart(userId) {
  return axios.get(`${API_URL}/${userId}`, {
    headers: authHeaders(),
  });
}

// Add item to cart
export async function addToCart(data) {
  const body = { ...data };

  if (!body.user_id) {
    try {
      const token = getToken();
      if (token) {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          body.user_id =
            payload.userId || payload.user_id || payload.id || payload._id;
        }
      }
    } catch (e) {
      console.warn("Failed to decode token for user_id", e);
    }
  }

  return axios.post(API_URL, body, {
    headers: authHeaders(),
  });
}

// Update cart item quantity
export async function updateCartItem(id, data) {
  return axios.put(`${API_URL}/${id}`, data, { headers: authHeaders() });
}

//Delete a single cart item
export async function deleteCartItem(id) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: authHeaders(),
  });
}

//Clear the entire cart for a user
export async function clearCart(userId) {
  return axios.delete(`${API_URL}/clear/${userId}`, {
    headers: authHeaders(),
  });
}

// Get total cart count
export async function getCartCount(userId) {
  return axios.get(`${API_URL}/count/${userId}`, {
    headers: authHeaders(),
  });
}
