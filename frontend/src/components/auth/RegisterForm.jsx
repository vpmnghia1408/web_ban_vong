import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, phone, password, confirmPassword);
      navigate("/login", { state: location.state || { from: "/" } });
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-stone-200/80 bg-white/85 px-11 py-3.5 text-sm text-on-background outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 placeholder:text-stone-400";

  const FieldIcon = ({ icon: Icon }) => (
    <Icon
      size={17}
      className="absolute left-4 top-1/2 -translate-y-[25%] text-stone-400"
    />
  );

  return (
    <div className="w-full max-w-[460px] rounded-2xl border border-white/70 bg-white/85 p-8 shadow-[0_28px_90px_rgba(48,51,47,0.16)] backdrop-blur-xl">
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Thành viên mới
        </p>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-background">
          Tạo tài khoản
        </h1>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          Lưu giỏ hàng, theo dõi đơn và nhận tư vấn chọn vòng trầm phù hợp với
          bạn.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Họ và tên
            </label>
            <div className="relative">
              <FieldIcon icon={User} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className={inputClass}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Email
            </label>
            <div className="relative">
              <FieldIcon icon={Mail} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Số điện thoại
            </label>
            <div className="relative">
              <FieldIcon icon={Phone} />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09XXXXXXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Mật khẩu
            </label>
            <div className="relative">
              <FieldIcon icon={Lock} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant whitespace-nowrap">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <FieldIcon icon={Lock} />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary"
          />
          <span className="text-xs leading-5 text-on-surface-variant">
            Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật của cửa
            hàng.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300/50 bg-on-background px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-stone-900/10 transition hover:bg-primary disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-on-surface-variant">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          state={location.state}
          className="font-bold text-primary transition hover:opacity-70"
        >
          Đăng nhập tại đây
        </Link>
      </p>
    </div>
  );
};
