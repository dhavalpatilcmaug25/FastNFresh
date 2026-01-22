import axios from "axios";

export function login(formData) {
  return axios.post("http://localhost:3000/login", formData);
}
