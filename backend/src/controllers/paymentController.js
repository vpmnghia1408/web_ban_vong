import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

export const createPayment = async (req, res) => {
  const userId = req.userId;
  const { orderId, payment_method } = req.body;
  try {
    if (!orderId || !payment_method) {
      return res.status(400).json({
        message: "Order ID and payment method are required",
      });
    }
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    if (order.user_id !== userId) {
      return res.status(403).json({
        message: "access denied",
      });
    }
    const validMethods = ["credit_card", "bank_transfer", "e_wallet", "cash"];
    if (!validMethods.includes(payment_method)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }
    const paymentResult = await Payment.create(orderId, {
      amount: order.total_price,
      payment_method: payment_method,
    });
    return res.status(201).json({
      success: true,
      data: {
        paymentId: paymentResult.insertId,
        orderId: orderId,
        amount: order.total_price,
        payment_method: payment_method,
        status: "pending",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmPayment = async (req, res) => {
  const { paymentId, transaction_id, status } = req.body;
  try {
    if (!paymentId || !transaction_id || !status) {
      return res.status(400).json({
        message: "Payment ID, transaction ID and status are required",
      });
    }
    const payment = await Payment.getById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await Payment.updateTransactionId(paymentId, transaction_id);
    await Payment.updateStatus(paymentId, status);

    if (status == "completed") {
      await Order.updateStatus(payment.order_id, "confirmed");
    } else if (status == "failed") {
      await Order.updateStatus(payment.order_id, "cancelled");
    }
    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: {
        paymentId: paymentId,
        status: status,
        transaction_id: transaction_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentByOrderId = async (req, res) => {
  const userId = req.userId;
  const { orderId } = req.params;
  try {
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const payment = await Payment.getByOrderId(orderId);
    return res.status(200).json({
      success: true,
      data: payment || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.getAll();
    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
