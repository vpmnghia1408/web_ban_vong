import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Minus,
  Plus,
  X,
  Truck,
  Shield,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

// ── CartItem ────────────────────────────────────────────────────────────
const CartItem = ({
  item,
  isUpdating,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const lineTotal = Number(item.price) * Number(item.quantity);

  return (
    <div
      className={`group flex flex-row gap-6 items-start rounded-xl p-4 -mx-4 transition-colors duration-200 ${
        isSelected ? "bg-primary/5" : "hover:bg-surface-container/40"
      }`}
    >
      {/* Checkbox */}
      <div className="flex items-center pt-2 shrink-0">
        <button
          onClick={() => onToggleSelect(item.product_id)}
          className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 shrink-0"
          style={
            isSelected
              ? { backgroundColor: "#16a34a", borderColor: "#16a34a" }
              : { borderColor: "#c8b8a8" }
          }
          type="button"
          aria-label={isSelected ? "Bỏ chọn" : "Chọn sản phẩm"}
        >
          {isSelected && (
            <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
              <path
                d="M1 5l3.5 3.5L11 1"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Ảnh */}
      <Link
        to={`/products/${item.product_id}`}
        className="w-56 aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shrink-0"
      >
        {item.image_url ? (
          <img
            alt={item.name}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
            src={item.image_url}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high" />
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col h-full py-2 min-h-[280px]">
        <div className="flex justify-between items-start gap-8 mb-2">
          <div>
            <Link
              to={`/products/${item.product_id}`}
              className="text-xl font-bold tracking-tight text-on-background uppercase font-headline hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-sm text-on-surface-variant mt-2 font-body">
              Đơn giá: {formatPrice(item.price)}
            </p>
          </div>
          <span className="text-lg font-medium text-primary whitespace-nowrap">
            {formatPrice(lineTotal)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center bg-surface-container rounded-full px-4 py-1.5 gap-4">
            <button
              onClick={() =>
                onUpdateQuantity(item.product_id, item.quantity - 1)
              }
              disabled={isUpdating || item.quantity <= 1}
              className="hover:text-primary transition-colors disabled:opacity-40"
              type="button"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-semibold tabular-nums w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.product_id, item.quantity + 1)
              }
              disabled={isUpdating}
              className="hover:text-primary transition-colors disabled:opacity-40"
              type="button"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => onRemoveItem(item.product_id)}
            disabled={isUpdating}
            className="text-[11px] tracking-widest uppercase text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 disabled:opacity-40"
            type="button"
          >
            <X size={14} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

// ── WhiteGloveSection ───────────────────────────────────────────────────
const WhiteGloveSection = () => (
  <div className="bg-surface-container-low p-12 rounded-lg mt-4 flex flex-row items-center gap-8">
    <div className="flex-1">
      <h4 className="font-bold text-lg mb-2 uppercase tracking-tight font-headline">
        Dịch vụ giao hàng tận tâm
      </h4>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        Đơn hàng được hỗ trợ đóng gói, giao nhận cẩn thận. Miễn phí đổi trả
        trong 30 ngày.
      </p>
    </div>
    <div className="flex gap-4">
      <Truck size={32} className="text-primary" strokeWidth={1.5} />
    </div>
  </div>
);

// ── OrderSummary ────────────────────────────────────────────────────────
const OrderSummary = ({ selectedItems, onCheckout }) => {
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;
  const hasSelected = selectedItems.length > 0;

  return (
    <aside className="col-span-4">
      <div className="bg-surface-container-lowest p-10 rounded-lg sticky top-32 shadow-[0_40px_80px_-40px_rgba(110,91,77,0.06)]">
        <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase font-headline">
          Tóm tắt đơn hàng
        </h2>

        {/* Sản phẩm đã chọn */}
        {hasSelected ? (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-3">
              Đã chọn ({selectedItems.length} sản phẩm)
            </p>
            {selectedItems.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between text-sm"
              >
                <span className="text-on-surface-variant line-clamp-1 mr-4 flex-1">
                  {item.name} <span className="text-xs">×{item.quantity}</span>
                </span>
                <span className="font-medium whitespace-nowrap">
                  {formatPrice(Number(item.price) * Number(item.quantity))}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6 p-4 bg-surface-container rounded-lg text-center">
            <ShoppingBag
              size={24}
              className="mx-auto mb-2 text-on-surface-variant/40"
            />
            <p className="text-sm text-on-surface-variant">
              Chưa chọn sản phẩm nào
            </p>
          </div>
        )}

        <div className="space-y-6 mb-10 border-t border-surface-container-high pt-6">
          <div className="flex justify-between text-sm pr-4">
            <span className="text-on-surface-variant">Tạm tính</span>
            <span className="font-semibold text-on-background tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm pr-4">
            <span className="text-on-surface-variant">Phí vận chuyển</span>
            <span className="font-semibold text-on-background tabular-nums">
              {formatPrice(shipping)}
            </span>
          </div>

          <div className="pt-6 border-t border-surface-container-high flex justify-between items-baseline pr-4">
            <span className="text-lg font-bold uppercase tracking-widest font-headline">
              Tổng cộng
            </span>
            <span className="text-3xl font-bold text-primary tabular-nums tracking-tighter">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={!hasSelected}
          style={
            hasSelected ? { backgroundColor: "#6e5b4d", color: "#fff6f2" } : {}
          }
          className="block text-center w-full py-5 rounded-md font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all active:scale-[0.98] mb-6 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed bg-surface-container-high text-on-surface-variant"
        >
          {hasSelected
            ? `Thanh toán (${selectedItems.length})`
            : "Chọn sản phẩm để thanh toán"}
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[10px] text-on-surface-variant uppercase tracking-widest">
            <Shield size={16} />
            Thanh toán bảo mật
          </div>
          <div className="flex items-center gap-3 text-[10px] text-on-surface-variant uppercase tracking-widest">
            <Calendar size={16} />
            Dự kiến nhận hàng: 3-5 ngày làm việc
          </div>
        </div>
      </div>
    </aside>
  );
};

// ── CartSkeleton ─────────────────────────────────────────────────────────
const CartSkeleton = () => (
  <div className="col-span-8 space-y-16">
    {[1, 2].map((item) => (
      <div key={item} className="flex gap-8 animate-pulse">
        <div className="w-6 h-6 rounded bg-surface-container-high mt-2" />
        <div className="w-56 aspect-[4/5] rounded-lg bg-surface-container-high" />
        <div className="flex-1 py-2 space-y-6">
          <div className="h-6 w-2/3 rounded bg-surface-container-high" />
          <div className="h-4 w-1/3 rounded bg-surface-container-high" />
          <div className="h-10 w-40 rounded-full bg-surface-container-high mt-32" />
        </div>
      </div>
    ))}
  </div>
);

// ── MainCart ─────────────────────────────────────────────────────────────
export const MainCart = ({
  items = [],
  loading,
  error,
  updatingProductId,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [selectedIds, setSelectedIds] = useState(new Set());

  const allSelected = items.length > 0 && selectedIds.size === items.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleSelect = (productId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i.product_id)));
    }
  };

  const selectedItems = items.filter((i) => selectedIds.has(i.product_id));

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: "/checkout",
          checkoutState: { selectedIds: [...selectedIds] },
        },
      });
      return;
    }

    navigate("/checkout", {
      state: { selectedIds: [...selectedIds] },
    });
  };

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1600px] mx-auto w-full flex-grow">
      <header className="mb-20">
        <h1 className="text-5xl font-extrabold tracking-tighter text-on-background mb-6 font-headline">
          Giỏ hàng của bạn
        </h1>
        <p className="text-on-surface-variant font-body tracking-wide text-lg">
          Các sản phẩm bạn đã chọn đang chờ được hoàn tất đơn hàng.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-20">
        {loading && <CartSkeleton />}

        {!loading && error && (
          <div className="col-span-8 rounded-lg bg-surface-container-low p-10 text-center text-on-surface-variant">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="col-span-8 rounded-lg bg-surface-container-low p-12 text-center">
            <h2 className="text-2xl font-bold text-on-background mb-3">
              Giỏ hàng đang trống
            </h2>
            <p className="text-on-surface-variant mb-8">
              Hãy chọn một sản phẩm bạn thích rồi quay lại đây.
            </p>
            <Link
              to="/products"
              className="inline-flex rounded-md bg-primary px-8 py-4 text-on-primary font-semibold hover:opacity-90 transition-opacity"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="col-span-8 space-y-8">
            {/* Header chọn tất cả */}
            <div className="flex items-center gap-4 pb-4 border-b border-outline-variant/15">
              <button
                onClick={toggleAll}
                className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 shrink-0"
                style={
                  allSelected
                    ? { backgroundColor: "#16a34a", borderColor: "#16a34a" }
                    : someSelected
                      ? { backgroundColor: "#86efac", borderColor: "#16a34a" }
                      : { borderColor: "#c8b8a8" }
                }
                type="button"
              >
                {(allSelected || someSelected) && (
                  <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                    <path
                      d={allSelected ? "M1 5l3.5 3.5L11 1" : "M2 6h8"}
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span className="text-sm font-medium text-on-surface-variant">
                {allSelected
                  ? "Bỏ chọn tất cả"
                  : `Chọn tất cả (${items.length} sản phẩm)`}
              </span>
              {selectedIds.size > 0 && (
                <span className="ml-auto text-xs text-primary font-semibold">
                  Đã chọn {selectedIds.size} / {items.length}
                </span>
              )}
            </div>

            {/* Danh sách cart items */}
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isUpdating={updatingProductId === item.product_id}
                  isSelected={selectedIds.has(item.product_id)}
                  onToggleSelect={toggleSelect}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={(productId) => {
                    // Bỏ khỏi selectedIds nếu đang chọn
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      next.delete(productId);
                      return next;
                    });
                    onRemoveItem(productId);
                  }}
                />
              ))}
            </div>

            <WhiteGloveSection />
          </div>
        )}

        {!loading && (
          <OrderSummary
            selectedItems={selectedItems}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </main>
  );
};
