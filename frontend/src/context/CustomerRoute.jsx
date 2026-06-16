import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const CustomerRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-on-surface-variant">Dang tai...</p>
        </div>
      </div>
    );
  }

  if (isLoggedIn && Number(user?.role_id) === 0) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
