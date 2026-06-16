import api from "./api.js";

export const cartService = {
  // lấy giỏ hàng của người dùng
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },
  // thêm sản phẩm vào giỏ hàng
  addToCart: async (productId, quantity) => {
    const response = await api.post("/cart", { productId, quantity });
    return response.data;
  },
  // cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity: async (productId, quantity) => {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data;
  },
  // xoa sản phẩm khỏi giỏ hàng
  removeFromCart: async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },
  // xóa toàn bộ giỏ hàng
  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
  // lấy tổng giá trị giỏ hàng
  getCartTotal: async () => {
    const response = await api.get("/cart/total");
    return response.data;
  },
};
