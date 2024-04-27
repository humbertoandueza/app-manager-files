// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://ll6zw4n2-3000.use2.devtunnels.ms/v1/';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);



export default api;