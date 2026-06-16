import pool from "./config/database.js";

async function createWishlistTable() {
  const connection = await pool.getConnection();
  try {
    console.log("Checking and creating 'wishlist' table in MySQL database...");

    // Create the table if it does not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product_wishlist (user_id, product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("Table 'wishlist' created or already exists.");

    // Create the index if it does not exist
    // MySQL 5.7+ / 8.0 support CREATE INDEX IF NOT EXISTS, or we can check if it exists or just use a normal CREATE INDEX (ignoring error if it already exists or checking first)
    // To be safe and simple, we'll try to create it in a try-catch block
    try {
      await connection.query(`
        CREATE INDEX idx_wishlist_user ON wishlist(user_id);
      `);
      console.log("Index 'idx_wishlist_user' created.");
    } catch (indexErr) {
      if (indexErr.code === 'ER_DUP_KEYNAME') {
        console.log("Index 'idx_wishlist_user' already exists.");
      } else {
        throw indexErr;
      }
    }

    console.log("Database schema update for Wishlist completed successfully!");
  } catch (error) {
    console.error("Error creating wishlist table:", error);
  } finally {
    connection.release();
    process.exit(0);
  }
}

createWishlistTable();
