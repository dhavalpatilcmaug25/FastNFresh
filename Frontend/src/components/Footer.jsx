import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark py-4 mt-auto" style={{ color: "white" }}>
      <Container>
        <div className="text-center small">
          &copy; {new Date().getFullYear()} FastNFresh. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
