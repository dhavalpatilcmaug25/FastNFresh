import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { signInSchema } from "../schemas/SignInSchema";
import { LoginUser } from "../services/AuthServices";
import { storeToken } from "../services/TokenService";
import { storeRole } from "../services/RoleService";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await LoginUser(values);
      if (res.status === 200) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
        storeToken(res.data.token);
        storeRole(values.role);

        try {
          const token = res.data.token;
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(
              atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
            );
            const userObj = {
              user_id:
                payload.userId || payload.user_id || payload.id || payload._id,
              role: payload.role || values.role,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
          }
        } catch (e) {
          console.warn("Failed to decode token to store user info", e);
        }

        setTimeout(() => {
          if (values.role === "admins") navigate("/admin");
          else navigate("/");
        }, 1500);
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      toast.error(serverMessage || "Invalid credentials or server error", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <Container className="h-100">
        <Row className="h-100">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center "
          >
            <Card className="shadow p-4 rounded-3 w-75">
              <h3
                className="text-center mb-3 fw-bold"
                style={{ color: "#2e7d32" }}
              >
                Sign In
              </h3>
              <Formik
                initialValues={{ email: "", password: "", role: "" }}
                validationSchema={signInSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <FormikForm>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">
                        Email
                      </Form.Label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control form-control-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">
                        Password
                      </Form.Label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control form-control-sm"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">
                        Select Role
                      </Form.Label>
                      <div className="d-flex gap-3">
                        <label>
                          <Field type="radio" name="role" value="admins" />{" "}
                          Admin
                        </label>
                        <label>
                          <Field type="radio" name="role" value="users" />{" "}
                          Customer
                        </label>
                      </div>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </Form.Group>

                    <div className="d-grid mt-3">
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#2e7d32",
                          border: "none",
                        }}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    </div>
                  </FormikForm>
                )}
              </Formik>

              <p className="text-center mt-2 mb-0 small">
                Don’t have an account?{" "}
                <a
                  href="/create"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Sign up
                </a>
              </p>
            </Card>
          </Col>

          <Col md={6} className="p-0">
            <div
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/premium-vector/flat-modern-illustration-mobile-banking_203633-8152.jpg?w=3060')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
