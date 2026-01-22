import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function RegisterUser(formData) {
  if (formData.role === "admin") {
    return axios.post(`${BASE_URL}/admins`, formData);
  } else {
    return axios.post(`${BASE_URL}/customers`, formData);
  }
}

export async function LoginUser(formData) {
  return axios.post(`${BASE_URL}/login`, formData);
}

import { removeToken } from "./TokenService";
import { removeRole } from "./RoleService";

export function logout() {
  try {
    removeToken();
    removeRole();
  } catch (e) {
    // ignore
  }
}
