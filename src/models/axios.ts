import axios from "axios";

export const baseURL = "https://ishonch.koyeb.app";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
