import api from "./api";
const resource = "/v1/users";

export const allSiswa = () => api.get(resource);

export const createSiswa = (siswa) => api.post(resource, siswa);

export const updateSiswa = (id, siswa) => api.put(resource + siswa, siswa);

export const deleteSiswa = (id) => api.delete(resource + id);
