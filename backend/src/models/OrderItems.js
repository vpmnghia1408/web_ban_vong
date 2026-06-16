import pool from "../config/database.js";

class OrderItem {
  // Thêm item vào order
  static async create(orderId, productId, quantity, price) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES (?, ?, ?, ?)`,
        [orderId, productId, quantity, price],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // Lấy items của order
  static async getByOrderId(orderId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT oi.*, p.name, p.image_url 
         FROM order_items oi 
         JOIN product p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [orderId],
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

export default OrderItem;
