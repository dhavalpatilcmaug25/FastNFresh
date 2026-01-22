import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { deleteCategory, getCategory } from "../../services/CategoryService";
import { getToken } from "../../services/TokenService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./categories.css";

function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = getToken();
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await getCategory();
        setCategories(res.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  const showSuccessToast = () => {
    toast.success("Category deleted successfully!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      theme: "colored",
      transition: Bounce,
    });
  };

  const showErrorToast = () => {
    toast.error("Failed to delete category!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleCategoryDelete = async () => {
    try {
      if (selectedCategory) {
        const response = await deleteCategory(selectedCategory.category_id);
        if (response.status === 200) {
          showSuccessToast();
          const remaining = categories.filter(
            (c) => c.category_id !== selectedCategory.category_id
          );
          setCategories(remaining);
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      showErrorToast();
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Container>
          <Row className="mt-4">
            <Col lg={8}>
              <h3>All Category List</h3>
              <br></br>
            </Col>
          </Row>

          {categories.length === 0 ? (
            <Alert variant="warning">No Categories Found</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. no.</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-button me-2"
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowConfirmation(true);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="action-button"
                        onClick={() => {
                          navigate(
                            `/admin/edit-category/${category.category_id}`
                          );
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Modal show={showConfirmation} onHide={hideConfirmation}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              {selectedCategory ? selectedCategory.name : ""}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={hideConfirmation}>
                No
              </Button>
              <Button variant="success" onClick={handleCategoryDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default AllCategories;
