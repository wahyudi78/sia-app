import api from "./api";
const resource = "/v1/users";

export const allGuru = () => api.get(resource);

export const Guru = (id) => api.get(resource + "/" + id);

export const createGuru = (guru) => api.post(resource, guru);

export const updateGuru = (id, guru) => api.put(resource + "/" + id, guru);

export const deleteGuru = (id) => api.delete(resource + "/" + id);
