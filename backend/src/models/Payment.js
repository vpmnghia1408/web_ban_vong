import pool from "../config/database.js";

class Payment {
  static async create(orderId, data) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `INSERT INTO payment (order_id, amount, payment_method, status, transaction_id) VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          data.amount,
          data.payment_method,
          "pending",
          data.transaction_id || null,
        ],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async getById(paymentId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM payment WHERE id = ?",
        [paymentId],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async getByOrderId(orderId) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM payment WHERE order_id = ?",
        [orderId],
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async updateStatus(paymentId, status) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE payment SET status = ? WHERE id = ?",
        [status, paymentId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async updateTransactionId(paymentId, transactionId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE payment SET transaction_id = ? WHERE id = ?",
        [transactionId, paymentId],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        `SELECT p.*, o.total_price, o.user_id 
         FROM payment p 
         JOIN orders o ON p.order_id = o.id 
         ORDER BY p.created_at DESC`,
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

export default Payment;
