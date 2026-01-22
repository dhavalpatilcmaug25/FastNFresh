import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
  Badge,
} from "react-bootstrap";
import { deleteOrder, getOrders } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const navigate = useNavigate();

  //  Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  //  Hide confirmation modal
  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  // Hide details modal
  const hideDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const showSuccessToast = () => {
    toast.success("Order deleted successfully!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showErrorToast = () => {
    toast.error("Failed to delete order!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleOrderDelete = async () => {
    try {
      if (selectedOrder) {
        console.log(selectedOrder.id);

        const response = await deleteOrder(selectedOrder.id);
        if (response.status === 200) {
          showSuccessToast();
          const remaining = orders.filter((o) => o.id !== selectedOrder.id);
          setOrders(remaining);
        }
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      showErrorToast();
    } finally {
      setShowConfirmation(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "primary";
      case "Confirmed":
        return "info";
      case "Cancelled":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Container>
          <Row className="mt-4">
            <Col lg={8}>
              <h3>All Orders List</h3>
              <br />
            </Col>
          </Row>

          {orders.length === 0 ? (
            <Alert variant="warning">No Orders Found</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.user_id}</td>
                    <td>{order.products?.length || 0}</td>
                    <td>₹{parseFloat(order.total_price).toFixed(2)}</td>
                    <td>
                      <Badge bg={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="action-button me-2"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailsModal(true);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-button me-2"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowConfirmation(true);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="action-button"
                        onClick={() => {
                          navigate(`/admin/edit-order/${order.id}`);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Modal show={showConfirmation} onHide={hideConfirmation}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete Order #
              {selectedOrder ? selectedOrder.id : ""}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={hideConfirmation}>
                No
              </Button>
              <Button variant="success" onClick={handleOrderDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDetailsModal} onHide={hideDetailsModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Order Details - #{selectedOrder?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder && (
                <>
                  <Row className="mb-3">
                    <Col md={6}>
                      <p>
                        <strong>User ID:</strong> {selectedOrder.user_id}
                      </p>
                      <p>
                        <strong>Order Date:</strong>{" "}
                        {new Date(selectedOrder.created_at).toLocaleString()}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        <strong>Status:</strong>{" "}
                        <Badge bg={getStatusVariant(selectedOrder.status)}>
                          {selectedOrder.status}
                        </Badge>
                      </p>
                      <p>
                        <strong>Total Price:</strong> ₹
                        {parseFloat(selectedOrder.total_price).toFixed(2)}
                      </p>
                    </Col>
                  </Row>

                  <h6>Products:</h6>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.products?.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>${parseFloat(product.price).toFixed(2)}</td>
                          <td>
                            ₹
                            {(
                              product.quantity * parseFloat(product.price)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>Total:</strong>
                        </td>
                        <td>
                          <strong>
                            ₹{parseFloat(selectedOrder.total_price).toFixed(2)}
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideDetailsModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default AllOrders;
