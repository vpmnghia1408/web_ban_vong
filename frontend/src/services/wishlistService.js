import api from "./api.js";

export const wishlistService = {
  // Lấy danh sách sản phẩm yêu thích của người dùng
  getWishlist: async () => {
    const response = await api.get("/wishlist");
    return response.data;
  },

  // Thêm sản phẩm vào danh sách yêu thích
  addToWishlist: async (productId) => {
    const response = await api.post("/wishlist", { productId });
    return response.data;
  },

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  },
};
