import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { getUserCart, clearCart } from "../../services/CartService";
import { createOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // ✅ Decode userId from token
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );

          const uid =
            payload.userId || payload.user_id || payload.id || payload._id;

          setUserId(uid);
        }
      }
    } catch (e) {
      console.warn("Failed to decode token", e);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await getUserCart(userId);
      setCartItems(res.data);
    } catch (error) {
      toast.error("Failed to load cart!");
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () =>
    cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = 10.0;
    const tax = subtotal * 0.1;
    return (subtotal + shipping + tax).toFixed(2);
  };

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const products = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));

      const orderData = {
        user_id: userId,
        products,
        total_price: parseFloat(calculateTotal()),
        status: "Pending",
      };

      const res = await createOrder(orderData);
      if (res.status === 201 || res.status === 200) {
        await clearCart(userId);
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/my-orders"), 2000);
      }
    } catch (error) {
      toast.error("Failed to place order!");
    }
  };

  if (loading)
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading checkout...</p>
      </Container>
    );

  if (cartItems.length === 0)
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center py-5">
          <h4>Your cart is empty!</h4>
          <p>Add products before checkout.</p>
          <Button variant="primary" onClick={() => navigate("/product-list")}>
            Browse Products
          </Button>
        </Alert>
      </Container>
    );

  return (
    <>
      <ToastContainer />
      <Container className="mt-4">
        <h2>Checkout</h2>
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>Order Items</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product_id}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">₹{item.price}</td>
                        <td className="text-end">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>₹10.00</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax (10%):</span>
                  <span>
                    ₹{(parseFloat(calculateSubtotal()) * 0.1).toFixed(2)}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span className="text-success">₹{calculateTotal()}</span>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/cart")}
                  >
                    Back to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutPage;
