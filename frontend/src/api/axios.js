
import axios from "axios";

// const API = axios.create({
//   baseURL:  import.meta.env.VITE_API_URL, // your backend
// });
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,// ✅ this now points to your Render backend
  withCredentials: true,
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
