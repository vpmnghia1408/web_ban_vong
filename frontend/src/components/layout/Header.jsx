import { useEffect, useState } from "react";
import { Package, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cartService } from "../../services/cartService.js";
import { localCartService } from "../../services/localCartService.js";
import { orderService } from "../../services/orderService.js";

export const Header = ({ isAuthPage = false }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const navLinkClass = (path) => {
    const isActive =
      path === "/"
        ? location.pathname === path
        : location.pathname.startsWith(path);

    return [
      "font-medium transition-colors",
      isActive
        ? "text-stone-900 dark:text-white border-b-2 border-primary pb-1"
        : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white",
    ].join(" ");
  };

  const fetchCartCount = async () => {
    if (!localStorage.getItem("token")) {
      setCartCount(localCartService.getCount());
      return;
    }

    try {
      const response = await cartService.getCart();
      const count = (response.data || []).reduce(
        (sum, item) => sum + Number(item.quantity),
        0,
      );
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  const fetchOrderCount = async () => {
    if (!localStorage.getItem("token")) {
      setOrderCount(0);
      return;
    }

    try {
      const response = await orderService.getMyOrders();
      const orders = response.data?.data || [];
      const activeCount = orders.filter((order) =>
        ["pending", "confirmed", "shipped"].includes(order.status),
      ).length;
      setOrderCount(activeCount);
    } catch {
      setOrderCount(0);
    }
  };

  useEffect(() => {
    if (isAuthPage) return;

    fetchCartCount();
    fetchOrderCount();
    window.addEventListener("cart-updated", fetchCartCount);
    window.addEventListener("order-updated", fetchOrderCount);

    return () => {
      window.removeEventListener("cart-updated", fetchCartCount);
      window.removeEventListener("order-updated", fetchOrderCount);
    };
  }, [isAuthPage, isLoggedIn]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
      setIsSearchOpen(false);
      setSearchVal("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isAuthPage) {
    return (
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-10 py-5">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tighter text-[#30332f]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            VÒNG TAY HƯƠNG TRẦM
          </Link>
          <div className="hidden gap-7 md:flex">
            {["Bộ sưu tập", "Tư vấn phong thủy", "Câu chuyện"].map((item) => (
              <Link
                key={item}
                to={item === "Bộ sưu tập" ? "/products" : "/about"}
                className="text-sm text-[#5d605b] transition-opacity hover:opacity-55"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-stone-50/80 shadow-md backdrop-blur-xl dark:bg-stone-950/80 dark:shadow-lg">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-3 lg:px-12">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tighter text-stone-900 dark:text-stone-50"
        >
          VÒNG TAY HƯƠNG TRẦM
        </Link>

        <div className="flex items-center space-x-6 text-sm">
          <Link className={navLinkClass("/")} to="/">
            Trang chủ
          </Link>
          <Link className={navLinkClass("/products")} to="/products">
            Sản phẩm
          </Link>
          <Link className={navLinkClass("/about")} to="/about">
            Giới thiệu
          </Link>
          <Link className={navLinkClass("/contact")} to="/contact">
            Liên hệ
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-stone-800 dark:text-stone-200">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-lg p-2 transition-opacity hover:opacity-70 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            to="/cart"
            className="relative rounded-lg p-2 transition-opacity hover:opacity-70 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={isLoggedIn ? "/orders" : "/login"}
            state={!isLoggedIn ? { from: "/orders" } : undefined}
            className="relative rounded-lg p-2 transition-opacity hover:opacity-70 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
            aria-label="Đơn hàng"
          >
            <Package className="h-5 w-5" />
            {orderCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                {orderCount}
              </span>
            )}
          </Link>

          <Link to={isLoggedIn ? "/profile" : "/login"}>
            <button className="rounded-lg p-2 transition-opacity hover:opacity-70 hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
              <User className="h-5 w-5" />
            </button>
          </Link>

          <div className="h-6 w-px bg-stone-300 dark:bg-stone-700" />

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Xin chào
                </p>
                <p className="text-sm font-semibold text-stone-900 dark:text-white">
                  {user?.name}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-md"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-200/60"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-stone-200 bg-white px-8 py-4 shadow-inner dark:border-stone-800 dark:bg-stone-900">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-screen-xl items-center gap-4"
          >
            <Search className="h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Nhập tên sản phẩm cần tìm..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="flex-1 border-none bg-transparent py-1 text-sm outline-none focus:ring-0 dark:text-white"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-primary transition-opacity hover:opacity-95"
              >
                Tìm kiếm
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchVal("");
                }}
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};
