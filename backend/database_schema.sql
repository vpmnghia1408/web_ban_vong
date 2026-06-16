-- Tạo database mới
DROP DATABASE IF EXISTS webgiadung;
CREATE DATABASE webgiadung CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webgiadung;

-- 1. Bảng Role
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng User
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role_id INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);

-- 3. Bảng Category
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Bảng Product
CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  quantity INT DEFAULT 0,
  image_url VARCHAR(1000),
  image_url_2 VARCHAR(1000),
  image_url_3 VARCHAR(1000),
  loai_tram VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- 5. Bảng Cart
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product (user_id, product_id)
);

-- 6. Bảng Order
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  shipping_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 7. Bảng Order Items
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- 8. Bảng Payment
CREATE TABLE payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_method ENUM('cash', 'credit_card', 'debit_card', 'e_wallet') DEFAULT 'cash',
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Dữ liệu mặc định
INSERT INTO role (id, name, description) VALUES
(1, 'user', 'Người dùng thường'),
(2, 'admin', 'Quản trị viên');

INSERT INTO category (id, name, description, image_url) VALUES
(1, 'Vòng Trầm Nam', 'Vòng tay trầm hương hạt tròn, lu thống phong thủy mạnh mẽ, nam tính.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2Tg3dH51_NR5vjzJNx7pxhoV-85rWsCS_KAtQNMCo0R6vDYzS-ZViST1GMq1UNlL23SoNjdT9lpOInV7UScxBr3yZK5y9xEUZHwIq3yMTtPqTsC1Qn-sMkbwz6wyumkROR0YDGUkOFvy22ShXJe1MgfAZFUyw8z2Gb4ZNzRhh_33q3djD8B6tW7gsArgeRWklMScPKdwzE_tF00tgbNIkufinUl1N3JXJB0u6QjyiCk1h6z4VAmGPrXHhNlmZZDVZ3jTvVYVF0'),
(2, 'Vòng Trầm Nữ', 'Vòng tay trầm hương thiết kế nhỏ gọn, tinh tế mang lại bình an, thanh nhã.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c'),
(3, 'Vòng Trầm 108 Hạt', 'Chuỗi 108 hạt trầm hương tự nhiên cầu bình an, may mắn, thích hợp thiền định.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC05tvDKBIn4CnHwP2HqPlMAJJgtpm6oT-4jwwrzzzy-VKETFunGZfZKeRf-u6naTrd3IrpVLJv945blqnegESibFcaaVuy_1EUendgh34huv0YxWOEBe16X42G6BqsbRdpacb9Kdl-krz74FF4NyxuKJ9cMsQcD9TOcbuxl1gEoUoB1eAZ2rrgORy9UYiIEOZbcf22bwHeKm_Y21177yfm3NXTNBzrbpfZyAZRWLFXL1kTShoQzABcED79OR8f7zIKKZcrOZ9ceus'),
(4, 'Vòng Trầm Phối Charm', 'Vòng trầm hương kết hợp charm bạc S925, charm vàng 24K phong thủy thu hút tài lộc.', 'https://lh3.googleusercontent.com/aida/AP1WRLtC5YJvODoefK73rdyotIPIxro7xJA-Wo43fGZZ6gauFyqnnLNPARgx6qDoN9ORiV_cHv4bZcgxOfHIt2f7apBk9gnGsKYxFgawR_IsxJTfT3yWPaC0FDhHhTklUKMRodYdsM_OTo4D6z6Nb5kwc97VgNY_aIoSH25bcDzJt8fmB4SzAtJQdeoZFeVv1joh0Zgm53850YdZmz1U6xFdUCUVyAdUmLqXqS6mugX_iN8Ga1cLX6CdwfobuNk');

INSERT INTO product (id, category_id, name, description, price, quantity, image_url, image_url_2, image_url_3, loai_tram) VALUES
(1, 1, 'Vòng Trầm Tốc Kiến Nam', 'Trầm tốc kiến tự nhiên nguyên khối, hạt tròn 12mm mạnh mẽ, mùi thơm dịu nhẹ, xua đuổi tà khí, mang lại may mắn cho nam giới.', 1290000, 18, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2Tg3dH51_NR5vjzJNx7pxhoV-85rWsCS_KAtQNMCo0R6vDYzS-ZViST1GMq1UNlL23SoNjdT9lpOInV7UScxBr3yZK5y9xEUZHwIq3yMTtPqTsC1Qn-sMkbwz6wyumkROR0YDGUkOFvy22ShXJe1MgfAZFUyw8z2Gb4ZNzRhh_33q3djD8B6tW7gsArgeRWklMScPKdwzE_tF00tgbNIkufinUl1N3JXJB0u6QjyiCk1h6z4VAmGPrXHhNlmZZDVZ3jTvVYVF0', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2xMb13Eli9UVManj2nFEatMaJULVhFJN2kJB1UbMKGXkpS_sETPJnmWbj_XJ9IaSugUA27g8VhabKo0qRer-dCZltCfin0XqPmb2rTjMGhwezATg7DfkCbDXCR2qUrbkglJjXXi0woPP3baHEpTi0lqX8zhUuR3pcgcPSx3ScJOYislT_haLFle7ldQJprecuRkX0yKS4FW0lHL8prAC4RcnWloXVTwk3mwsKkSK2TChxtvGuPpymkyjiKBGXn4WUUzqLlmg5J4', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeE9hRSlKDIzbpcA9DY7zFFLufLe6C8j8UDFbRMRNHtJvDpV9S4W-_Ui3ymr75lhjXGms4wM9teUpib3XlnzuyJtzxdOxUQZ24hrAg4gDlAnBfDVOs5q4wq9p196MCHzgV66vK78lOIUaymfhYgJ0WdE-L_6e-v6mkHvkpj69DH0Puw3ll9QQFpnZRYzz4YdfG4ensydFa1MmsQyX64i7EbKepM3EmUPQ_fig_5qDWOIOLOmhoItAzEo3DggRHJZTC3qAY7uPNims'),
(2, 2, 'Vòng Trầm Tốc Vườn Nữ', 'Hạt tròn thanh mảnh 8mm tinh tế cho phái nữ, trầm tốc tự nhiên thơm nhẹ, mang lại bình an, may mắn và tài lộc.', 890000, 24, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyE0CIRGwCnU9WWsB5M-Xu9QVfAlY5aQUd9_k8qxKw1p7X4dsXlF0zU8Q7RTCeUExYtQv6SojvXCCATs8Wxhd851HD902_oGW8xbtQIB_1ebTXTLSW5ng1n8xZp3uyXCqkGXa3BGyuBVkQhOgBzuzkMpNVID2rbpU97UFxqQlnBz0TtatpcxVGHZIlyif8Vv4xXvDb_VNFbqdynEZNz4m5rBOxkJcHT195QB9lr5NJdtjt7Sm64KeGRN5MtjiGG6GjzGKFwsdoUCk', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2Tg3dH51_NR5vjzJNx7pxhoV-85rWsCS_KAtQNMCo0R6vDYzS-ZViST1GMq1UNlL23SoNjdT9lpOInV7UScxBr3yZK5y9xEUZHwIq3yMTtPqTsC1Qn-sMkbwz6wyumkROR0YDGUkOFvy22ShXJe1MgfAZFUyw8z2Gb4ZNzRhh_33q3djD8B6tW7gsArgeRWklMScPKdwzE_tF00tgbNIkufinUl1N3JXJB0u6QjyiCk1h6z4VAmGPrXHhNlmZZDVZ3jTvVYVF0'),
(3, 4, 'Vòng Trầm Ngọc Bảo Charm', 'Vòng tay trầm hương phối charm bạc Thái tinh xảo và đá ngọc bảo, mang phong cách sang trọng, thanh nhã cho người đeo.', 1890000, 12, 'https://lh3.googleusercontent.com/aida/AP1WRLtC5YJvODoefK73rdyotIPIxro7xJA-Wo43fGZZ6gauFyqnnLNPARgx6qDoN9ORiV_cHv4bZcgxOfHIt2f7apBk9gnGsKYxFgawR_IsxJTfT3yWPaC0FDhHhTklUKMRodYdsM_OTo4D6z6Nb5kwc97VgNY_aIoSH25bcDzJt8fmB4SzAtJQdeoZFeVv1joh0Zgm53850YdZmz1U6xFdUCUVyAdUmLqXqS6mugX_iN8Ga1cLX6CdwfobuNk', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeE9hRSlKDIzbpcA9DY7zFFLufLe6C8j8UDFbRMRNHtJvDpV9S4W-_Ui3ymr75lhjXGms4wM9teUpib3XlnzuyJtzxdOxUQZ24hrAg4gDlAnBfDVOs5q4wq9p196MCHzgV66vK78lOIUaymfhYgJ0WdE-L_6e-v6mkHvkpj69DH0Puw3ll9QQFpnZRYzz4YdfG4ensydFa1MmsQyX64i7EbKepM3EmUPQ_fig_5qDWOIOLOmhoItAzEo3DggRHJZTC3qAY7uPNims', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c'),
(4, 1, 'Vòng Trầm Sánh Chìm Lu Thống', 'Thiết kế lu thống tài lộc xen kẽ hạt tròn mạnh mẽ. Chất trầm sánh chìm nhiều dầu, mùi hương ấm áp, bền lâu theo thời gian.', 2490000, 15, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2xMb13Eli9UVManj2nFEatMaJULVhFJN2kJB1UbMKGXkpS_sETPJnmWbj_XJ9IaSugUA27g8VhabKo0qRer-dCZltCfin0XqPmb2rTjMGhwezATg7DfkCbDXCR2qUrbkglJjXXi0woPP3baHEpTi0lqX8zhUuR3pcgcPSx3ScJOYislT_haLFle7ldQJprecuRkX0yKS4FW0lHL8prAC4RcnWloXVTwk3mwsKkSK2TChxtvGuPpymkyjiKBGXn4WUUzqLlmg5J4', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2Tg3dH51_NR5vjzJNx7pxhoV-85rWsCS_KAtQNMCo0R6vDYzS-ZViST1GMq1UNlL23SoNjdT9lpOInV7UScxBr3yZK5y9xEUZHwIq3yMTtPqTsC1Qn-sMkbwz6wyumkROR0YDGUkOFvy22ShXJe1MgfAZFUyw8z2Gb4ZNzRhh_33q3djD8B6tW7gsArgeRWklMScPKdwzE_tF00tgbNIkufinUl1N3JXJB0u6QjyiCk1h6z4VAmGPrXHhNlmZZDVZ3jTvVYVF0', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeE9hRSlKDIzbpcA9DY7zFFLufLe6C8j8UDFbRMRNHtJvDpV9S4W-_Ui3ymr75lhjXGms4wM9teUpib3XlnzuyJtzxdOxUQZ24hrAg4gDlAnBfDVOs5q4wq9p196MCHzgV66vK78lOIUaymfhYgJ0WdE-L_6e-v6mkHvkpj69DH0Puw3ll9QQFpnZRYzz4YdfG4ensydFa1MmsQyX64i7EbKepM3EmUPQ_fig_5qDWOIOLOmhoItAzEo3DggRHJZTC3qAY7uPNims'),
(5, 3, 'Vòng Trầm 108 Hạt Tĩnh Tâm', 'Vòng chuỗi 108 hạt trầm hương tự nhiên phù hợp quấn cổ tay hoặc đeo cổ. Rất tốt cho thiền định, yoga và cầu bình an.', 2290000, 10, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC05tvDKBIn4CnHwP2HqPlMAJJgtpm6oT-4jwwrzzzy-VKETFunGZfZKeRf-u6naTrd3IrpVLJv945blqnegESibFcaaVuy_1EUendgh34huv0YxWOEBe16X42G6BqsbRdpacb9Kdl-krz74FF4NyxuKJ9cMsQcD9TOcbuxl1gEoUoB1eAZ2rrgORy9UYiIEOZbcf22bwHeKm_Y21177yfm3NXTNBzrbpfZyAZRWLFXL1kTShoQzABcED79OR8f7zIKKZcrOZ9ceus', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyE0CIRGwCnU9WWsB5M-Xu9QVfAlY5aQUd9_k8qxKw1p7X4dsXlF0zU8Q7RTCeUExYtQv6SojvXCCATs8Wxhd851HD902_oGW8xbtQIB_1ebTXTLSW5ng1n8xZp3uyXCqkGXa3BGyuBVkQhOgBzuzkMpNVID2rbpU97UFxqQlnBz0TtatpcxVGHZIlyif8Vv4xXvDb_VNFbqdynEZNz4m5rBOxkJcHT195QB9lr5NJdtjt7Sm64KeGRN5MtjiGG6GjzGKFwsdoUCk'),
(6, 4, 'Vòng Trầm Tỳ Hưu Chiêu Tài', 'Trầm hương tự nhiên kết hợp charm Tỳ Hưu vàng 24K đúc nguyên khối. Ý nghĩa chiêu tài lộc, mang lại thịnh vượng và may mắn.', 3790000, 8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeE9hRSlKDIzbpcA9DY7zFFLufLe6C8j8UDFbRMRNHtJvDpV9S4W-_Ui3ymr75lhjXGms4wM9teUpib3XlnzuyJtzxdOxUQZ24hrAg4gDlAnBfDVOs5q4wq9p196MCHzgV66vK78lOIUaymfhYgJ0WdE-L_6e-v6mkHvkpj69DH0Puw3ll9QQFpnZRYzz4YdfG4ensydFa1MmsQyX64i7EbKepM3EmUPQ_fig_5qDWOIOLOmhoItAzEo3DggRHJZTC3qAY7uPNims', 'https://lh3.googleusercontent.com/aida/AP1WRLtC5YJvODoefK73rdyotIPIxro7xJA-Wo43fGZZ6gauFyqnnLNPARgx6qDoN9ORiV_cHv4bZcgxOfHIt2f7apBk9gnGsKYxFgawR_IsxJTfT3yWPaC0FDhHhTklUKMRodYdsM_OTo4D6z6Nb5kwc97VgNY_aIoSH25bcDzJt8fmB4SzAtJQdeoZFeVv1joh0Zgm53850YdZmz1U6xFdUCUVyAdUmLqXqS6mugX_iN8Ga1cLX6CdwfobuNk', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2xMb13Eli9UVManj2nFEatMaJULVhFJN2kJB1UbMKGXkpS_sETPJnmWbj_XJ9IaSugUA27g8VhabKo0qRer-dCZltCfin0XqPmb2rTjMGhwezATg7DfkCbDXCR2qUrbkglJjXXi0woPP3baHEpTi0lqX8zhUuR3pcgcPSx3ScJOYislT_haLFle7ldQJprecuRkX0yKS4FW0lHL8prAC4RcnWloXVTwk3mwsKkSK2TChxtvGuPpymkyjiKBGXn4WUUzqLlmg5J4'),
(7, 2, 'Vòng Trầm Đồng Tâm Song Hỷ', 'Hạt trầm hương tròn 6mm kết hợp charm nút thắt đồng tâm ngọc bích phong thủy, thu hút duyên lành, tình cảm êm ấm.', 1590000, 20, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyE0CIRGwCnU9WWsB5M-Xu9QVfAlY5aQUd9_k8qxKw1p7X4dsXlF0zU8Q7RTCeUExYtQv6SojvXCCATs8Wxhd851HD902_oGW8xbtQIB_1ebTXTLSW5ng1n8xZp3uyXCqkGXa3BGyuBVkQhOgBzuzkMpNVID2rbpU97UFxqQlnBz0TtatpcxVGHZIlyif8Vv4xXvDb_VNFbqdynEZNz4m5rBOxkJcHT195QB9lr5NJdtjt7Sm64KeGRN5MtjiGG6GjzGKFwsdoUCk', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC05tvDKBIn4CnHwP2HqPlMAJJgtpm6oT-4jwwrzzzy-VKETFunGZfZKeRf-u6naTrd3IrpVLJv945blqnegESibFcaaVuy_1EUendgh34huv0YxWOEBe16X42G6BqsbRdpacb9Kdl-krz74FF4NyxuKJ9cMsQcD9TOcbuxl1gEoUoB1eAZ2rrgORy9UYiIEOZbcf22bwHeKm_Y21177yfm3NXTNBzrbpfZyAZRWLFXL1kTShoQzABcED79OR8f7zIKKZcrOZ9ceus'),
(8, 3, 'Vòng Trầm 108 Hạt Phối Lotus', 'Chuỗi 108 hạt trầm hương tự nhiên phối charm hoa sen bạc S925 thanh cao. Biểu tượng của sự tinh khiết, thanh tịnh và thông tuệ.', 2590000, 14, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC05tvDKBIn4CnHwP2HqPlMAJJgtpm6oT-4jwwrzzzy-VKETFunGZfZKeRf-u6naTrd3IrpVLJv945blqnegESibFcaaVuy_1EUendgh34huv0YxWOEBe16X42G6BqsbRdpacb9Kdl-krz74FF4NyxuKJ9cMsQcD9TOcbuxl1gEoUoB1eAZ2rrgORy9UYiIEOZbcf22bwHeKm_Y21177yfm3NXTNBzrbpfZyAZRWLFXL1kTShoQzABcED79OR8f7zIKKZcrOZ9ceus', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYJlrznLEQvHJAoTeMhFMAT_gO5cwXYR497Tqhccx2Tp3KeGMfm0dqu_D-I-Iwkx2uU3NArgzL5-V9f6hhcWIDNAlZM9zjPx1m_BYO37dQpJ2ak31PtoSO02iEAD6K5_t45MCbbMO4YKvlniGtHL3kSxX00fZTOACJRaQnVibbp0H6Qgi566IYb7nCCtDXmFnJWNUAchgxioc0AtVF8I9dpKfQwGE0zcqAN6iA5a2W1y6C5hoG0s_aVOFZlSEVmuAweMp4M3y70c', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyE0CIRGwCnU9WWsB5M-Xu9QVfAlY5aQUd9_k8qxKw1p7X4dsXlF0zU8Q7RTCeUExYtQv6SojvXCCATs8Wxhd851HD902_oGW8xbtQIB_1ebTXTLSW5ng1n8xZp3uyXCqkGXa3BGyuBVkQhOgBzuzkMpNVID2rbpU97UFxqQlnBz0TtatpcxVGHZIlyif8Vv4xXvDb_VNFbqdynEZNz4m5rBOxkJcHT195QB9lr5NJdtjt7Sm64KeGRN5MtjiGG6GjzGKFwsdoUCk');

-- Tạo index để tối ưu query
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payment_order ON payment(order_id);

-- 9. Bảng Wishlist (Yêu thích)
CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product_wishlist (user_id, product_id)
);

CREATE INDEX idx_wishlist_user ON wishlist(user_id);
