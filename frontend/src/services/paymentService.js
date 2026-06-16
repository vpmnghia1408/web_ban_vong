import api from "./api.js";

export const paymentService = {
  // Tạo payment mới
  createPayment: async (orderId, payment_method) => {
    const response = await api.post("/payments", {
      orderId,
      payment_method,
    });
    return response.data;
  },

  // Lấy thông tin payment của order
  getPaymentByOrder: async (orderId) => {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  },

  // Xác nhận payment (từ payment gateway)
  confirmPayment: async (paymentId, transaction_id, status) => {
    const response = await api.post("/payments/confirm", {
      paymentId,
      transaction_id,
      status,
    });
    return response.data;
  },

  // Lấy tất cả payments (Admin)
  getAllPayments: async () => {
    const response = await api.get("/payments");
    return response.data;
  },
};
