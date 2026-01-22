import axios from "axios";
import { getToken } from "./TokenService";

export async function getCategory() {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return axios.get("http://localhost:3000/category", { headers });
}
