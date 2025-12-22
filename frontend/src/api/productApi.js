// productApi.js
import api from "./axios"; // <-- your configured axios instance with baseURL = http://127.0.0.1:8000/api/v1

// PRODUCTS
// GET /api/v1/products?category_id=<id>&search=<text>
export const getProducts = (params) => api.get("/products", { params });

export const createProduct = (data) => api.post("/products", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

// CATEGORIES
// GET /api/v1/categories
export const getCategories = () => api.get("/categories");

// POST /api/v1/categories
export const createCategoryApi = (data) => api.post("/categories", data);

// DELETE /api/v1/categories/{id}
export const deleteCategoryApi = (id) => api.delete(`/categories/${id}`);
