import api from "./axios";

export const getSalesReport = () =>
  api.get("/reports/sales");

export const getInventoryReport = () =>
  api.get("/reports/inventory");
