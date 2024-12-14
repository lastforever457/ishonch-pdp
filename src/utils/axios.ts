import axios from "axios";
import { apiLink } from "./api-link";

const api = axios.create({
  baseURL: apiLink(""),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("ishonch-token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
