import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Form } from "react-bootstrap";
import { toast, Bounce } from "react-toastify";
import {
  getOrderById,
  updateOrderStatus,
} from "../../services/OrderService.js";

function UpdateOrders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    id: "",
    user_id: "",
    products: [],
    total_price: "",
    status: "",
    created_at: "",
  });

  // ✅ Fetch order by ID
  const fetchOrderById = useCallback(async () => {
    try {
      const res = await getOrderById(id);
      if (res.status === 200) {
        const orderData = Array.isArray(res.data) ? res.data[0] : res.data;
        setOrder(orderData);
      } else {
        toast.error("Failed to fetch order details", { theme: "colored" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching order", { theme: "colored" });
    }
  }, [id]);

  useEffect(() => {
    fetchOrderById();
  }, [fetchOrderById]);

  // ✅ Handle change
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // ✅ Toasts
  const showSuccessToast = () => {
    toast.success("Order status updated successfully", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showErrorToast = () => {
    toast.error("Failed to update order", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateOrderStatus(id, order.status);
      if (res.status === 200) {
        showSuccessToast();
        setTimeout(() => navigate("/admin/orders"), 1000);
      }
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  return (
    <div className="main-content">
      <Container className="mt-4 container">
        <Row>
          <Col lg={8}>
            <Alert variant="primary" className="order-title">
              Update Order Status
            </Alert>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Order ID</Form.Label>
                <Form.Control type="text" value={order.id} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={order.user_id} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="text"
                  value={`₹${order.total_price}`}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Current Status</Form.Label>
                <Form.Select
                  name="status"
                  value={order.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Order
              </Button>
            </Form>
          </Col>

          <Col lg={6}>
            <Alert variant="light" className="shadow-sm">
              <h6>Order Summary</h6>
              <ul className="list-unstyled">
                {Array.isArray(order.products)
                  ? order.products.map((p, i) => (
                      <li key={i}>
                        {p.name} × {p.quantity} — ₹
                        {(p.price * p.quantity).toFixed(2)}
                      </li>
                    ))
                  : "No products found"}
              </ul>
              <hr />
              <strong>Total:</strong> ₹{order.total_price}
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UpdateOrders;
