import api from "./api";

const resource = "/v1/mapel";

export const allMapel = () => api.get(resource);

export const Mapel = (id) => api.get(resource + "/" + id);

export const createMapel = (mapel) => api.post(resource, mapel);

export const updateMapel = (id, mapel) => api.put(resource + "/" + id, mapel);

export const deleteMapel = (id) => api.delete(resource + "/" + id);
