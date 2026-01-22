import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { getAllProduct } from "../services/ProductService";
import { addToCart } from "../services/CartService";
import { toast } from "react-toastify";
import { getToken } from "../services/TokenService";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = getToken();
      if (!token) {
        toast.info("Please login to add items to cart");
        navigate("/login");
        return;
      }

      // Get user ID from token
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId =
        tokenPayload.userId || tokenPayload.id || tokenPayload.user_id;

      if (!userId) {
        toast.error("User ID not found in token");
        return;
      }

      const response = await addToCart({
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });

      toast.success("Added to cart!");
      // Navigate to cart page after successful add
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Our Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            key={product.product_id || product.id || product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm">
              {product.image ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=No+Image";
                  }}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/200x200?text=No+Image"
                  alt="No Image"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <Card.Text className="h5 mb-3">₹{product.price}</Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleAddToCart(product.product_id || product.id)
                    }
                    className="w-100"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
