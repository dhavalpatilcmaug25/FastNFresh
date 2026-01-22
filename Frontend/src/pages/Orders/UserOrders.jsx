import React, { useEffect, useState } from "react";
import { fetchUserOrders } from "../../services/UserOrderService";
import { Card, Container, Badge } from "react-bootstrap";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const userString = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userString || !token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const data = await fetchUserOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error: {error}</p>;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Confirmed":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <Card className="text-center p-4">
          <Card.Body>
            <p className="mb-0">You have no orders yet.</p>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {JSON.parse(
                      typeof order.products === "string"
                        ? order.products
                        : JSON.stringify(order.products)
                    ).map((product, idx) => (
                      <div key={idx} className="mb-1">
                        {product.name} - Quantity: {product.quantity} x ₹
                        {product.price}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total_price}</td>
                  <td>
                    <Badge bg={getStatusBadgeColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
