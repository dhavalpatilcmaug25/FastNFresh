import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import {
  deleteCartItem,
  getUserCart,
  updateCartItem,
  clearCart,
} from "../../services/CartService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  let userId = user?.user_id;

  if (!userId) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          userId =
            payload.userId || payload.user_id || payload.id || payload._id;
        }
      }
    } catch (e) {
      console.warn("Failed to decode token for user id", e);
    }
  }

  // Fetch cart items
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getUserCart(userId);
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  // Handle item delete
  const handleItemDelete = async () => {
    try {
      if (selectedItem) {
        const response = await deleteCartItem(selectedItem.id);
        if (response.status === 200) {
          toast.success("Item removed from cart!", { theme: "colored" });
          setCartItems(cartItems.filter((i) => i.id !== selectedItem.id));
        }
      }
    } catch (error) {
      toast.error("Failed to remove item!", { theme: "colored" });
    } finally {
      setShowConfirmation(false);
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    try {
      const response = await clearCart(userId);
      if (response.status === 200) {
        toast.success("Cart cleared successfully!", { theme: "colored" });
        setCartItems([]);
      }
    } catch (error) {
      toast.error("Failed to clear cart!", { theme: "colored" });
    } finally {
      setShowClearConfirmation(false);
    }
  };

  // Update quantity
  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await updateCartItem(itemId, { quantity: newQuantity });
      if (res.status === 200) {
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
        toast.success("Quantity updated!", { theme: "colored" });
      }
    } catch {
      toast.error("Failed to update quantity!", { theme: "colored" });
    }
  };

  // Calculate total
  const calculateTotal = () =>
    cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading cart...</p>
      </Container>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Container>
          <Row className="mt-4 mb-4">
            <Col lg={8}>
              <h2>Shopping Cart ({cartItems.length})</h2>
            </Col>
            <Col lg={4} className="text-end">
              {cartItems.length > 0 && (
                <Button
                  variant="outline-danger"
                  onClick={() => setShowClearConfirmation(true)}
                >
                  Clear Cart
                </Button>
              )}
            </Col>
          </Row>

          {cartItems.length === 0 ? (
            <Alert variant="info" className="text-center py-5">
              <h4>Your cart is empty</h4>
              <p className="text-muted">Add some items to get started!</p>
              <Button
                variant="primary"
                onClick={() => navigate("/product-list")}
              >
                Continue Shopping
              </Button>
            </Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>₹{parseFloat(item.price).toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              handleQuantityUpdate(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              handleQuantityUpdate(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="fw-bold">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowConfirmation(true);
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">
                      Total:
                    </td>
                    <td colSpan="2" className="fw-bold text-success">
                      ₹{calculateTotal()}
                    </td>
                  </tr>
                </tfoot>
              </Table>

              <Row className="mt-4">
                <Col className="text-end">
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="me-3"
                    onClick={() => navigate("/product-list")}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                </Col>
              </Row>
            </>
          )}

          {/* Confirm delete modal */}
          <Modal
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Remove Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove{" "}
              <strong>{selectedItem?.name}</strong> from your cart?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleItemDelete}>
                Remove
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Confirm clear cart */}
          <Modal
            show={showClearConfirmation}
            onHide={() => setShowClearConfirmation(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Clear Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to clear your cart? This cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowClearConfirmation(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleClearCart}>
                Yes, Clear Cart
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default CartPage;
