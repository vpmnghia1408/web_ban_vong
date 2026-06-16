import Order from "../models/Order.js";
import OrderItem from "../models/OrderItems.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 1. Lấy tất cả orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. Lấy orders của user hiện tại
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.getByUserId(userId);
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. Lấy chi tiết order
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    // ✅ Lấy order trước (1 object)
    const orderInfo = await Order.getById(orderId);

    if (!orderInfo) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ Kiểm tra user có quyền xem order này không
    if (orderInfo.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // ✅ Lấy chi tiết order items (mảng)
    const orderDetails = await Order.getOrderDetails(orderId);

    res.json({
      success: true,
      data: {
        order: orderInfo,
        items: orderDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. Tạo order (Hỗ trợ cả giỏ hàng và mua ngay)
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { shipping_address, shipping_phone, items } = req.body;

    // ✅ Validation
    if (!shipping_address || !shipping_phone) {
      return res.status(400).json({
        success: false,
        message: "shipping_address and shipping_phone are required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items selected for order",
      });
    }

    // ✅ Tính tổng tiền
    let subtotal = 0;
    for (const item of items) {
      subtotal += Number(item.price) * Number(item.quantity);
    }
    const shipping = subtotal > 0 ? 30000 : 0;
    const totalPrice = subtotal + shipping;

    // ✅ Tạo order
    const orderResult = await Order.create(userId, {
      total_price: totalPrice,
      shipping_address,
      shipping_phone,
    });

    const orderId = orderResult.insertId;

    // ✅ Thêm order items
    for (const item of items) {
      await OrderItem.create(
        orderId,
        item.product_id,
        Number(item.quantity),
        Number(item.price),
      );

      // Xóa khỏi giỏ hàng (nếu đang Mua Ngay thì cũng không sao, không có gì để xóa)
      try {
        await Cart.removeFromCart(userId, item.product_id);
      } catch (e) {
        console.error("Error removing item from cart", e);
      }
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        orderId: orderId,
        total_price: totalPrice,
        status: "pending",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. Cập nhật status order (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ Validation
    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // ✅ Kiểm tra order tồn tại
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.updateStatus(orderId, status);

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: {
        orderId: orderId,
        status: status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 6. Xóa order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // ✅ Kiểm tra order tồn tại
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.delete(orderId);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 7. Huỷ order (User)
export const cancelMyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

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

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: "Chỉ có thể hủy đơn hàng đang chờ xử lý",
      });
    }

    await Order.updateStatus(orderId, 'cancelled');

    res.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
