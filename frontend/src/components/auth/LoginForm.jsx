import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cartService } from "../../services/cartService.js";
import { localCartService } from "../../services/localCartService.js";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  console.log("LoginForm location state:", location.state); // Debug: Kiểm tra state truyền vào LoginForm

  const syncGuestCart = async () => {
    const guestItems = localCartService.getCart();
    if (guestItems.length === 0) return;

    try {
      await Promise.all(
        guestItems.map((item) =>
          cartService.addToCart(item.product_id, item.quantity),
        ),
      );
      localCartService.clearCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.warn("Không thể đồng bộ giỏ khách:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(email, password);

      if (Number(response.user?.role_id) === 0) {
        localCartService.clearCart();
        window.dispatchEvent(new Event("cart-updated"));
        navigate("/admin", { replace: true });
        return;
      }

      await syncGuestCart();

      const targetPath = location.state?.from || "/";
      const checkoutState = location.state?.checkoutState || undefined;
      navigate(targetPath, { replace: true, state: checkoutState });
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-stone-200/80 bg-white/85 px-11 py-3.5 text-sm text-on-background outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 placeholder:text-stone-400";

  return (
    <div className="w-full max-w-[430px] rounded-2xl border border-white/70 bg-white/85 p-8 shadow-[0_28px_90px_rgba(48,51,47,0.16)] backdrop-blur-xl">
      <div className="mb-7">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingBag size={20} />
        </div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Tài khoản khách hàng
        </p>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-background">
          Đăng nhập
        </h1>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          Tiếp tục thanh toán, theo dõi đơn hàng và lưu các mẫu vòng trầm bạn
          yêu thích.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-[25%] text-stone-400"
            />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              className="block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-primary hover:opacity-70"
            >
              Quên mật khẩu?
            </button>
          </div>
          <div className="relative">
            <Lock
              size={17}
              className="absolute left-4 top-1/2 -translate-y-[25%] text-stone-400"
            />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300/50 bg-on-background px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-stone-900/10 transition hover:bg-primary disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-on-surface-variant">
        Chưa có tài khoản?{" "}
        <Link
          to="/register"
          state={location.state}
          className="font-bold text-primary transition hover:opacity-70"
        >
          Đăng ký tại đây
        </Link>
      </p>
    </div>
  );
};
