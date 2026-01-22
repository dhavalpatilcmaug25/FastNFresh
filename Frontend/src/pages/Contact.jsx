import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export default function Contact() {
  return (
    <div>
      <div
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Contact Us</h1>
        <p>We’d love to hear from you!</p>
      </div>

      <Container className="py-5 mb-4">
        <Row className="g-4 justify-content-center">
          <Col lg={7} md={7}>
            <h2 className="mb-4 text-center">Send Us a Message</h2>
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write your message here..."
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="text-center mt-3">
                  <Button
                    variant="success"
                    type="submit"
                    className="rounded-pill px-4 py-2"
                  >
                    Send Message
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid className="px-0">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD1VnYC6EugmolDY9RjsZ77TeXstyj0288&q=CDAC+KHARGHAR&center=19.0266614,73.0508592&maptype=satellite&zoom=17"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </Container>
    </div>
  );
}
