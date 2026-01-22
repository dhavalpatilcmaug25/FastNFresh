import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getToken } from "../services/TokenService";
import { getRole } from "../services/RoleService";
import { logout } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAuth = () => {
      const token = getToken();
      const r = getRole();

      setIsLoggedIn(Boolean(token));
      setRole(r);
    };

    refreshAuth();

    window.addEventListener("authChanged", refreshAuth);
    return () => window.removeEventListener("authChanged", refreshAuth);
  }, []);

  const isAdmin = () => {
    if (!role) return false;
    return (
      String(role).toLowerCase().includes("admin") ||
      String(role).toLowerCase().includes("admins")
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoggedIn && isAdmin()) {
    return (
      <Navbar
        bg="dark"
        expand="lg"
        sticky="top"
        style={{ color: "lightgreen" }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FastNFresh</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto" style={{ color: "white" }}>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin">
                <Nav.Link>Admin Dashboard</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <Button
                variant="outline-danger"
                size="md"
                className="ms-4"
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="dark" expand="lg" sticky="top" style={{ color: "lightgreen" }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>FastNFresh</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto ">
            <LinkContainer to="/">
              <Nav.Link className="">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Account" id="account-dropdown">
              {!isLoggedIn ? (
                <>
                  <LinkContainer to="/login" style={{ color: "black" }}>
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create" style={{ color: "black" }}>
                    <NavDropdown.Item>Create Account</NavDropdown.Item>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/user" style={{ color: "black" }}>
                    <NavDropdown.Item>My Dashboard</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
            </NavDropdown>
          </Nav>
          <Nav className="align-items-center">
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            {isLoggedIn && !isAdmin() && (
              <LinkContainer to="/my-orders">
                <Nav.Link className="text-light">My Orders</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && !isAdmin() && (
              <Button
                variant="outline-danger"
                size="md"
                className="ms-4"
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
