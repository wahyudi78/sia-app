import api from "./api";

const resource = "/v1/nilai";

export const allNilai = () => api.get(resource);

export const createNilai = (nilai) => api.post(resource, nilai);

export const updateNilai = (id, nilai) => api.put(resource + nilai, nilai);

export const deleteNilai = (id) => api.delete(resource + id);
