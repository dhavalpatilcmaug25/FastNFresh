import { NavLink, Outlet } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Offcanvas,
  Button,
  ListGroup,
} from "react-bootstrap";
import { LayoutDashboard, Box, List, ShoppingBag } from "lucide-react";
import { useState } from "react";

function AdminDashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.25rem",
    borderRadius: "0.25rem",
    padding: "0.5rem",
    textDecoration: "none",
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#2e7d32" : "transparent",
  });

  const SidebarContent = () => (
    <ListGroup variant="flush">
      <ListGroup.Item
        className="text-center mb-3 text-white rounded"
        style={{ backgroundColor: "#2e7d32" }}
      >
        <h5 className="mb-0">Admin Panel</h5>
        <small>Manage your store</small>
      </ListGroup.Item>

      <ListGroup.Item as={NavLink} to="all-products" style={linkStyle}>
        <List size={18} /> <span className="ms-2">All Products</span>
      </ListGroup.Item>

      <ListGroup.Item as={NavLink} to="create-product" style={linkStyle}>
        <Box size={18} /> <span className="ms-2">Create Product</span>
      </ListGroup.Item>

      <ListGroup.Item as={NavLink} to="all-category" style={linkStyle}>
        <LayoutDashboard size={18} />{" "}
        <span className="ms-2">All Categories</span>
      </ListGroup.Item>

      <ListGroup.Item as={NavLink} to="create-category" style={linkStyle}>
        <LayoutDashboard size={18} />{" "}
        <span className="ms-2">Create Category</span>
      </ListGroup.Item>

      <ListGroup.Item as={NavLink} to="orders" style={linkStyle}>
        <ShoppingBag size={18} /> <span className="ms-2">Orders</span>
      </ListGroup.Item>
    </ListGroup>
  );

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row className="p-3">
        <Col xs={12} className="d-md-none mb-3">
          <Button variant="primary" onClick={handleShow} className="w-100">
            Open Admin Menu
          </Button>
        </Col>

        <Col md={4} lg={3} className="d-none d-md-block">
          <div className="bg-white p-3 rounded shadow-sm">
            <SidebarContent />
          </div>
        </Col>

        <Col xs={12} md={8} lg={9}>
          <div className="p-3 bg-white rounded shadow-sm">
            <Outlet />
          </div>
        </Col>
      </Row>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default AdminDashboard;
