import axios from "axios";

export const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "http://127.0.0.1:8000/",
});

export const axiosWithAuth = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "http://127.0.0.1:8000/users/",
});

// export const axiosMAPS = axios.create({
//   withCredentials: false,
//   timeout: 28000,
//   baseURL: "https://aiham-cors-proxy.herokuapp.com/",
// });
