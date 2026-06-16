import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainProductDetail } from "../components/products/ProductDetail/MainProductDetail.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { productService } from "../services/productService.js";

export const ProductsDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const [productResponse, productsResponse] = await Promise.all([
          productService.getProductById(id),
          productService.getAll(),
        ]);

        setProduct(productResponse.data); // Lưu 1 chi tiết sản phẩm vào state
        setRelatedProducts(
          // lưu 4 sản phẩm liên quan vào state (loại bỏ sản phẩm đang xem)
          (productsResponse.data || [])
            .filter((item) => String(item.id) !== String(id))
            .slice(0, 4),
        );
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setError("Khong the tai chi tiet san pham.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  return (
    <div>
      <Header />
      <MainProductDetail
        product={product}
        relatedProducts={relatedProducts}
        loading={loading}
        error={error}
      />
      <Footer />
    </div>
  );
};
