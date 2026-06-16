import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { cartService } from "../../../services/cartService.js";
import { localCartService } from "../../../services/localCartService.js";
import { wishlistService } from "../../../services/wishlistService.js";
import { Heart } from "lucide-react";
import { anh1 } from "../../../anh";
import { formatPrice } from "./shopUtils";
import { RelatedProductCard } from "./RelatedProductCard";
import { ProductDetailSkeleton } from "./Loading";

export const MainProductDetail = ({
  product, // 1 sản phẩm chi tiết
  relatedProducts = [], // 4 sản phẩm liên quan
  loading,
  error,
}) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  // Kiểm tra xem sản phẩm đã được thêm vào yêu thích của người dùng hay chưa
  useEffect(() => {
    const checkIsFavorited = async () => {
      if (isLoggedIn && product?.id) {
        try {
          const res = await wishlistService.getWishlist();
          if (res.success && res.data) {
            const isFav = res.data.some(
              (item) => item.product_id === product.id,
            );
            setIsFavorited(isFav);
          }
        } catch (err) {
          console.error("Error checking wishlist status:", err);
        }
      }
    };
    checkIsFavorited();
  }, [isLoggedIn, product?.id]);

  // Xử lý thêm/bỏ yêu thích sản phẩm
  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      if (isFavorited) {
        const res = await wishlistService.removeFromWishlist(product.id);
        if (res.success) {
          setIsFavorited(false);
        }
      } else {
        const res = await wishlistService.addToWishlist(product.id);
        if (res.success) {
          setIsFavorited(true);
        }
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-20">
        <div className="rounded-lg bg-surface-container-low p-10 text-center text-on-surface-variant">
          {error}
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-20">
        <div className="rounded-lg bg-surface-container-low p-10 text-center text-on-surface-variant">
          Không tìm thấy sản phẩm.
        </div>
      </main>
    );
  }

  const handleAddToCart = async () => {
    setAddingToCart(true);
    setCartMessage("");

    try {
      if (!isLoggedIn) {
        localCartService.addToCart(product, qty);
        setCartMessage(`Đã thêm ${qty} sản phẩm vào giỏ hàng.`);
        setCartMessage(`Đã thêm ${qty} sản phẩm vào giỏ hàng.`);
        return;
      }

      await cartService.addToCart(product.id, qty);
      window.dispatchEvent(new Event("cart-updated"));
      setCartMessage(`Đã thêm ${qty} sản phẩm vào giỏ hàng.`);
      setCartMessage(`Đã thêm ${qty} sản phẩm vào giỏ hàng.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage(
        error.response?.data?.message ||
          "Không thể thêm sản phẩm vào giỏ hàng.",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    const buyNowItems = [
      {
        id: product.id,
        product_id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        quantity: qty,
      },
    ];

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: "/checkout",
          checkoutState: { buyNowItems },
        },
      });
      return;
    }
    // Mua ngay: không thêm vào giỏ hàng, truyền thẳng sang checkout
    navigate("/checkout", {
      state: { buyNowItems },
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-8 pt-8">
      <section className="grid grid-cols-12 gap-8 lg:gap-12 mb-20">
        <div className="col-span-6 flex flex-col gap-6">
          <div className="relative group">
            {product.image_url ? (
              <img
                alt={product.name}
                className="w-full max-h-[620px] aspect-[4/5] object-cover rounded-lg shadow-sm"
                src={product.image_url}
              />
            ) : (
              <div className="w-full max-h-[620px] aspect-[4/5] rounded-lg bg-surface-container-high" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            {product.image_url ? (
              <>
                <img
                  alt={`${product.name} chi tiết`}
                  className="w-full aspect-square object-cover rounded-lg"
                  src={product.image_url_2 || product.image_url}
                />
                <img
                  alt={`${product.name} xem trước`}
                  className="w-full aspect-square object-cover rounded-lg mt-8"
                  src={product.image_url_3 || product.image_url}
                />
              </>
            ) : (
              <>
                <div className="w-full aspect-square rounded-lg bg-surface-container-high" />
                <div className="w-full aspect-square rounded-lg mt-8 bg-surface-container-high" />
              </>
            )}
          </div>
        </div>

        <div className="col-span-6 pt-0 lg:pt-5">
          <div className="sticky top-28 space-y-6">
            <header className="space-y-3">
              <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                <span>Trầm hương</span>
                <span className="material-symbols-outlined text-[10px]">
                  chevron_right
                </span>
                <span>Vòng tay</span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-headline font-extrabold tracking-tight text-on-background">
                {product.name}
              </h1>
              <p className="text-xl font-light text-primary">
                {formatPrice(product.price)}
              </p>
            </header>

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-on-surface-variant max-w-md">
                {product.description || "Sản phẩm hiện chưa có mô tả."}
              </p>
              <div className="flex flex-wrap gap-3 py-3">
                <span className="px-0 py-1.5 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant">
                  Số lượng còn lại: {product.quantity}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-3">
              {/* ── Chọn số lượng ── */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-on-surface-variant tracking-wide">
                  Số lượng
                </span>
                <div className="flex items-center border border-outline-variant/30 rounded-md overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 text-base font-light"
                  >
                    −
                  </button>
                  <span className="w-11 h-10 flex items-center justify-center text-sm font-semibold text-on-background border-x border-outline-variant/20 select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(product.quantity || 99, q + 1))
                    }
                    disabled={qty >= (product.quantity || 99)}
                    className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 text-base font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ── Mua ngay ── */}
              <button
                onClick={handleBuyNow}
                disabled={buyingNow || addingToCart}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-semibold rounded-md shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                {buyingNow ? "Đang xử lý..." : "Mua ngay"}
              </button>

              {/* ── Thêm vào giỏ hàng ── */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || buyingNow}
                className="w-full py-3.5 font-semibold transition-all duration-200 rounded-md border border-primary/40 text-primary hover:bg-primary/5 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shopping_bag
                </span>
                {addingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>

              {cartMessage && (
                <p className="text-sm text-center text-on-surface-variant animate-fade-in">
                  {cartMessage}
                </p>
              )}

              {/* ── Yêu thích ── */}
              <button
                onClick={handleToggleWishlist}
                className={`w-full py-3.5 font-semibold transition-all duration-300 rounded-md border flex items-center justify-center gap-3 ${
                  isFavorited
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 shadow-sm"
                    : "text-[#6e5b4d] hover:bg-stone-50 border-stone-200"
                }`}
              >
                <Heart
                  size={18}
                  className={isFavorited ? "fill-red-500 text-red-500" : ""}
                />
                {isFavorited ? "Đã thích" : "Thêm vào yêu thích"}
              </button>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                  <span className="font-bold tracking-tight text-on-background">
                    Thông số vòng tay
                  </span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="pt-4 text-on-surface-variant text-sm leading-relaxed">
                  Số hạt, kích thước hạt, loại gỗ trầm hương và kích thước vòng
                  sẽ được điều chỉnh vừa vặn với cổ tay của quý khách.
                </div>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                  <span className="font-bold tracking-tight text-on-background">
                    Giao hàng & Tư vấn chọn size
                  </span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="pt-4 text-on-surface-variant text-sm leading-relaxed">
                  Hỗ trợ giao hàng miễn phí toàn quốc, tặng kèm hộp gấm cao cấp,
                  dây thun dự phòng và hướng dẫn bảo quản trầm hương đúng cách.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low rounded-lg p-8 lg:p-12 flex flex-row lg:flex-row items-center gap-10 mb-24">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-headline font-bold tracking-tight text-on-background">
            Nghệ thuật của hương thơm
          </h2>
          <p className="text-base leading-relaxed text-on-surface-variant italic">
            "Hương trầm nhẹ thoảng mang lại tĩnh lặng cho tâm hồn, xua tan căng
            thẳng và thu hút năng lượng bình an."
          </p>
          <div className="space-y-4 text-on-surface-variant">
            <p>
              Mỗi chiếc vòng trầm được xâu chuỗi tỉ mỉ từ những hạt trầm hương
              tự nhiên chọn lọc, mang vân gỗ đẹp mắt và hương thơm bền lâu theo
              thời gian.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <img
            alt="Vòng tay trầm hương tự nhiên cao cấp"
            className="w-full max-h-[420px] object-cover rounded-lg shadow-xl translate-x-4 lg:translate-x-8 translate-y-6"
            src={anh1}
          />
          <div className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-6 shadow-sm rounded-lg hidden lg:block max-w-[240px]">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Hương thơm tự nhiên
            </p>
            <p className="text-sm text-on-surface-variant leading-snug">
              Trầm hương tích tụ năng lượng của đất trời, khi đeo trên tay toả
              ra hương thơm dịu nhẹ giúp thư giãn và mang lại may mắn.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="flex justify-between items-end mb-8 px-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Gợi ý cùng phong cách
            </span>
            <h2 className="text-2xl font-headline font-extrabold tracking-tight text-on-background">
              Có thể bạn cũng thích
            </h2>
          </div>
          <Link
            className="text-primary font-semibold border-b border-primary pb-1 hover:opacity-70 transition-opacity"
            to="/products"
          >
            Xem bộ sưu tập
          </Link>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.length === 0 && (
            <div className="col-span-full rounded-lg bg-surface-container-low p-8 text-center text-on-surface-variant">
              Chưa có sản phẩm liên quan để hiển thị.
            </div>
          )}

          {relatedProducts.map((item, index) => (
            <RelatedProductCard
              key={item.id}
              product={item}
              isOffset={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
