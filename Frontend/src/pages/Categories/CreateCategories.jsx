import { useState } from "react";
import { Alert, Button, Col, Container, Row, Toast } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../services/CategoryService.js";

function CreateCategory() {
  const [data, setData] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addCategory(data);
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        toast.success("Category Added Successfully", {
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

        setData({ name: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
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
    }
  };

  return (
    <div className="main-content">
      <Container className="mt-4 container">
        <Row>
          <Col lg={8}>
            <h3>Add Category</h3>
            <br></br>
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
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default CreateCategory;
