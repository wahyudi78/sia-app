import api from "./api";

const resource = "/v1/ruangan";

export const allRuangan = () => api.get(resource);

export const createRuangan = (ruangan) => api.post(resource, ruangan);

export const updateRuangan = (id, ruangan) => api.put(resource + ruangan, ruangan);

export const deleteRuangan = (id) => api.delete(resource + id);
