import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/OrderService"; // ✅ Correct import

function CreateOrder() {
  const [data, setData] = useState({
    user_id: "",
    products: "",
    total_price: "",
    status: "Pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        ...data,
        products: JSON.parse(data.products),
      };

      const res = await createOrder(orderData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Order Created Successfully!", {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
          transition: Bounce,
        });

        setData({
          user_id: "",
          products: "",
          total_price: "",
          status: "Pending",
        });

        setTimeout(() => {
          navigate("/order-list");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order!", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="main-content">
      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <h3>Add New Order</h3>
            <p className="text-muted">
              Enter details below to manually create a new order
            </p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter User ID"
                  name="user_id"
                  value={data.user_id}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Products (as JSON)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder='Example: [{"name":"Milk","quantity":2,"price":40}]'
                  name="products"
                  value={data.products}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Total Price"
                  name="total_price"
                  value={data.total_price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateOrder;
