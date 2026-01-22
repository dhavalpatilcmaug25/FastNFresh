import { Container } from "react-bootstrap";
import accessDeniedImage from "../assets/images/access.jpg";

export function AccessDenied() {
  return (
    <Container className="mt-3 text-center">
      <img src={accessDeniedImage} height={400} />
    </Container>
  );
}
