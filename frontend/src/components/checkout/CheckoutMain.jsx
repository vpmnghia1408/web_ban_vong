import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  ArrowLeft,
  Shield,
  History,
  Award,
  Truck,
  Banknote,
  CreditCard,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  FileText,
  Building2,
} from "lucide-react";
import { orderService } from "../../services/orderService.js";

const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

const getOrderTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
};

// ── Step indicator đẹp ──────────────────────────────────────────────────
const StepIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { num: 1, label: "Giao hàng", icon: MapPin },
    { num: 2, label: "Thanh toán", icon: CreditCard },
    { num: 3, label: "Xác nhận", icon: CheckCircle2 },
  ];
  return (
    <div className="flex items-center gap-0 mb-2">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isActive = step.num === currentStep;
        const isDone = step.num < currentStep;
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "text-white shadow-lg shadow-primary/30"
                    : "bg-surface-container text-on-surface-variant/40"
                }`}
                style={isActive ? { backgroundColor: "#6e5b4d" } : {}}
              >
                {isDone ? (
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                ) : (
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary"
                    : isDone
                    ? "text-green-500"
                    : "text-on-surface-variant/40"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-px w-16 mx-3 mb-5 transition-colors duration-300 ${
                  isDone ? "bg-green-400" : "bg-outline-variant/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ── Input Field ─────────────────────────────────────────────────────────
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  fullWidth = false,
  required = false,
  icon: Icon,
}) => (
  <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
    <label
      className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1 font-body flex items-center gap-1.5"
      htmlFor={name}
    >
      {Icon && <Icon size={11} />}
      {label}
      {required && <span className="text-red-400">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-surface-container border border-outline-variant/15 focus:border-primary/40 focus:ring-0 focus:bg-white transition-all p-4 rounded-xl font-body text-sm outline-none placeholder:text-on-surface-variant/40"
    />
  </div>
);

// ── Shipping Information ────────────────────────────────────────────────
const ShippingInformation = ({ formData, onChange }) => (
  <section className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <MapPin size={16} style={{ color: "#6e5b4d" }} />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-on-background font-headline">
          Thông tin giao hàng
        </h2>
        <p className="text-xs text-on-surface-variant font-light mt-0.5">
          Nhập thông tin nhận hàng chính xác để đảm bảo giao hàng đúng địa chỉ
        </p>
      </div>
    </div>

    <div className="bg-surface-container-low/50 rounded-2xl p-6 border border-outline-variant/10">
      <div className="grid grid-cols-2 gap-5">
        <InputField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Nguyễn Văn A"
          required
          icon={User}
        />
        <InputField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="0901234567"
          required
          icon={Phone}
        />
        <InputField
          label="Địa chỉ"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Số nhà, tên đường, phường/xã"
          fullWidth
          required
          icon={MapPin}
        />
        <InputField
          label="Tỉnh/Thành phố"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="TP. Hồ Chí Minh"
          required
          icon={Building2}
        />
        <InputField
          label="Ghi chú đơn hàng"
          name="note"
          value={formData.note}
          onChange={onChange}
          placeholder="Giao giờ hành chính, gọi trước khi giao..."
          icon={FileText}
        />
      </div>
    </div>
  </section>
);

// ── Delivery Method ─────────────────────────────────────────────────────
const DeliveryMethod = () => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Truck size={16} style={{ color: "#6e5b4d" }} />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-on-background font-headline">
        Phương thức giao hàng
      </h2>
    </div>

    <label className="flex items-center justify-between p-5 bg-surface-container-low/50 border border-primary/30 rounded-2xl cursor-pointer group hover:border-primary/60 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Truck size={18} style={{ color: "#6e5b4d" }} />
        </div>
        <div>
          <span className="text-sm font-semibold block">Giao hàng tiêu chuẩn</span>
          <span className="text-xs text-on-surface-variant">3–5 ngày làm việc • Toàn quốc</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold" style={{ color: "#6e5b4d" }}>
          30.000 VND
        </span>
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: "#6e5b4d" }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#6e5b4d" }}
          />
        </div>
      </div>
    </label>
  </section>
);

// ── Payment Method ──────────────────────────────────────────────────────
const PaymentMethod = ({ paymentMethod, onSelect }) => {
  const methods = [
    {
      id: "cod",
      label: "Thanh toán khi nhận hàng",
      desc: "Trả tiền mặt khi nhận hàng (COD)",
      icon: Banknote,
    },
    {
      id: "bank",
      label: "Chuyển khoản ngân hàng",
      desc: "Chuyển khoản trước, xác nhận qua Zalo/SĐT",
      icon: CreditCard,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <CreditCard size={16} style={{ color: "#6e5b4d" }} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-on-background font-headline">
          Phương thức thanh toán
        </h2>
      </div>

      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 text-left ${
                isSelected
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-outline-variant/15 bg-surface-container-low/40 hover:border-primary/30 hover:bg-surface-container-low"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-primary/15" : "bg-surface-container"
                  }`}
                >
                  <Icon
                    size={18}
                    style={{ color: isSelected ? "#6e5b4d" : "#a8968a" }}
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold block">
                    {method.label}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {method.desc}
                  </span>
                </div>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  borderColor: isSelected ? "#6e5b4d" : "#c8b8a8",
                }}
              >
                {isSelected && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "#6e5b4d" }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Thông tin chuyển khoản */}
      {paymentMethod === "bank" && (
        <div className="mt-2 p-5 rounded-2xl border border-blue-200 bg-blue-50">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">
            Thông tin tài khoản
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex gap-2">
              <span className="text-blue-600 font-medium w-32 shrink-0">Ngân hàng:</span>
              <span className="font-semibold text-blue-900">Vietcombank</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-medium w-32 shrink-0">Số tài khoản:</span>
              <span className="font-semibold text-blue-900 tracking-widest">1234 5678 9012</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-medium w-32 shrink-0">Chủ tài khoản:</span>
              <span className="font-semibold text-blue-900">VÒNG TAY HƯƠNG TRẦM</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600 font-medium w-32 shrink-0">Nội dung CK:</span>
              <span className="font-semibold text-blue-900">[SĐT] + Tên đặt hàng</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ── Order Summary Pane ──────────────────────────────────────────────────
const OrderSummaryPane = ({ items, totals }) => (
  <div className="col-span-5">
    <div className="sticky top-32 space-y-6">
      <div className="bg-surface-container-low/60 p-8 rounded-2xl space-y-6 border border-outline-variant/10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] tracking-[0.2em] uppercase font-extrabold text-on-background">
            Đơn hàng của bạn
          </h3>
          <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            {items.length} sản phẩm
          </span>
        </div>

        <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.id ?? item.product_id} className="flex gap-4">
              <Link
                to={`/products/${item.product_id}`}
                className="w-20 h-24 bg-surface-container-high rounded-xl overflow-hidden flex-shrink-0"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high" />
                )}
              </Link>
              <div className="flex flex-col justify-between py-1 w-full">
                <div>
                  <h4 className="text-sm font-semibold tracking-tight line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {formatPrice(item.price)} / chiếc
                  </p>
                </div>
                <div className="flex justify-between items-end w-full">
                  <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                    ×{item.quantity}
                  </span>
                  <span className="text-sm font-bold text-on-background">
                    {formatPrice(Number(item.price) * Number(item.quantity))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 space-y-3 border-t border-outline-variant/15">
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Tạm tính</span>
            <span className="font-medium tabular-nums">
              {formatPrice(totals.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Phí vận chuyển</span>
            <span className="font-medium tabular-nums">
              {formatPrice(totals.shipping)}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-outline-variant/15">
            <span className="text-base font-bold font-headline tracking-tight">
              Tổng cộng
            </span>
            <span
              className="text-xl font-extrabold tabular-nums tracking-tighter"
              style={{ color: "#6e5b4d" }}
            >
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Shield, label: "Mã hóa SSL\nbảo mật" },
          { icon: History, label: "Đổi trả\n30 ngày" },
          { icon: Award, label: "Bảo hành\nsản phẩm" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="bg-surface-container-low/50 rounded-xl p-4 text-center border border-outline-variant/10"
          >
            <Icon size={20} className="mx-auto mb-2 text-primary/50" />
            <p className="text-[9px] uppercase tracking-tight font-bold text-on-surface-variant leading-tight whitespace-pre-line">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Skeleton ─────────────────────────────────────────────────────────────
const CheckoutSkeleton = () => (
  <main className="pt-32 pb-24 px-12 max-w-[1600px] mx-auto w-full flex-grow">
    <div className="grid grid-cols-12 gap-16 animate-pulse">
      <div className="col-span-7 space-y-8">
        <div className="h-12 w-80 rounded-xl bg-surface-container-high" />
        <div className="h-80 rounded-2xl bg-surface-container-high" />
        <div className="h-40 rounded-2xl bg-surface-container-high" />
      </div>
      <div className="col-span-5 h-[520px] rounded-2xl bg-surface-container-high" />
    </div>
  </main>
);

// ── Main Export ───────────────────────────────────────────────────────────
export const CheckoutMain = ({ items = [], loading, error }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const totals = getOrderTotals(items);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const shippingAddress = [
        formData.fullName,
        formData.address,
        formData.city,
        formData.note,
      ]
        .filter(Boolean)
        .join(" - ");

      await orderService.createOrder(shippingAddress, formData.phone, items);
      window.dispatchEvent(new Event("cart-updated"));
      navigate(`/orders`);
    } catch (error) {
      console.error("Error creating order:", error);
      setSubmitError(
        error.response?.data?.message || "Không thể tạo đơn hàng.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CheckoutSkeleton />;

  if (error) {
    return (
      <main className="pt-32 pb-24 px-12 max-w-[1600px] mx-auto w-full flex-grow">
        <div className="rounded-2xl bg-surface-container-low p-10 text-center text-on-surface-variant">
          {error}
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-24 px-12 max-w-[1600px] mx-auto w-full flex-grow">
        <div className="rounded-2xl bg-surface-container-low p-12 text-center">
          <h1 className="text-3xl font-bold text-on-background mb-3">
            Không có sản phẩm để thanh toán
          </h1>
          <p className="text-on-surface-variant mb-8">
            Hãy chọn sản phẩm từ giỏ hàng trước khi thanh toán.
          </p>
          <Link
            to="/products"
            className="inline-flex rounded-xl px-8 py-4 text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#6e5b4d" }}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24 px-12 max-w-[1600px] mx-auto w-full flex-grow">
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-16">
        <div className="col-span-7 space-y-10">

          {/* Step indicator */}
          <StepIndicator currentStep={1} />

          {/* Shipping Info */}
          <ShippingInformation formData={formData} onChange={handleChange} />

          {/* Delivery Method */}
          <DeliveryMethod />

          {/* Payment Method */}
          <PaymentMethod
            paymentMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />

          {submitError && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 flex justify-between items-center">
            <Link
              to="/cart"
              className="text-sm font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity font-body"
              style={{ color: "#6e5b4d" }}
            >
              <ArrowLeft size={16} />
              Quay lại giỏ hàng
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold tracking-wide text-sm shadow-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: "#6e5b4d", color: "#fff6f2" }}
            >
              <Lock size={16} />
              {submitting ? "Đang tạo đơn..." : "Đặt hàng ngay"}
            </button>
          </div>
        </div>

        <OrderSummaryPane items={items} totals={totals} />
      </form>
    </main>
  );
};
