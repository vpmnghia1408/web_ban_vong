import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminRoute } from "./context/AdminRoute";
import { CustomerRoute } from "./context/CustomerRoute";
import { PrivateRoute } from "./context/PrivateRoute";
import { PublicRoute } from "./context/PublicRoute";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { PaymentPage } from "./pages/PaymentPage.jsx";
import { OrderPage } from "./pages/OrderPage.jsx";
import { ProductsDetailPage } from "./pages/ProductsDetailPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { AdminPage } from "./pages/admin/AdminPage.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ScrollToTop } from "./components/common/ScrollToTop.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <CustomerRoute>
                <HomePage />
              </CustomerRoute>
            }
          />
          <Route
            path="/products"
            element={
              <CustomerRoute>
                <ProductsPage />
              </CustomerRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <CustomerRoute>
                <ProductsDetailPage />
              </CustomerRoute>
            }
          />
          <Route
            path="/about"
            element={
              <CustomerRoute>
                <AboutPage />
              </CustomerRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <CustomerRoute>
                <ContactPage />
              </CustomerRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <CustomerRoute>
                <CartPage />
              </CustomerRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <CustomerRoute>
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              </CustomerRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <CustomerRoute>
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              </CustomerRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <CustomerRoute>
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              </CustomerRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <CustomerRoute>
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              </CustomerRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
