import api from "./api";

const resource = "/v1/jadwal";

export const allJadwal = () => api.get(resource);

export const Jadwal = (id) => api.get(resource + "/" + id);

export const createJadwal = (jadwal) => api.post(resource, jadwal);

export const updateJadwal = (id, jadwal) => api.put(resource + "/" + id, jadwal);

export const deleteJadwal = (id) => api.delete(resource + "/" + id);
