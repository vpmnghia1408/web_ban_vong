import React from "react";
import {
  BarChart3,
  Boxes,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "products", label: "Sản phẩm", icon: Package },
  { id: "categories", label: "Danh mục", icon: Tags },
  { id: "orders", label: "Đơn hàng", icon: ShoppingCart },
  { id: "users", label: "Người dùng", icon: Users },
];

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-stone-200/60 bg-[#fbf9f6] px-6 py-8">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary">
          <Boxes size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#30332f]">
            Admin Panel
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e5b4d]">
            Vòng tay trầm
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                isActive
                  ? "bg-[#f5f3f0] font-bold text-[#6e5b4d] shadow-sm"
                  : "font-medium text-[#5d605b] hover:bg-[#f5f3f0] hover:text-[#30332f]"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-stone-200/70 pt-6">
        <button className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm font-medium text-[#5d605b] transition-colors hover:bg-[#f5f3f0] hover:text-[#30332f]">
          <Settings size={18} />
          Cài đặt
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm font-medium text-[#5d605b] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Đăng Xuất
        </button>
      </div>
    </aside>
  );
};
