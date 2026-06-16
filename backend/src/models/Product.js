import pool from "../config/database.js";

class Product {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("SELECT * FROM product");
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM product WHERE id = ?",
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
        "INSERT INTO product (name, price, description, image_url, image_url_2, image_url_3, loai_tram, category_id, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.name,
          data.price,
          data.description,
          data.image_url,
          data.image_url_2 || null,
          data.image_url_3 || null,
          data.loai_tram || null,
          data.category_id,
          data.quantity,
        ],
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
        "UPDATE product SET name = ?, price = ?, description = ?, image_url = ?, image_url_2 = ?, image_url_3 = ?, loai_tram = ?, category_id = ?, quantity = ? WHERE id = ?",
        [
          data.name,
          data.price,
          data.description,
          data.image_url,
          data.image_url_2 || null,
          data.image_url_3 || null,
          data.loai_tram || null,
          data.category_id,
          data.quantity,
          id,
        ],
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
        "DELETE FROM product WHERE id = ?",
        [id],
      );
      return result;
    } finally {
      connection.release();
    }
  }

  static async searchbyName(keyword) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT * FROM product WHERE name LIKE ?",
        [`%${keyword}%`],
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

export default Product;
