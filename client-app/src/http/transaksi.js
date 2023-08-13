import api from "./api";
const resource = "/v1/transaksi";

export const allTransaksi = () => api.get(resource);

export const createTransaksi = (transaksi) => api.post(resource, transaksi);

export const updateTransaksi = (id, transaksi) => api.put(resource + "/" + id, pembayaran);

export const deleteTransaksi = (id) => api.delete(resource + "/" + id);
