import axios from "axios";
import { apiLink } from "./api-link";

const api = axios.create({
  baseURL: apiLink(""),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
