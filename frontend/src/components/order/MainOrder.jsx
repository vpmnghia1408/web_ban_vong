import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronRight, PackageCheck, Search } from "lucide-react";

const formatPrice = (price) => {
  const numberPrice = Number(price);

  if (Number.isNaN(numberPrice)) {
    return price;
  }

  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

const formatDate = (date) => {
  if (!date) {
    return "";
  }

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
  if (status === "delivered") {
    return "bg-primary-container text-on-primary-container";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  if (status === "shipped" || status === "confirmed") {
    return "bg-secondary-container/40 text-secondary";
  }

  return "bg-surface-container-high text-on-surface-variant";
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

const BreadcrumbsNav = () => (
  <nav className="max-w-7xl mx-auto px-8 mb-12">
    <ol className="flex items-center space-x-3 text-xs uppercase tracking-widest text-on-surface-variant font-body">
      <li>
        <Link className="hover:text-primary transition-colors" to="/">
          Trang chủ
        </Link>
      </li>
      <li className="flex items-center space-x-3">
        <ChevronRight size={14} />
        <Link className="hover:text-primary transition-colors" to="/profile">
          Tài khoản
        </Link>
      </li>
      <li className="flex items-center space-x-3">
        <ChevronRight size={14} />
        <span className="text-on-surface font-semibold">Đơn hàng</span>
      </li>
    </ol>
  </nav>
);

const OrderHistoryHero = ({ orderCount }) => (
  <section className="max-w-7xl mx-auto px-8 mb-20 font-body">
    <div className="grid grid-cols-12 gap-12 items-end">
      <div className="col-span-5">
        <h1 className="text-5xl font-extrabold tracking-tighter text-on-background mb-6 font-headline">
          Lịch sử đơn hàng
        </h1>
        <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
          Theo dõi các đơn hàng bạn đã đặt và xem lại những sản phẩm trong từng
          đơn.
        </p>
      </div>
      <div className="col-span-7">
        <div className="relative h-[240px] w-full overflow-hidden rounded-lg bg-surface-container-low">
          <div className="absolute inset-0 flex items-center justify-between px-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-3">
                Tổng số đơn
              </p>
              <p className="text-7xl font-headline font-extrabold text-primary">
                {orderCount}
              </p>
            </div>
            <PackageCheck size={112} className="text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const OrderTabs = ({
  searchKeyword,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  const tabs = [
    { value: "all", label: "Tất cả đơn hàng" },
    { value: "processing", label: "Đang xử lý" },
    { value: "delivered", label: "Hoàn tất" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const tabClass = (value) =>
    [
      "whitespace-nowrap text-sm pb-4 -mb-[18px] transition-colors",
      statusFilter === value
        ? "font-semibold text-on-background border-b-2 border-primary"
        : "font-medium text-on-surface-variant hover:text-primary border-b-2 border-transparent",
    ].join(" ");

  return (
    <section className="max-w-7xl mx-auto px-8 mb-16 font-body">
      <div className="flex flex-row items-center justify-between gap-8 border-b border-outline-variant/15 pb-4">
        <div className="flex space-x-8 overflow-x-visible pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onStatusChange(tab.value)}
              className={tabClass(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex h-12 w-72 items-center gap-3 rounded-lg border border-outline-variant/20 bg-surface-container px-4 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <Search className="h-5 w-5 flex-shrink-0 text-on-surface-variant" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent border-none p-0 text-sm leading-none outline-none focus:ring-0 placeholder:text-on-surface-variant/60"
            placeholder="Tìm theo mã đơn..."
            type="text"
            value={searchKeyword}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

const OrderCard = ({ order, onCancelOrder }) => {
  const previewItems = order.items.slice(0, 3);
  const itemCount = order.items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const shippingDetails = parseShippingDetails(order);

  return (
    <div className="group bg-surface-container-lowest hover:shadow-[0_28px_60px_rgba(110,91,77,0.10)] transition-all duration-500 overflow-hidden rounded-xl border border-stone-300/80 dark:border-stone-700/80 shadow-sm font-body">
      <div className="p-10">
        <div className="flex flex-row items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
              {getStatusLabel(order.status)}
            </span>
            <h3 className="text-xl font-bold tracking-tight font-headline">
              #{order.id}
            </h3>
            <p className="text-sm text-on-surface-variant">
              Đặt lúc {formatDate(order.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1.5 rounded-full ${getStatusClassName(order.status)} text-xs font-semibold tracking-wide uppercase`}
            >
              {order.status}
            </span>
            <div className="h-8 w-px bg-outline-variant/20 block" />
            <div className="text-right">
              <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">
                Tổng cộng
              </p>
              <p className="text-xl font-bold text-on-surface">
                {formatPrice(order.total_price)}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-2 rounded-lg bg-surface-container-low border border-stone-200/80 dark:border-stone-800 px-5 py-4 text-sm text-on-surface-variant">
          <p>
            <span className="font-semibold text-on-surface">Người nhận:</span>{" "}
            {shippingDetails.receiver}
          </p>
          <p>
            <span className="font-semibold text-on-surface">Địa chỉ:</span>{" "}
            {shippingDetails.address}
          </p>
          <p>
            <span className="font-semibold text-on-surface">Ghi chú:</span>{" "}
            {shippingDetails.note}
          </p>
        </div>

        <div className="flex flex-row items-end justify-between gap-10">
          <div className="flex items-center gap-5">
            <div className="flex -space-x-4 items-center">
              {previewItems.map((item, index) => (
                <Link
                  to={`/products/${item.product_id}`}
                  key={item.id}
                  className={`w-20 h-24 bg-surface-container-low rounded overflow-hidden border border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-500 ${
                    index > 0 ? "delay-75" : ""
                  }`}
                >
                  {item.image_url ? (
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover"
                      src={item.image_url}
                    />
                  ) : (
                    <div className="h-full w-full bg-surface-container-high" />
                  )}
                </Link>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center w-12 h-12 bg-surface-container-high rounded-full border-2 border-white text-xs font-bold text-on-surface ml-4 z-10">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-on-surface-variant z-10 whitespace-nowrap">
              Số lượng: {itemCount}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            {order.status === "pending" && (
              <button
                type="button"
                onClick={() => onCancelOrder?.(order.id)}
                className="px-8 py-3 rounded-md text-sm font-semibold transition-colors bg-red-50 text-red-600 hover:bg-red-100"
              >
                Hủy đơn
              </button>
            )}
            <Link
              to="/products"
              className="px-8 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-semibold rounded-md transition-colors"
            >
              Mua thêm
            </Link>
            <Link
              to={`/orders?search=${order.id}`}
              className="px-8 py-3 text-sm font-semibold rounded-md transition-all bg-primary text-on-primary hover:opacity-90 shadow-lg shadow-primary/10"
            >
              Theo dõi đơn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSkeleton = () => (
  <section className="max-w-7xl mx-auto px-8 space-y-12">
    {[1, 2].map((item) => (
      <div
        key={item}
        className="h-72 rounded-lg bg-surface-container-low animate-pulse"
      />
    ))}
  </section>
);

const OrderList = ({ orders, loading, error, onCancelOrder }) => {
  if (loading) {
    return <OrderSkeleton />;
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-8">
        <div className="rounded-lg bg-surface-container-low p-10 text-center text-on-surface-variant">
          {error}
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-8">
        <div className="rounded-lg bg-surface-container-low p-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">
            Bạn chưa có đơn hàng nào
          </h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            Hãy thêm sản phẩm vào giỏ hàng và tạo đơn đầu tiên của bạn.
          </p>
          <Link
            className="inline-flex items-center rounded-md bg-primary px-8 py-4 text-on-primary font-semibold hover:opacity-90 transition-opacity"
            to="/products"
          >
            Xem sản phẩm
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 space-y-12">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onCancelOrder={onCancelOrder} />
      ))}
    </section>
  );
};

const EmptyStateSuggestion = () => (
  <section className="max-w-7xl mx-auto px-8 mt-24 mb-12 font-body">
    <div className="bg-surface-container-low p-12 rounded-lg text-center">
      <h4 className="text-2xl font-bold tracking-tight mb-4 font-headline">
        Bạn đang tìm sản phẩm khác?
      </h4>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
        Khám phá bộ sưu tập mới nhất và tìm món đồ phù hợp cho không gian của
        bạn.
      </p>
      <Link
        className="inline-flex items-center text-primary font-semibold text-sm hover:underline underline-offset-8 transition-all"
        to="/products"
      >
        Xem hàng mới về
        <ArrowRight className="ml-2" size={16} />
      </Link>
    </div>
  </section>
);

export const MainOrder = ({ orders = [], loading, error, onCancelOrder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("search") || "",
  );
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setSearchKeyword(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);

    if (value.trim()) {
      setSearchParams({ search: value.trim() });
      return;
    }

    setSearchParams({});
  };

  const filteredOrders = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    let result = orders;

    if (statusFilter === "processing") {
      result = result.filter((order) =>
        ["pending", "confirmed", "shipped"].includes(order.status),
      );
    } else if (statusFilter === "delivered") {
      result = result.filter((order) => order.status === "delivered");
    } else if (statusFilter === "cancelled") {
      result = result.filter((order) => order.status === "cancelled");
    }

    if (!keyword) {
      return result;
    }

    return result.filter((order) => String(order.id).includes(keyword));
  }, [orders, searchKeyword, statusFilter]);

  return (
    <main className="pt-32 pb-24">
      <BreadcrumbsNav />
      <OrderHistoryHero orderCount={orders.length} />
      <OrderTabs
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <OrderList
        orders={filteredOrders}
        loading={loading}
        error={error}
        onCancelOrder={onCancelOrder}
      />
      <EmptyStateSuggestion />
    </main>
  );
};
