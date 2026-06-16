import pool from "./config/database.js";

const LOAI_TRAM_MAP = [
  { id: 1, loai_tram: "Trầm tốc tự nhiên" },
  { id: 2, loai_tram: "Trầm tốc tự nhiên" },
  { id: 3, loai_tram: "Trầm phối charm" },
  { id: 4, loai_tram: "Trầm sánh chìm" },
  { id: 5, loai_tram: "Trầm tốc tự nhiên" },
  { id: 6, loai_tram: "Trầm phối charm" },
  { id: 7, loai_tram: "Trầm chìm nước" },
  { id: 8, loai_tram: "Trầm phối charm" },
  { id: 9, loai_tram: "Trầm sánh chìm" },
];

async function migrate() {
  const connection = await pool.getConnection();
  try {
    // 1. Thêm cột loai_tram nếu chưa có
    console.log("Kiểm tra và thêm cột loai_tram...");
    const [cols] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product' AND COLUMN_NAME = 'loai_tram'`
    );
    if (cols.length === 0) {
      await connection.query(
        "ALTER TABLE product ADD COLUMN loai_tram VARCHAR(100) AFTER image_url_3"
      );
      console.log("✅ Đã thêm cột loai_tram vào bảng product");
    } else {
      console.log("ℹ️  Cột loai_tram đã tồn tại, bỏ qua ALTER TABLE");
    }

    // 2. Cập nhật giá trị loai_tram cho các sản phẩm hiện có
    console.log("Cập nhật loai_tram cho các sản phẩm...");
    for (const item of LOAI_TRAM_MAP) {
      const [res] = await connection.query(
        "UPDATE product SET loai_tram = ? WHERE id = ?",
        [item.loai_tram, item.id]
      );
      if (res.affectedRows > 0) {
        console.log(`  ✅ ID ${item.id}: ${item.loai_tram}`);
      } else {
        console.log(`  ⚠️  ID ${item.id}: không tìm thấy sản phẩm (bỏ qua)`);
      }
    }

    console.log("\n🎉 Migration hoàn tất!");
  } catch (err) {
    console.error("❌ Lỗi migration:", err.message);
    throw err;
  } finally {
    connection.release();
    process.exit(0);
  }
}

migrate();
