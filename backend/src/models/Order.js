import pool from "../config/database.js";

class Order {
  // 1. Lấy tất cả orders của user
  static async getByUserId(userId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT o.id, o.user_id, o.total_price, o.status, 
                o.shipping_address, o.shipping_phone, o.created_at
         FROM orders o 
         WHERE o.user_id = ? 
         ORDER BY o.created_at DESC`,
        [userId],
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  // 2. Lấy order theo ID
  static async getById(orderId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM orders WHERE id = ?",
        [orderId],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  // 3. Tạo order mới
  static async create(userId, data) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `INSERT INTO orders (user_id, total_price, status, shipping_address, shipping_phone) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          data.total_price,
          "pending",
          data.shipping_address,
          data.shipping_phone,
        ],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // 4. Lấy chi tiết order (order + order_items + products)
  static async getOrderDetails(orderId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price,
                p.name, p.image_url, o.total_price, o.status, o.created_at
         FROM order_items oi
         JOIN product p ON oi.product_id = p.id
         JOIN orders o ON oi.order_id = o.id
         WHERE oi.order_id = ?`,
        [orderId],
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  // 5. Cập nhật status order (pending → confirmed → shipped → delivered)
  static async updateStatus(orderId, status) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, orderId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // 6. Xóa order
  static async delete(orderId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "DELETE FROM orders WHERE id = ?",
        [orderId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // 7. Lấy tất cả orders (cho Admin)
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT o.id, o.user_id, o.total_price, o.status, 
                o.shipping_address, o.created_at
         FROM orders o 
         ORDER BY o.created_at DESC`,
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

export default Order;
