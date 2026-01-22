import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Services() {
  const services = [
    {
      title: "Fast & Fresh Delivery",
      description:
        "We bring your groceries to your doorstep in record time — always fresh, always reliable.",
      image:
        "http://img.freepik.com/free-vector/delivery-service-concept_52683-68856.jpg",
    },
    {
      title: "Farm-to-Table Produce",
      description:
        "Freshly sourced fruits and vegetables directly from trusted local farmers.",
      image:
        "https://img.freepik.com/free-vector/organic-farming-concept-with-person_23-2148411745.jpg?t=st=1762425786~exp=1762429386~hmac=70539f98532e5a2288bfbb4db8d325620ef39f0a730c1a6cd7b5ca803ba43c69&w=1060",
    },
    {
      title: "Subscription Boxes",
      description:
        "Get your favorite items delivered weekly or monthly without reordering.",
      image:
        "https://img.freepik.com/free-vector/digital-packaging-abstract-concept-illustration-digital-technology-3d-software-ar-labels-marketing-tool-attract-customer-augmented-reality-customize-order_335657-131.jpg?t=st=1762425849~exp=1762429449~hmac=c875d1a85bc79dfce533279709b44b57bcd5c9c72a76e3cbd3a66e6b20b5bf88&w=1060",
    },
    {
      title: "Bulk Orders",
      description:
        "Need groceries for an event? We offer special discounts on large orders.",
      image:
        "https://img.freepik.com/premium-vector/warehouse-worker-with-boxes-cart_1032033-3203.jpg?w=1060",
    },
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center fw-bold mb-4">Our Services</h1>
      <p className="text-center text-muted mb-5">
        Making grocery shopping easier, faster, and fresher for everyone.
      </p>
      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="shadow h-100 text-center border-0">
              <Card.Body>
                <div>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <Card.Title className="mt-3 fw-bold">
                  {service.title}
                </Card.Title>
                <Card.Text className="text-muted">
                  {service.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
