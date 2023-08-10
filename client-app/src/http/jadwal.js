import api from "./api";

const resource = "/v1/jadwal";

export const allJadwal = () => api.get(resource);

export const createJadwal = (jadwal) => api.post(resource, jadwal);

export const updateJadwal = (id, jadwal) => api.put(resource + jadwal, jadwal);

export const deleteJadwal = (id) => api.delete(resource + id);
