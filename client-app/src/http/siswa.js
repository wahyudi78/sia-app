import api from "./api";
const resource = "/v1/users";

export const allSiswa = () => api.get(resource);

export const Siswa = (id) => api.get(resource + "/" + id);

export const createSiswa = (siswa) => api.post(resource, siswa);

export const updateSiswa = (id, siswa) => api.put(resource + "/" + id, siswa);

export const deleteSiswa = (id) => api.delete(resource + "/" + id);
