import api from "./api";

// const resource = "/auth/login";

export const authLogin = (data) => api.post("/auth/login", data);

export const authLogout = (mapel) => api.post("/auth/logout", mapel);
