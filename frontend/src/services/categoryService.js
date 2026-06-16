import api from "./api.js";

export const categoryService = {
  // lấy tất cả danh mục
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  // lấy danh mục theo id
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  //tạo danh mục mới
  createCategory: async (data) => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  // cập nhật danh mục
  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  //xoa danh muc
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
