import axios from "axios";

const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "https://aiham-backend.herokuapp.com/",
});

export default axiosAPI;
