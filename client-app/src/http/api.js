import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const api = axios.create({
  headers: { Authorization: `Bearer ${!token ? JSON.parse(localStorage.getItem("token")) : token}` },
  baseURL: "http://localhost:8000/api/",
  // baseURL: "https://dev-code.my.id/webservice/public/api/",
});

export default api;
