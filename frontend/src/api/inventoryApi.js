import api from "./axios";

export const adjustStock = (productId, data) =>
  api.post(`/inventory/product/${productId}/adjust`, data);

export const getInventoryLogs = () =>
  api.get("/inventory/logs");

export const getInventoryLogById = (logId) =>
  api.get(`/inventory/logs/${logId}`);

export const getProductInventoryHistory = (productId) =>
  api.get(`/inventory/product/${productId}/history`);

export const getInventorySummary = () =>
  api.get("/inventory/summary");
