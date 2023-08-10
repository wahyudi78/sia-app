import api from "./api";
const resource = "/v1/users";

export const allGuru = () => api.get(resource);

export const createGuru = (guru) => api.post(resource, guru);

export const updateGuru = (id, guru) => api.put(resource + guru, guru);

export const deleteGuru = (id) => api.delete(resource + id);
