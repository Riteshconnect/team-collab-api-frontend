import axios from "axios";

const API = axios.create({
baseURL:"https://team-collab-api-btlh.onrender.com/api"})

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;