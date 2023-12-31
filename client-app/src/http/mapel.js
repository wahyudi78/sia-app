import api from "./api";
import axios from "axios";

const resource = "/v1/mapel";

axios.interceptors.request.use(function (config) {
  let token = JSON.parse(window.sessionStorage.getItem("token"));
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export const allMapel = () => api.get(resource);

export const Mapel = (id) => api.get(resource + "/" + id);

export const createMapel = (mapel) => api.post(resource, mapel);

export const updateMapel = (id, mapel) => api.put(resource + "/" + id, mapel);

export const deleteMapel = (id) => api.delete(resource + "/" + id);
