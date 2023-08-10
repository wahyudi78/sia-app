import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  baseURL: "http://localhost:8000/api/",
});

export default api;
