import api from "./api.js";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (name, email, phone, password, confirmPassword) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      phone,
      password,
      confirmPassword,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  updateProfile: async (name, phone) => {
    const response = await api.put("/auth/profile", { name, phone });
    return response.data;
  },

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const response = await api.put("/auth/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get("/auth/users");
    return response.data;
  },

  createUser: async (data) => {
    const response = await api.post("/auth/users", data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await api.put(`/auth/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/auth/users/${id}`);
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  },
};
