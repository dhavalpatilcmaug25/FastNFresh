import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import api from "../../api";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!product)
    return <div className="text-center mt-5">Product not found</div>;

  return (
    <Container className="py-5">
      <Card className="product-detail-card">
        <Row className="g-0">
          <Col md={6}>
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col md={6}>
            <Card.Body>
              <div className="mb-3">
                <h2 className="product-title">{product.name}</h2>
                <Badge bg="primary" className="mb-2">
                  {product.category?.name}
                </Badge>
              </div>

              <div className="product-price mb-3">
                <h3>₹{product.price}</h3>
                {product.oldPrice && (
                  <span className="text-muted text-decoration-line-through ms-2">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>

              <div className="product-description mb-4">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>

              <div className="product-details">
                <h4>Product Details</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Stock:</strong> {product.stock} units
                  </li>
                  <li>
                    <strong>Weight:</strong> {product.weight || "N/A"}
                  </li>
                  <li>
                    <strong>Unit:</strong> {product.unit || "N/A"}
                  </li>
                  {product.brand && (
                    <li>
                      <strong>Brand:</strong> {product.brand}
                    </li>
                  )}
                </ul>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="product-features mt-4">
                  <h4>Key Features</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetails;
