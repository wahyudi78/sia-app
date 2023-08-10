import api from "./api";

const resource = "/v1/mapel";

export const allMapel = () => api.get(resource);

export const createMapel = (mapel) => api.post(resource, mapel);

export const updateMapel = (id, mapel) => api.put(resource + mapel, mapel);

export const deleteMapel = (id) => api.delete(resource + id);
