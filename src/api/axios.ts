import axios from "axios";

const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "http://127.0.0.1:8000/",
});

export default axiosAPI;
