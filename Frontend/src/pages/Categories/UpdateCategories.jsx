import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Form } from "react-bootstrap";
import { toast, Bounce, ToastContainer } from "react-toastify";
import {
  getCategoryById,
  updateCategory,
} from "../../services/CategoryService.js";

import "./categories.css";

function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "" });

  // Fetch category by ID
  const fetchCategoryById = useCallback(async () => {
    try {
      const res = await getCategoryById(id);
      if (res.status === 200) {
        const category = Array.isArray(res.data) ? res.data[0] : res.data;
        setData(category);
      } else {
        toast.error("Failed to fetch category data", { theme: "colored" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching category", { theme: "colored" });
    }
  }, [id]);

  useEffect(() => {
    fetchCategoryById();
  }, [fetchCategoryById]);

  //Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //Toasts
  const showSuccessToast = () => {
    toast.success("Category updated successfully", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showErrorToast = () => {
    toast.error("Failed to update category", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  // update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory(id, data);
      if (res.status === 200) {
        showSuccessToast();
        setTimeout(() => {
          navigate("/admin/all-category");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  return (
    <div className="main-content">
      <Container className="mt-4 container">
        <Row>
          <Col lg={8}>
            <Alert variant="primary" className="category-title">
              Update Category
            </Alert>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Category
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default UpdateCategory;
