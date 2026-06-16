import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Boxes,
  ClipboardList,
  DollarSign,
  Package,
} from "lucide-react";
import { orderService } from "../../../services/orderService.js";
import { productService } from "../../../services/productService.js";
import { categoryService } from "../../../services/categoryService.js";

const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

const statusLabel = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  shipped: "Đang giao",
  delivered: "Hoàn tất",
  cancelled: "Đã hủy",
};

const StatCard = ({ title, value, description, icon: Icon, tone = "default" }) => {
  const tones = {
    default: "bg-white text-[#30332f]",
    primary: "bg-[#6e5b4d] text-white",
    warning: "bg-[#fff7ed] text-[#7c2d12]",
  };

  return (
    <div className={`rounded-2xl border border-stone-200/70 p-6 shadow-sm ${tones[tone]}`}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
            {title}
          </p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">{value}</p>
        </div>
        <div className="rounded-xl bg-black/5 p-3">
          <Icon size={22} />
        </div>
      </div>
      <p className="text-sm opacity-70">{description}</p>
    </div>
  );
};

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [orderResponse, productResponse, categoryResponse] =
          await Promise.all([
            orderService.getAllOrders(),
            productService.getAll(),
            categoryService.getAllCategories(),
          ]);

        setOrders(orderResponse.data || []);
        setProducts(productResponse.data || []);
        setCategories(categoryResponse.data || []);
      } catch (err) {
        console.error("Error loading admin dashboard:", err);
        setError("Không thể tải dữ liệu dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = useMemo(() => {
    const validOrders = orders.filter((order) => order.status !== "cancelled");
    const revenue = validOrders.reduce(
      (sum, order) => sum + Number(order.total_price || 0),
      0,
    );
    const pendingOrders = orders.filter((order) => order.status === "pending");

    return {
      revenue,
      totalOrders: orders.length,
      pendingOrders: pendingOrders.length,
      products: products.length,
      categories: categories.length,
    };
  }, [orders, products, categories]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-2xl bg-surface-container-low animate-pulse" />
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 rounded-2xl bg-surface-container-low animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-[#30332f] p-8 text-white">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#cfa47e]">
              Dashboard tổng quan
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
              Theo dõi vận hành cửa hàng
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Tổng hợp doanh thu, đơn hàng và trạng thái xử lý để bạn nắm nhanh
              tình hình kinh doanh trong ngày.
            </p>
          </div>
          <div className="hidden rounded-2xl bg-white/10 p-4 lg:block">
            <ArrowUpRight size={34} className="text-[#cfa47e]" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-5">
        <StatCard
          title="Tổng doanh thu"
          value={formatPrice(stats.revenue)}
          description="Tính trên các đơn chưa bị hủy."
          icon={DollarSign}
          tone="primary"
        />
        <StatCard
          title="Tổng đơn hàng"
          value={stats.totalOrders}
          description="Tổng số đơn đã phát sinh trong hệ thống."
          icon={ClipboardList}
        />
        <StatCard
          title="Đơn chờ xử lý"
          value={stats.pendingOrders}
          description="Các đơn cần xác nhận và xử lý tiếp."
          icon={AlertCircle}
          tone="warning"
        />
      </section>

      <section className="grid grid-cols-5 gap-5">
        <div className="col-span-3 rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Đơn gần đây
              </p>
              <h2 className="mt-1 text-xl font-bold text-on-background">
                Theo dõi đơn mới nhất
              </h2>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-5 py-4"
              >
                <div>
                  <p className="font-bold text-on-background">#{order.id}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    {statusLabel[order.status] || order.status}
                  </p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(order.total_price)}
                </p>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="py-8 text-center text-sm text-on-surface-variant">
                Chưa có đơn hàng nào.
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 space-y-5">
          <StatCard
            title="Sản phẩm"
            value={stats.products}
            description="Sản phẩm đang có trong cửa hàng."
            icon={Package}
          />
          <StatCard
            title="Danh mục"
            value={stats.categories}
            description="Nhóm sản phẩm đang được quản lý."
            icon={Boxes}
          />
        </div>
      </section>
    </div>
  );
};
