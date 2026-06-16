import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PublicRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  // Nếu đang load, chờ để tránh flash
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Nếu đã login, redirect về trang chủ
  if (isLoggedIn) {
    return <Navigate to={Number(user?.role_id) === 0 ? "/admin" : "/"} replace />;
  }

  // Nếu chưa login, cho vào
  return children;
};
