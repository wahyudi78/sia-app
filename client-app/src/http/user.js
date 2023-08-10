import api from "./api";
const resource = "/v1/users";

export const allUser = () => api.get(resource);

export const createUser = (user) => api.post(resource, user);

export const updateUser = (id, user) => api.put(resource + user, user);

export const deleteUser = (id) => api.delete(resource + id);
