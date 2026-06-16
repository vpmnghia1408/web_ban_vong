import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ClipboardList,
  Filter,
  Search,
  Trash2,
  Truck,
} from "lucide-react";
import { orderService } from "../../../services/orderService.js";

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipped", label: "Đang giao" },
  { value: "delivered", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã hủy" },
];

const statusClass = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
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

export const QlOrderMain = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // fetch orders từ backend
  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data || []);
      setError("");
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Tính toán thống kê
  const stats = useMemo(() => {
    const validOrders = orders.filter((order) => order.status !== "cancelled");
    return {
      revenue: validOrders.reduce(
        (sum, order) => sum + Number(order.total_price || 0),
        0,
      ),
      total: orders.length,
      pending: orders.filter((order) => order.status === "pending").length,
      shipping: orders.filter((order) => order.status === "shipped").length,
    };
  }, [orders]);

  // Lọc đơn hàng theo search và status
  const filteredOrders = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesKeyword =
        !keyword ||
        String(order.id).includes(keyword) ||
        String(order.user_id).includes(keyword) ||
        String(order.shipping_address || "")
          .toLowerCase()
          .includes(keyword);
      return matchesStatus && matchesKeyword;
    });
  }, [orders, searchQuery, statusFilter]);

  // Cập nhật status đơn hàng
  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    console.log(status);
    try {
      await orderService.updateOrderStatus(orderId, status);
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
      window.dispatchEvent(new Event("order-updated"));
    } catch (err) {
      console.error("Error updating order:", err);
      setError(err.response?.data?.message || "Không thể cập nhật đơn hàng.");
    } finally {
      setUpdatingId(null);
    }
  };

  // xóa đơn hàng
  const handleDelete = async (order) => {
    if (!window.confirm(`Bạn có chắc muốn xóa đơn hàng #${order.id}?`)) {
      return;
    }

    setUpdatingId(order.id);
    try {
      await orderService.deleteOrder(order.id);
      setOrders((current) => current.filter((item) => item.id !== order.id));
      window.dispatchEvent(new Event("order-updated"));
    } catch (err) {
      console.error("Error deleting order:", err);
      setError(err.response?.data?.message || "Không thể xóa đơn hàng.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-4 gap-5">
        <div className="rounded-2xl bg-[#30332f] p-6 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
            Tổng doanh thu
          </p>
          <p className="mt-3 text-2xl font-extrabold">
            {formatPrice(stats.revenue)}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm">
          <ClipboardList className="mb-3 text-primary" size={22} />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            Tổng đơn
          </p>
          <p className="mt-2 text-2xl font-extrabold">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <AlertCircle className="mb-3 text-amber-700" size={22} />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
            Chờ xử lý
          </p>
          <p className="mt-2 text-2xl font-extrabold text-amber-800">
            {stats.pending}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm">
          <Truck className="mb-3 text-primary" size={22} />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            Đang giao
          </p>
          <p className="mt-2 text-2xl font-extrabold">{stats.shipping}</p>
        </div>
      </section>

      <section className="space-y-5 rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Quản lý đơn hàng
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background">
              Danh sách đơn hàng
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-[30%] text-stone-400"
              />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Tìm mã đơn, user, địa chỉ..."
                className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="relative">
              <Filter
                size={16}
                className="absolute left-4 top-1/2 -translate-y-[27%] text-stone-400"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-8 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-stone-200/70">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Mã đơn</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Ngày đặt</th>
                <th className="px-5 py-4">Địa chỉ</th>
                <th className="px-5 py-4 text-right">Tổng tiền</th>
                <th className="px-5 py-4">Trạng thái</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading &&
                [1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td colSpan={7} className="px-5 py-4">
                      <div className="h-12 rounded-lg bg-stone-100 animate-pulse" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="px-5 py-4 font-bold">#{order.id}</td>
                    <td className="px-5 py-4 text-sm">User #{order.user_id}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="max-w-[260px] truncate px-5 py-4 text-sm text-on-surface-variant">
                      {order.shipping_address || "Chưa cập nhật"}
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-primary">
                      {formatPrice(order.total_price)}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(event) =>
                          handleStatusChange(order.id, event.target.value)
                        }
                        className={`rounded-full border-none px-3 py-1 text-xs font-bold outline-none ${
                          statusClass[order.status] ||
                          "bg-stone-100 text-on-surface"
                        }`}
                      >
                        {statusOptions
                          .filter((option) => option.value !== "all")
                          .map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(order)}
                        disabled={updatingId === order.id}
                        className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-on-surface-variant"
                  >
                    Không tìm thấy đơn hàng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
