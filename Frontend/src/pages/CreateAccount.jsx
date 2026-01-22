import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { signUpSchema } from "../schemas/SignUpSchema";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { RegisterUser } from "../services/AuthServices";

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await RegisterUser(values);
      if (res.status === 200) {
        toast.success(`${values.role} registered successfully!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
        resetForm();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left: Form */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Card className="shadow p-4 rounded-3 w-75">
              <h4 className="text-center fw-bold" style={{ color: "#2e7d32" }}>
                Create Account
              </h4>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  role: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <FormikForm>
                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Username
                      </Form.Label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your username"
                        className="form-control form-control-sm"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger smalls"
                      />
                    </Form.Group>

                    <Form.Group>
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

                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Phone
                      </Form.Label>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        className="form-control form-control-sm"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Password
                      </Form.Label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="form-control form-control-sm"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger small "
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="small mb-0 fw-semibold">
                        Select Role
                      </Form.Label>
                      <div className="d-flex gap-3">
                        <label>
                          <Field type="radio" name="role" value="admin" /> Admin
                        </label>
                        <label>
                          <Field type="radio" name="role" value="customer" />{" "}
                          Customer
                        </label>
                      </div>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </Form.Group>

                    <div className="d-grid mt-1">
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isSubmitting}
                        style={{ backgroundColor: "#2e7d32", border: "none" }}
                      >
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                      </Button>
                    </div>
                  </FormikForm>
                )}
              </Formik>

              <p className="text-center mt-1 mb-0 small">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Sign in
                </a>
              </p>
            </Card>
          </Col>

          <Col md={6} className="p-0">
            <div
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/premium-vector/boy-is-signing-up-account_118167-6389.jpg?w=1060')",
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

export default CreateAccount;
