import pool from "../config/database.js";

class User {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT id, name, email, phone, role_id FROM user",
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT id, name, email, phone, role_id FROM user WHERE id = ?",
        [id],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async getByIdWithPassword(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async getByEmail(email) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "INSERT INTO user (name, email, phone, password, role_id) VALUES (?, ?, ?, ?, ?)",
        [data.name, data.email, data.phone, data.password, data.role_id ?? 1],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?",
        [data.name, data.email, data.phone, id],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async updateAdmin(id, data) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE user SET name = ?, email = ?, phone = ?, role_id = ? WHERE id = ?",
        [data.name, data.email, data.phone, data.role_id, id],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async updatePassword(id, hashedPassword) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE user SET password = ? WHERE id = ?",
        [hashedPassword, id],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query("DELETE FROM user WHERE id = ?", [
        id,
      ]);
      return result;
    } finally {
      connection.release();
    }
  }
}

export default User;
