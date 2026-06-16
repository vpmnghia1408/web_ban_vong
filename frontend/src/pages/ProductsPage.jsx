import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopPage } from "../components/products/product/ShopPage.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { productService } from "../services/productService.js";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams(); // Hook để đọc query params từ URL
  const searchQuery = searchParams.get("search") || ""; // Lấy từ khóa tìm kiếm từ URL

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        let response;
        if (searchQuery.trim()) {
          response = await productService.searchProducts(searchQuery);
        } else {
          response = await productService.getAll();
        }
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen min-w-[1024px] selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <ShopPage
        products={products}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
};
