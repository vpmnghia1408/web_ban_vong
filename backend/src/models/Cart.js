import pool from "../config/database.js";

class Cart {
  // lấy tất cả sản phẩm trong giỏ hàng của người dùng
  static async getByUserId(userId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT c.id, c.user_id, c.product_id, c.quantity, 
                p.name, p.price, p.image_url, c.created_at
         FROM cart c 
         JOIN product p ON c.product_id = p.id 
         WHERE c.user_id = ? 
         ORDER BY c.created_at DESC`,
        [userId],
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getCartItem(userId, productId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`,
        [userId, productId],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async addToCart(userId, productId, quantity) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`,
        [userId, productId],
      );
      if (rows.length > 0) {
        const [result] = await connection.query(
          `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`,
          [quantity, userId, productId],
        );
        return result;
      } else {
        const [result] = await connection.query(
          `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
          [userId, productId, quantity],
        );
        return result;
      }
    } finally {
      connection.release();
    }
  }

  static async updateQuantity(userId, productId, quantity) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?`,
        [quantity, userId, productId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async removeFromCart(userId, productId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `DELETE FROM cart WHERE user_id = ? AND product_id = ?`,
        [userId, productId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async clearCart(userId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `DELETE FROM cart WHERE user_id = ?`,
        [userId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async getCartTotal(userId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT SUM(c.quantity * p.price) AS total 
             FROM cart c 
             JOIN product p ON c.product_id = p.id 
             WHERE c.user_id = ?`,
        [userId],
      );
      return rows[0].total || 0;
    } finally {
      connection.release();
    }
  }
}

export default Cart;
