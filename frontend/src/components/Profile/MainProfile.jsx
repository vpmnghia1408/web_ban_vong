import { User, Package, Lock, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { authService } from "../../services/authService.js";
import { orderService } from "../../services/orderService.js";
import { wishlistService } from "../../services/wishlistService.js";
import { anh1, anh3, anh5 } from "../../anh";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "profile", icon: User, label: "Hồ sơ của tôi" },
    { id: "orders", icon: Package, label: "Lịch sử đơn hàng" },
  ];

  return (
    <aside className="flex flex-col py-8 w-56 flex-shrink-0 h-[calc(100vh-80px)] sticky top-20 border-r border-surface-variant/40 bg-surface/50">
      <div className="mb-8 px-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            alt="Ảnh đại diện người dùng"
            className="w-10 h-10 rounded-full object-cover grayscale opacity-90 border-2 border-surface-variant/50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ntQRe8QLHGawJhGpoW5vwG4e_ikHXWsMYveOQf4Tdfh9z2ZPlYOLY6Hr7dVeFLbohgwu8SnkFCkVNJiqUlTvUx61f3hsZ9nLWArwUVGwOcWpwStZIe7V9SoGmNcTENG5c5-UgMPAUmppdIXjEUrOPxkuWfy3aH-JSSNFizY_fOXdMHoUOZ5lI-CJ-CJa87AK7PTJasucv-azBlN07H3o5a9vMj5AisPRv_ZXZJyFo_CjBZZFWcTHKSRgTWY3yrtv5q43mm0KuBc"
          />
          <div>
            <p className="font-headline font-bold text-on-background text-xs">
              Chào mừng trở lại
            </p>
            <p className="text-[9px] uppercase tracking-widest text-on-surface-variant mt-0.5">
              Không gian thành viên
            </p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-2 px-3">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 w-full text-left ${
                isActive
                  ? "bg-surface-container-high text-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-background"
              }`}
            >
              <item.icon strokeWidth={isActive ? 2 : 1.5} size={16} />
              <span className="font-body text-xs tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const PersonalInfoCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync state when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", phone: user.phone || "" });
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await authService.updateProfile(formData.name, formData.phone);
      setIsEditing(false);
      // Optional: force reload to refresh global state if needed
      window.location.reload();
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      alert("Không thể cập nhật thông tin!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-5 bg-surface-container-lowest border border-surface-variant/50 p-5 rounded-2xl shadow-sm flex flex-col h-fit">
      <div>
        <div className="flex justify-between items-center mb-5 border-b border-surface-variant/40 pb-3">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary flex items-center gap-3">
            <span className="w-4 h-[1px] bg-primary/40 inline-block"></span>
            Thông tin cá nhân
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-on-surface-variant hover:text-primary text-[10px] uppercase font-bold tracking-widest transition-all"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="text-stone-400 hover:text-stone-600 text-[10px] uppercase font-bold tracking-widest transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="text-primary hover:text-primary/70 text-[10px] uppercase font-bold tracking-widest transition-all"
              >
                {isLoading ? "Đang lưu..." : "Lưu lại"}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-hover:text-primary transition-colors">
                Họ và tên
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : (
                <p className="text-base font-headline font-semibold text-on-background">
                  {user?.name || "Chưa cập nhật"}
                </p>
              )}
            </div>
            <div className="group min-w-0">
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-hover:text-primary transition-colors">
                Email
              </label>
              <p className="text-sm font-headline text-on-background break-words">
                {user?.email || "Chưa cập nhật"}
              </p>
            </div>
          </div>
          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-hover:text-primary transition-colors">
              Số điện thoại
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            ) : (
              <p className="text-sm font-body text-on-surface">
                {user?.phone || "Chưa cập nhật"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityCard = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await authService.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword,
      );

      setMessage("Đổi mật khẩu thành công.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Không thể đổi mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-span-7 bg-on-background text-surface-container-lowest p-5 rounded-2xl flex flex-col shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full blur-2xl"></div>

      <div className="flex justify-between items-end mb-4 border-b border-surface-container-lowest/10 pb-3 relative z-10">
        <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-surface-container-lowest flex items-center gap-3">
          <Lock size={14} className="text-primary-container" />
          Bảo mật
        </h2>
      </div>

      <p className="text-xs text-surface-container-lowest/70 leading-relaxed mb-4 font-light relative z-10">
        Cập nhật mật khẩu bằng cách xác nhận mật khẩu hiện tại trước.
      </p>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1.5">
            <label
              className="text-[9px] uppercase tracking-wider text-surface-container-lowest/60 font-bold whitespace-nowrap"
              htmlFor="currentPassword"
            >
              Mật khẩu hiện tại
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-surface-container-lowest/10 border border-surface-container-lowest/10 px-3 py-2.5 text-sm text-black placeholder:text-surface-container-lowest/30 outline-none focus:border-primary-container"
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-[9px] uppercase tracking-wider text-surface-container-lowest/60 font-bold whitespace-nowrap"
              htmlFor="newPassword"
            >
              Mật khẩu mới
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-lg bg-surface-container-lowest/10 border border-surface-container-lowest/10 px-3 py-2.5 text-sm text-black placeholder:text-surface-container-lowest/30 outline-none focus:border-primary-container"
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-[9px] uppercase tracking-wider text-surface-container-lowest/60 font-bold whitespace-nowrap"
              htmlFor="confirmPassword"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-lg bg-surface-container-lowest/10 border border-surface-container-lowest/10 px-3 py-2.5 text-sm text-black placeholder:text-surface-container-lowest/30 outline-none focus:border-primary-container"
            />
          </div>
        </div>

        {message && (
          <p className="rounded-lg border border-primary-container/30 bg-primary-container/10 px-3 py-2.5 text-xs text-primary-container">
            {message}
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-300/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: "#6e5b4d",
            color: "#fff6f2",
          }}
          className="mt-4 atelier-gradient text-on-primary py-3 px-6 rounded-lg text-[11px] uppercase font-bold tracking-[0.15em] hover:opacity-90 hover:shadow-lg transition-all relative z-10 w-full disabled:opacity-60"
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </button>
      </form>
    </div>
  );
};

const WishlistSection = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await wishlistService.getWishlist();
        if (response.success) {
          setWishlist(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Không thể tải danh sách yêu thích.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      if (response.success) {
        setWishlist((prev) =>
          prev.filter((item) => item.product_id !== productId),
        );
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  if (loading) {
    return (
      <div className="col-span-12 mt-16">
        <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary mb-3 flex items-center gap-3">
          <span className="w-4 h-[1px] bg-primary/40 inline-block"></span>
          Danh sách yêu thích
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 rounded-2xl bg-stone-100 dark:bg-stone-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12 mt-16">
        <div className="rounded-xl bg-surface-container-low p-8 text-center text-on-surface-variant">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 mt-8">
      <div className="flex flex-row justify-between items-end mb-6 gap-4">
        <div className="-ml-8">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary mb-3 flex items-center gap-3">
            <span className="w-4  h-[1px] bg-primary/40 inline-block"></span>
            Danh sách yêu thích
          </h2>
        </div>
        <Link
          to="/products"
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group pb-1"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.15em] -mt-4">
            Xem tất cả sản phẩm
          </span>
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform -mt-4"
          />
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-8 text-center col-span-12">
          <p className="text-stone-500 mb-6 font-body">
            Bạn chưa yêu thích sản phẩm nào.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center rounded-md bg-[#6e5b4d] px-6 py-3 text-sm text-[#fff6f2] font-semibold hover:opacity-90 transition-opacity"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <Link
              to={`/products/${item.product_id}`}
              key={item.wishlist_id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-surface-container-lowest border border-surface-variant/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative overflow-hidden">
                {item.image_url ? (
                  <img
                    alt={item.name}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    src={item.image_url}
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-stone-200 dark:bg-stone-800" />
                )}
                <button
                  onClick={(e) => handleRemove(item.product_id, e)}
                  title="Bỏ thích"
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-20 shadow hover:bg-red-500 group/btn"
                >
                  <X
                    size={12}
                    className="text-red-500 group-hover/btn:text-white transition-colors"
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-headline font-semibold text-on-background leading-snug line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-on-surface-variant mt-1.5">
                  {formatPrice(item.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "Đang chờ xử lý",
    confirmed: "Đã xác nhận",
    shipped: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  return labels[status] || status;
};

const getStatusClassName = (status) => {
  if (status === "delivered") return "bg-emerald-100 text-emerald-800";
  if (status === "cancelled") return "bg-red-100 text-red-700";
  if (status === "shipped" || status === "confirmed")
    return "bg-amber-100 text-amber-800";
  return "bg-stone-100 text-stone-700";
};

const parseShippingDetails = (order) => {
  const parts = String(order.shipping_address || "")
    .split(" - ")
    .map((part) => part.trim())
    .filter(Boolean);

  const [name = "Chưa cập nhật", street = "", city = "", ...noteParts] = parts;
  const address = [street, city].filter(Boolean).join(" - ");
  const note = noteParts.join(" - ");

  return {
    receiver: `${name}${order.shipping_phone ? ` - ${order.shipping_phone}` : ""}`,
    address: address || order.shipping_address || "Chưa cập nhật",
    note: note || "Không có ghi chú",
  };
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        const orderList = response.data || [];

        const ordersWithItems = await Promise.all(
          orderList.map(async (order) => {
            const detailResponse = await orderService.getOrderDetails(order.id);
            return {
              ...order,
              items: detailResponse.data?.items || [],
            };
          }),
        );

        setOrders(ordersWithItems);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Không thể tải lịch sử đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?"))
      return;
    try {
      await orderService.cancelMyOrder(orderId);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (error) {
      alert(
        "Lỗi khi hủy đơn hàng: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-48 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-8 text-center text-stone-500">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-12 text-center">
        <h3 className="text-xl font-bold mb-2 font-headline">
          Bạn chưa có đơn hàng nào
        </h3>
        <p className="text-sm text-stone-500 mb-6">
          Hãy thêm sản phẩm vào giỏ hàng và tạo đơn đầu tiên của bạn.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm text-on-primary font-semibold hover:opacity-90 transition-opacity"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const itemCount = order.items.reduce(
          (sum, item) => sum + Number(item.quantity),
          0,
        );
        const shippingDetails = parseShippingDetails(order);
        return (
          <div
            key={order.id}
            className="bg-surface-container-lowest border border-surface-variant/50 p-8 rounded-2xl shadow-sm space-y-6"
          >
            <div className="flex justify-between items-start border-b border-surface-variant/40 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                  {getStatusLabel(order.status)}
                </span>
                <h3 className="text-xl font-bold tracking-tight font-headline">
                  Đơn hàng #{order.id}
                </h3>
                <p className="text-sm text-stone-500">
                  Đặt lúc {formatDate(order.created_at)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusClassName(order.status)} mb-2`}
                >
                  {order.status}
                </span>
                <p className="text-xs text-stone-400 uppercase tracking-widest">
                  Tổng cộng
                </p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(order.total_price)}
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-lg bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 px-5 py-4 text-sm text-stone-600 dark:text-stone-300">
              <p>
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  Người nhận:
                </span>{" "}
                {shippingDetails.receiver}
              </p>
              <p>
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  Địa chỉ:
                </span>{" "}
                {shippingDetails.address}
              </p>
              <p>
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  Ghi chú:
                </span>{" "}
                {shippingDetails.note}
              </p>
            </div>

            <div className="flex flex-row items-end justify-between gap-10">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4 items-center">
                  {order.items.slice(0, 3).map((item) => (
                    <Link
                      to={`/products/${item.product_id}`}
                      key={item.id}
                      className="w-20 h-24 bg-stone-100 dark:bg-stone-800 rounded overflow-hidden border border-white shadow-sm flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      {item.image_url ? (
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image_url}
                        />
                      ) : (
                        <div className="h-full w-full bg-stone-200 dark:bg-stone-700" />
                      )}
                    </Link>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-full border-2 border-white text-xs font-bold text-stone-700 dark:text-stone-200 ml-4 z-10">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-stone-500 whitespace-nowrap">
                  Số lượng: {itemCount}
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-8 py-3 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold rounded-md transition-colors"
                  >
                    Hủy đơn
                  </button>
                )}
                {order.status === "delivered" && (
                  <button
                    onClick={() =>
                      alert(
                        "Chức năng đánh giá sẽ ra mắt trong bản cập nhật tới!",
                      )
                    }
                    className="px-3 py-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-[10px] font-semibold rounded-lg transition-colors border border-yellow-200"
                  >
                    Đánh giá
                  </button>
                )}
                <Link
                  to="/products"
                  className="px-8 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-sm font-semibold rounded-md transition-colors"
                >
                  Mua thêm
                </Link>
                {order.status !== "delivered" &&
                  order.status !== "cancelled" && (
                    <Link
                      to={`/orders?search=${order.id}`}
                      className="px-8 py-3 bg-primary text-on-primary hover:opacity-90 text-sm font-semibold rounded-md transition-opacity shadow-sm"
                    >
                      Theo dõi đơn
                    </Link>
                  )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const MainProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-grow pt-[80px] flex max-w-5xl mx-auto w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow px-8 py-8 overflow-x-hidden">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-on-background mb-1 font-headline">
            Bảng điều khiển tài khoản
          </h1>
          <p className="text-on-surface-variant font-body text-sm tracking-wide">
            {activeTab === "profile"
              ? "Quản lý thông tin cá nhân, mật khẩu và các lựa chọn yêu thích."
              : "Theo dõi các đơn hàng bạn đã đặt và xem lại trạng thái vận chuyển."}
          </p>
        </header>

        {activeTab === "profile" ? (
          <div className="grid grid-cols-12 gap-6">
            <PersonalInfoCard user={user} />
            <SecurityCard />
            <WishlistSection />
          </div>
        ) : (
          <div className="max-w-4xl">
            <OrdersSection />
          </div>
        )}
      </main>
    </div>
  );
};
