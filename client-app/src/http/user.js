import api from "./api";
const resource = "/v1/users";

export const allUser = () => api.get(resource);

export const User = (id) => api.get(resource + "/" + id);

export const createUser = (user) => api.post(resource, user);

export const updateUser = (id, user) => api.put(resource + "/" + id, user);

export const deleteUser = (id) => api.delete(resource + "/" + id);

export const ubahPassword = (data) => api.post("http://localhost:8000/api/auth/ubah_password", data);
