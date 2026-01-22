import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/ProductService";
import { Alert, Button, Col, Container, Row, Form } from "react-bootstrap";
import { getCategory } from "../../services/CreateService";

import { Bounce, toast, ToastContainer } from "react-toastify";
export function UpdateProducts() {
  const { id } = useParams();
  console.log("id from url", id);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
  });

  const fetchProductById = async () => {
    try {
      const res = await getProductById(id);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getCategory();
        console.log(res);

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const showSuccessToast = () => {
    toast.success("Product Updated", {
      position: "top-right",
      autoClose: 5000,
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
    toast.error("Product Update failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await updateProduct(id, data);
      console.log(res);
      if (res.status === 200) {
        showSuccessToast();
        navigate("/admin/all-products");
      }
    } catch (error) {
      console.log(error);
      showErrorToast();
    }
  };

  return (
    <>
      <div className=" main-content">
        <Container className="mt-4 container">
          <Row>
            <Col lg={8}>
              <Alert variant="primary product-title">Update a product</Alert>
            </Col>
          </Row>
          <Row className="mt-3 ">
            <Col lg={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Product Description"
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    onChange={handleChange}
                    value={data.price}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Stock"
                    name="stock"
                    onChange={handleChange}
                    value={data.stock}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category_id"
                    onChange={handleChange}
                    value={data.category_id}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.category_id} value={c.category_id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Product
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
