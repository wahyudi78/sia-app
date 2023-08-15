import api from "./api";

const resource = "/v1/absensi";

export const allAbsensi = () => api.get(resource);

export const Absensi = (id) => api.get(resource + "/" + id);

export const createAbsensi = (absensi) => api.post(resource, absensi);

export const updateAbsensi = (id, absensi) => api.put(resource + "/" + id, absensi);

export const deleteAbsensi = (id) => api.delete(resource + "/" + id);
