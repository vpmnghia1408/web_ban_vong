import { useEffect, useState } from "react";
import { MainCart } from "../components/Cart/MainCart.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { cartService } from "../services/cartService.js";
import { localCartService } from "../services/localCartService.js";
import { useAuth } from "../context/AuthContext.jsx";

export const CartPage = () => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingProductId, setUpdatingProductId] = useState(null);

  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems(localCartService.getCart());
      setError("");
      setLoading(false);
      return;
    }

    try {
      const response = await cartService.getCart();
      setCartItems(response.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Khong the tai gio hang.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCart();
  }, [isLoggedIn]);

  const handleUpdateQuantity = async (productId, nextQuantity) => {
    if (nextQuantity < 1) {
      return;
    }

    setUpdatingProductId(productId);

    try {
      if (!isLoggedIn) {
        const items = localCartService.updateQuantity(productId, nextQuantity);
        setCartItems(items);
        return;
      }

      await cartService.updateQuantity(productId, nextQuantity);
      await fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error updating cart:", error);
      setError(error.response?.data?.message || "Khong the cap nhat gio hang.");
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleRemoveItem = async (productId) => {
    setUpdatingProductId(productId);

    try {
      if (!isLoggedIn) {
        const items = localCartService.removeFromCart(productId);
        setCartItems(items);
        return;
      }

      await cartService.removeFromCart(productId);
      await fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error removing cart item:", error);
      setError(error.response?.data?.message || "Khong the xoa san pham.");
    } finally {
      setUpdatingProductId(null);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <MainCart
        items={cartItems}
        loading={loading}
        error={error}
        updatingProductId={updatingProductId}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <Footer />
    </div>
  );
};
