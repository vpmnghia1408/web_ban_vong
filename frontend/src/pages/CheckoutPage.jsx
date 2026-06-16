import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutMain } from "../components/checkout/CheckoutMain.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { cartService } from "../services/cartService.js";

export const CheckoutPage = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // buyNowItems: truyền thẳng từ trang chi tiết (Mua ngay)
  const buyNowItems = location.state?.buyNowItems || null;
  // selectedIds: chọn từ giỏ hàng
  const selectedIds = location.state?.selectedIds || null;

  console.log("STATE:", location.state); // Debug: Kiểm tra state truyền vào CheckoutPage

  useEffect(() => {
    // Nếu là "Mua ngay" → không cần fetch giỏ hàng
    if (buyNowItems) {
      setCartItems(buyNowItems);
      setLoading(false);
      return;
    }

    // Fetch giỏ hàng từ API
    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        let items = response.data || [];

        // Nếu có selectedIds → chỉ lấy sản phẩm được chọn
        if (selectedIds && selectedIds.length > 0) {
          const idSet = new Set(selectedIds);
          items = items.filter((item) => idSet.has(item.product_id));
        }

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching checkout cart:", error);
        setError("Không thể tải thông tin giỏ hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container font-body">
      <Header />
      <CheckoutMain
        items={cartItems}
        loading={loading}
        error={error}
        isBuyNow={!!buyNowItems}
      />
      <Footer />
    </div>
  );
};
