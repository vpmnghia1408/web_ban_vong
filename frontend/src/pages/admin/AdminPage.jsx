import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/admin/components/Sidebar";
import { TopBar } from "../../components/admin/components/TopBar";
import { Footer } from "../../components/admin/components/Footer";
import { AdminDashboard } from "../../components/admin/dashboard/AdminDashboard.jsx";
import QlCategory from "../../components/admin/qlcategory/QlCategory.jsx";
import { QlOrderMain } from "../../components/admin/qlorder/QlOrderMain.jsx";
import { QlSanPhamMain } from "../../components/admin/qlsanpham/QlSanPhamMain.jsx";
import { QlUserMain } from "../../components/admin/qluser/QlUserMain.jsx";

const titleByTab = {
  dashboard: "Dashboard",
  products: "Sản phẩm",
  categories: "Danh mục",
  orders: "Đơn hàng",
  users: "Người dùng",
};

export const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("products")) return "products";
    if (path.includes("categories")) return "categories";
    if (path.includes("orders")) return "orders";
    if (path.includes("users")) return "users";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab) => {
    if (tab === "dashboard") {
      navigate("/admin");
      return;
    }
    navigate(`/admin/${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <QlSanPhamMain />;
      case "categories":
        return <QlCategory />;
      case "orders":
        return <QlOrderMain />;
      case "users":
        return <QlUserMain />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-on-surface">
      <TopBar title={titleByTab[activeTab]} />
      <div className="ml-72 flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="w-full flex-1 overflow-auto p-8">{renderContent()}</main>
      </div>
      <Footer />
    </div>
  );
};
