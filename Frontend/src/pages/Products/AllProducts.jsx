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
import { deleteProduct, getAllProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

import { Bounce, toast, ToastContainer } from "react-toastify";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const allProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    allProducts();
  }, []);

  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  const showSuccessToast = () => {
    toast.success("Product deleted", {
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
    toast.error("Product deletion failed", {
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

  const handleProductDelete = async () => {
    try {
      if (selectedProduct) {
        const response = await deleteProduct(selectedProduct.product_id);
        if (response.status === 200) {
          showSuccessToast();
          const remainingProducts = products.filter((p) => {
            return p.product_id !== selectedProduct.product_id;
          });
          setProducts(remainingProducts);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        showErrorToast();
      }
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="main-content">
        <Container>
          <Row className="mt-4 ">
            <Col lg={8}>
              <Alert variant="primary">All Product List</Alert>
            </Col>
          </Row>
          {products.length === 0 ? (
            <Alert variant="warning">No Products found</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price (₹)</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.product_id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        alt={product.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-button me-2"
                        onClick={() => {
                          setShowConfirmation(true);
                          setSelectedProduct(product);
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
                            `/admin/update-product/${product.product_id}`
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
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              {selectedProduct ? selectedProduct.name : ""}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={hideConfirmation}>
                No
              </Button>
              <Button variant="success" onClick={handleProductDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}

export default AllProducts;
