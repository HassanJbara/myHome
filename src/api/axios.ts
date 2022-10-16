import axios from "axios";

const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: process.env.VITE_APP_BACKEND_URL,
});

export default axiosAPI;
