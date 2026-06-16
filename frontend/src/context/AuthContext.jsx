import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Bắt đầu với loading = true
  const [error, setError] = useState(null);

  // Kiểm tra token khi load app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("kiểm tra token và userData:", { token, userData }); // ✅ Debug

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  // ✅ Login - gọi authService
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { token, user } = response;

      // Lưu vào state
      setUser(user);
      setIsLoggedIn(true);

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register - gọi authService
  const register = async (name, email, phone, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(
        name,
        email,
        phone,
        password,
        confirmPassword,
      );
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
    authService.logout();
  };

  const value = { user, isLoggedIn, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
