import api from "./api";
const resource = "/v1/pembayaran";

export const allPembayaran = () => api.get(resource);

export const createPembayaran = (pembayaran) => api.post(resource, pembayaran);

export const updatePembayaran = (id, pembayaran) => api.put(resource + "/"+id, pembayaran);

export const deletePembayaran = (id) => api.delete(resource +"/"+ id);
