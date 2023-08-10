import api from "./api";
const resource = "/v1/pembayaran";

export const allPembayaran = () => api.get(resource);

export const createPembayaran = (pembayaran) => api.post(resource, pembayaran);

export const updatePembayaran = (id, pembayaran) => api.put(resource + pembayaran, pembayaran);

export const deletePembayaran = (id) => api.delete(resource + id);
