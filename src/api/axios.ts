import axios from "axios";

export const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "https://aiham-backend.herokuapp.com/",
});

export const axiosWithAuth = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: "https://aiham-backend.herokuapp.com/",
});

// export const axiosMAPS = axios.create({
//   withCredentials: false,
//   timeout: 28000,
//   baseURL: "https://aiham-cors-proxy.herokuapp.com/",
// });
