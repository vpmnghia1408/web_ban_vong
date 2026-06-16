import React, { useState, useEffect } from "react";
import { Bell, LogOut, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";

export const TopBar = ({
  title = "Dashboard",
  searchPlaceholder = "Tìm kiếm...",
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 ml-72 flex h-16 w-[calc(100%-18rem)] items-center justify-between border-b border-stone-200/60 bg-[#fbf9f6]/85 px-10 backdrop-blur-xl">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6e5b4d]">
          Bảng quản trị
        </p>
        <h2 className="text-sm font-semibold text-[#30332f]">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-[30%] text-on-surface-variant"
          />
          <input
            className="w-56 rounded-lg border border-stone-200/70 bg-white/70 py-2 pl-9 pr-4 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
        <button className="text-[#5d605b] transition-opacity hover:opacity-70">
          <Bell size={20} />
        </button>

        <div className="relative group">
          <button className="text-[#5d605b] transition-opacity hover:opacity-70">
            <User size={20} />
          </button>

          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full mt-2 w-64 rounded-xl border border-stone-200/60 bg-white shadow-xl p-5 transition-all duration-200 z-50">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#30332f] truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-[#6e5b4d] uppercase tracking-wider font-semibold">
                  Quản trị viên
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {user?.email && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#9a9590] font-bold mb-0.5">
                    Email
                  </p>
                  <p className="text-[#30332f] font-medium truncate">
                    {user.email}
                  </p>
                </div>
              )}
              {user?.phone && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#9a9590] font-bold mb-0.5">
                    Số điện thoại
                  </p>
                  <p className="text-[#30332f] font-medium">
                    {user.phone}
                  </p>
                </div>
              )}
              {!user?.email && !user?.phone && (
                <p className="text-[#9a9590] italic">Không có thông tin</p>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={14} />
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
