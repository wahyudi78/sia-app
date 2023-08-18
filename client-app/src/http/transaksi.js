import api from "./api";
const resource = "/v1/transaksi";

export const allTransaksi = () => api.get(resource);

export const Transaksi = (id) => api.get(resource + "/" + id);

export const createTransaksi = (transaksi) => api.post(resource, transaksi);

export const updateTransaksi = (id, transaksi) => api.put(resource + "/" + id, transaksi);

export const deleteTransaksi = (id) => api.delete(resource + "/" + id);
