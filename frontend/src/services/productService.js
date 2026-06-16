import api from "./api.js";

export const productService = {
  getAll: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/products", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (keyword) => {
    const response = await api.get(`/products/search?keyword=${keyword}`);
    return response.data;
  },
};
