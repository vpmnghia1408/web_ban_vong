import pool from "../config/database.js";

class Wishlist {
  // Lấy danh sách sản phẩm yêu thích của người dùng
  static async getByUserId(userId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT w.id AS wishlist_id, w.user_id, w.product_id, w.created_at,
                p.name, p.price, p.image_url, p.description, p.quantity,
                c.name AS category_name
         FROM wishlist w
         JOIN product p ON w.product_id = p.id
         LEFT JOIN category c ON p.category_id = c.id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`,
        [userId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  // Thêm sản phẩm vào danh sách yêu thích
  static async add(userId, productId) {
    const connection = await pool.getConnection();
    try {
      // Sử dụng INSERT IGNORE để tránh lỗi trùng khóa UNIQUE(user_id, product_id)
      const [result] = await connection.query(
        `INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)`,
        [userId, productId]
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // Xóa sản phẩm khỏi danh sách yêu thích
  static async remove(userId, productId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`,
        [userId, productId]
      );
      return result;
    } finally {
      connection.release();
    }
  }

  // Kiểm tra sản phẩm đã nằm trong danh sách yêu thích chưa
  static async isFavorite(userId, productId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT 1 FROM wishlist WHERE user_id = ? AND product_id = ? LIMIT 1`,
        [userId, productId]
      );
      return rows.length > 0;
    } finally {
      connection.release();
    }
  }
}

export default Wishlist;
