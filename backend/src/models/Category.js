import pool from "../config/database.js";

class Category {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("SELECT * FROM category");
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM category WHERE id = ?",
        [id],
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
        "INSERT INTO category (name, description, image_url) VALUES (?, ?, ?)",
        [data.name, data.description, data.image_url],
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
        "UPDATE category SET name = ?, description = ?, image_url = ? WHERE id = ?",
        [data.name, data.description, data.image_url, id],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "DELETE FROM category WHERE id = ?",
        [id],
      );
      return result;
    } finally {
      connection.release();
    }
  }
}

export default Category;
