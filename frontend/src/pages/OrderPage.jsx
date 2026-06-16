import { useEffect, useState } from "react";
import { MainOrder } from "../components/order/MainOrder";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { orderService } from "../services/orderService";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        const orderList = response.data || [];

        const ordersWithItems = await Promise.all(
          orderList.map(async (order) => {
            const detailResponse = await orderService.getOrderDetails(order.id);

            return {
              ...order,
              items: detailResponse.data?.items || [],
            };
          }),
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Khong the tai lich su don hang.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (
      !window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")
    ) {
      return;
    }

    try {
      await orderService.cancelMyOrder(orderId);
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (err) {
      alert(
        "Lỗi khi hủy đơn hàng: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container min-h-screen min-w-[1024px]">
      <Header />
      <MainOrder
        orders={orders}
        loading={loading}
        error={error}
        onCancelOrder={handleCancelOrder}
      />
      <Footer />
    </div>
  );
};
