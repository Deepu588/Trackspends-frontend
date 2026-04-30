// Api.js
import axios from "axios";
import { AUTHENTICATION_REFRESH_CREATE } from "./api-routes";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




export default api;