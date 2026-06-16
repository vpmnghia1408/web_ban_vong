import pool from "./config/database.js";

const anh1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2Tg3dH51_NR5vjzJNx7pxhoV-85rWsCS_KAtQNMCo0R6vDYzS-ZViST1GMq1UNlL23SoNjdT9lpOInV7UScxBr3yZK5y9xEUZHwIq3yMTtPqTsC1Qn-sMkbwz6wyumkROR0YDGUkOFvy22ShXJe1MgfAZFUyw8z2Gb4ZNzRhh_33q3djD8B6tW7gsArgeRWklMScPKdwzE_tF00tgbNIkufinUl1N3JXJB0u6QjyiCk1h6z4VAmGPrXHhNlmZZDVZ3jTvVYVF0";
const anh2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c";
const anh3 = "https://lh3.googleusercontent.com/aida/AP1WRLtC5YJvODoefK73rdyotIPIxro7xJA-Wo43fGZZ6gauFyqnnLNPARgx6qDoN9ORiV_cHv4bZcgxOfHIt2f7apBk9gnGsKYxFgawR_IsxJTfT3yWPaC0FDhHhTklUKMRodYdsM_OTo4D6z6Nb5kwc97VgNY_aIoSH25bcDzJt8fmB4SzAtJQdeoZFeVv1joh0Zgm53850YdZmz1U6xFdUCUVyAdUmLqXqS6mugX_iN8Ga1cLX6CdwfobuNk";
const anh4 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBv2xMb13Eli9UVManj2nFEatMaJULVhFJN2kJB1UbMKGXkpS_sETPJnmWbj_XJ9IaSugUA27g8VhabKo0qRer-dCZltCfin0XqPmb2rTjMGhwezATg7DfkCbDXCR2qUrbkglJjXXi0woPP3baHEpTi0lqX8zhUuR3pcgcPSx3ScJOYislT_haLFle7ldQJprecuRkX0yKS4FW0lHL8prAC4RcnWloXVTwk3mwsKkSK2TChxtvGuPpymkyjiKBGXn4WUUzqLlmg5J4";
const anh5 = "https://lh3.googleusercontent.com/aida-public/AB6AXuC05tvDKBIn4CnHwP2HqPlMAJJgtpm6oT-4jwwrzzzy-VKETFunGZfZKeRf-u6naTrd3IrpVLJv945blqnegESibFcaaVuy_1EUendgh34huv0YxWOEBe16X42G6BqsbRdpacb9Kdl-krz74FF4NyxuKJ9cMsQcD9TOcbuxl1gEoUoB1eAZ2rrgORy9UYiIEOZbcf22bwHeKm_Y21177yfm3NXTNBzrbpfZyAZRWLFXL1kTShoQzABcED79OR8f7zIKKZcrOZ9ceus";
const anh6 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCeE9hRSlKDIzbpcA9DY7zFFLufLe6C8j8UDFbRMRNHtJvDpV9S4W-_Ui3ymr75lhjXGms4wM9teUpib3XlnzuyJtzxdOxUQZ24hrAg4gDlAnBfDVOs5q4wq9p196MCHzgV66vK78lOIUaymfhYgJ0WdE-L_6e-v6mkHvkpj69DH0Puw3ll9QQFpnZRYzz4YdfG4ensydFa1MmsQyX64i7EbKepM3EmUPQ_fig_5qDWOIOLOmhoItAzEo3DggRHJZTC3qAY7uPNims";
const anh7 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDyE0CIRGwCnU9WWsB5M-Xu9QVfAlY5aQUd9_k8qxKw1p7X4dsXlF0zU8Q7RTCeUExYtQv6SojvXCCATs8Wxhd851HD902_oGW8xbtQIB_1ebTXTLSW5ng1n8xZp3uyXCqkGXa3BGyuBVkQhOgBzuzkMpNVID2rbpU97UFxqQlnBz0TtatpcxVGHZIlyif8Vv4xXvDb_VNFbqdynEZNz4m5rBOxkJcHT195QB9lr5NJdtjt7Sm64KeGRN5MtjiGG6GjzGKFwsdoUCk";

const productSubimages = {
  1: { image_url_2: anh4, image_url_3: anh6 },
  2: { image_url_2: anh7, image_url_3: anh1 },
  3: { image_url_2: anh6, image_url_3: anh2 },
  4: { image_url_2: anh1, image_url_3: anh6 },
  5: { image_url_2: anh2, image_url_3: anh7 },
  6: { image_url_2: anh3, image_url_3: anh4 },
  7: { image_url_2: anh2, image_url_3: anh5 },
  8: { image_url_2: anh2, image_url_3: anh7 },
};

async function migrateSubimages() {
  const connection = await pool.getConnection();
  try {
    console.log("Adding columns 'image_url_2' and 'image_url_3' to product table if not exists...");
    
    // Check if image_url_2 exists
    const [cols2] = await connection.query("SHOW COLUMNS FROM product LIKE 'image_url_2'");
    if (cols2.length === 0) {
      await connection.query("ALTER TABLE product ADD COLUMN image_url_2 VARCHAR(255) AFTER image_url");
      console.log("Column 'image_url_2' added.");
    } else {
      console.log("Column 'image_url_2' already exists.");
    }

    // Check if image_url_3 exists
    const [cols3] = await connection.query("SHOW COLUMNS FROM product LIKE 'image_url_3'");
    if (cols3.length === 0) {
      await connection.query("ALTER TABLE product ADD COLUMN image_url_3 VARCHAR(255) AFTER image_url_2");
      console.log("Column 'image_url_3' added.");
    } else {
      console.log("Column 'image_url_3' already exists.");
    }

    console.log("Updating sub-images for products...");
    for (const [id, urls] of Object.entries(productSubimages)) {
      await connection.query(
        "UPDATE product SET image_url_2 = ?, image_url_3 = ? WHERE id = ?",
        [urls.image_url_2, urls.image_url_3, Number(id)]
      );
      console.log(`Updated product ID ${id} with distinct sub-images.`);
    }

    console.log("Sub-images migration completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    connection.release();
    process.exit(0);
  }
}

migrateSubimages();
