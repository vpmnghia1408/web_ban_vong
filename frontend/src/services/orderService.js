import api from "./api.js";

export const orderService = {
  // Tạo order (Hỗ trợ cả giỏ hàng và mua ngay)
  createOrder: async (shipping_address, shipping_phone, items) => {
    const response = await api.post("/orders", {
      shipping_address,
      shipping_phone,
      items,
    });
    return response.data;
  },

  // Lấy danh sách orders của user hiện tại
  getMyOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },

  // Lấy chi tiết order (kèm order items)
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // User hủy đơn
  cancelMyOrder: async (orderId) => {
    const response = await api.put(`/orders/my-orders/${orderId}/cancel`);
    return response.data;
  },

  // Lấy tất cả orders (Admin)
  getAllOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  // Cập nhật trạng thái thành công hay thất bại của order (Admin)
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}`, {
      status,
    });
    return response.data;
  },

  // xóa order
  deleteOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};
