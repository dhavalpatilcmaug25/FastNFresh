// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Carousel,
//   Button,
//   Nav,
//   Card,
//   Badge,
// } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import img1 from "../assets/carousel-1.jpg";
// import img2 from "../assets/carousel-2.jpg";
// import img3 from "../assets/carousel-3.jpg";
// import { getCategory } from "../services/CategoryService";
// import { getAllProduct } from "../services/ProductService";

// export default function Home() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           getCategory(),
//           getAllProduct(),
//         ]);
//         const cats = catRes.data || catRes;
//         const prods = prodRes.data || prodRes;
//         setCategories(cats);
//         setProducts(prods);
//         if (cats && cats.length > 0)
//           setActiveCategory(cats[0].category_id || cats[0].id);
//       } catch (err) {
//         console.error("Failed to load categories or products", err);
//       }
//     }
//     loadData();
//   }, []);

//   const productsForCategory = (cat) => {
//     const catId = cat?.category_id || cat?.id;
//     return products.filter((p) => {
//       const pid = p.category_id || p.categoryId || p.category;
//       return String(pid) === String(catId);
//     });
//   };

//   return (
//     <div>
//       <Carousel
//         interval={4000}
//         controls
//         indicators
//         fade={false}
//         style={{
//           borderRadius: "20px",
//           overflow: "hidden",
//           maxWidth: "140vw",
//           maxHeight: "500px",
//           imageFit: "cover",
//           margin: "0 auto",
//         }}
//       >
//         <Carousel.Item>
//           <img className="d-block w-100" src={img1} alt="First slide" />
//           <Carousel.Caption
//             style={{
//               color: "gray",
//               fontWeight: "bold",
//               bottom: "50%",
//               transform: "translateX(-35%) translateY(10%)",
//             }}
//           >
//             <h3>Organic Food Is Good For Health</h3>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100" src={img2} alt="Second slide" />
//           <Carousel.Caption
//             style={{
//               color: "gray",
//               fontWeight: "bold",
//               bottom: "50%",
//               transform: "translateX(-35%) translateY(10%)",
//             }}
//           >
//             <h3>Natural Food Is Always Healthy</h3>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100" src={img3} alt="Third slide" />
//           <Carousel.Caption
//             style={{
//               color: "gray",
//               fontWeight: "bold",
//               bottom: "50%",
//               transform: "translateX(35%) translateY(10%)",
//             }}
//           >
//             <h3>Choose healthy. Be strong. Live long.</h3>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>

//       <Container className="py-5">
//         <Row className="align-items-end mb-4">
//           <Col lg={6}>
//             <div>
//               <h1 className="display-5 mb-3">Our Products</h1>
//               <p>
//                 Check out our products which include various varieties and price
//                 ranges.
//               </p>
//             </div>
//           </Col>
//           <Col lg={6} className="text-lg-end text-start">
//             <Nav
//               variant="pills"
//               activeKey={activeCategory}
//               className="justify-content-end flex-wrap"
//             >
//               {categories && categories.length > 0 ? (
//                 categories.map((cat) => {
//                   const cid = cat.category_id || cat.id;
//                   return (
//                     <Nav.Item key={cid}>
//                       <Nav.Link
//                         eventKey={cid}
//                         onClick={() => setActiveCategory(cid)}
//                         style={{
//                           border: "2px solid #198754",
//                           borderRadius: "50px",
//                           color:
//                             String(activeCategory) === String(cid)
//                               ? "white"
//                               : "#198754",
//                           backgroundColor:
//                             String(activeCategory) === String(cid)
//                               ? "#198754"
//                               : "transparent",
//                           margin: "0 6px",
//                         }}
//                       >
//                         {cat.name}
//                       </Nav.Link>
//                     </Nav.Item>
//                   );
//                 })
//               ) : (
//                 <Nav.Item>
//                   <Nav.Link disabled>No Categories</Nav.Link>
//                 </Nav.Item>
//               )}
//             </Nav>
//           </Col>
//         </Row>

//         <Row className="g-4">
//           {categories && categories.length > 0 ? (
//             productsForCategory(
//               categories.find(
//                 (c) => String(c.category_id || c.id) === String(activeCategory)
//               )
//             ).map((product) => (
//               <Col
//                 xl={3}
//                 lg={4}
//                 md={6}
//                 sm={12}
//                 key={product.product_id || product.id || product._id}
//               >
//                 <Card className="h-100 border-0 shadow-sm">
//                   <div className="position-relative">
//                     <Card.Img
//                       variant="top"
//                       src={
//                         product.image
//                           ? `http://localhost:3000/uploads/${product.image}`
//                           : "../assets/asparagus.jpg"
//                       }
//                       alt={product.name}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "../assets/asparagus.jpg";
//                       }}
//                     />
//                     {product.isNew && (
//                       <Badge
//                         bg="secondary"
//                         text="light"
//                         className="position-absolute top-0 start-0 m-3"
//                       >
//                         New
//                       </Badge>
//                     )}
//                   </div>
//                   <Card.Body className="text-center">
//                     <Card.Title>{product.name}</Card.Title>
//                     <div className="mb-2">
//                       <span className="text-success">Qty. 1 KG</span>
//                     </div>
//                     <div>
//                       <span className="text-primary fw-bold">
//                         ₹{product.price}
//                       </span>
//                       {product.original_price && (
//                         <span className="text-muted text-decoration-line-through ms-2">
//                           ₹{product.original_price}
//                         </span>
//                       )}
//                     </div>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-top-0">
//                     <Row className="g-0 text-center">
//                       <Col xs={6} className="border-end">
//                         <Button
//                           variant="link"
//                           className="text-decoration-none text-success"
//                           onClick={() =>
//                             navigate(
//                               `/products/${
//                                 product.product_id || product.id || product._id
//                               }`
//                             )
//                           }
//                         >
//                           <i className="bi bi-eye me-1"></i> View
//                         </Button>
//                       </Col>
//                       <Col xs={6}>
//                         <Button
//                           variant="link"
//                           className="text-decoration-none text-success"
//                         >
//                           <i className=" me-1"></i> Add
//                         </Button>
//                       </Col>
//                     </Row>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col className="text-center">No products available</Col>
//           )}
//         </Row>

//         <Row className="mt-5">
//           <Col className="text-center">
//             <Button
//               variant="outline-success"
//               className="rounded-pill px-4 py-2"
//               href="/product"
//             >
//               <b>Browse More Products</b>
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Nav,
  Card,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/carousel-1.jpg";
import img2 from "../assets/carousel-2.jpg";
import img3 from "../assets/carousel-3.jpg";
import { getCategory } from "../services/CategoryService";
import { getAllProduct } from "../services/ProductService";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategory(),
          getAllProduct(),
        ]);
        const cats = catRes.data || catRes;
        const prods = prodRes.data || prodRes;
        setCategories(cats);
        setProducts(prods);
        if (cats && cats.length > 0)
          setActiveCategory(cats[0].category_id || cats[0].id);
      } catch (err) {
        console.error("Failed to load categories or products", err);
      }
    }
    loadData();
  }, []);

  const productsForCategory = (cat) => {
    const catId = cat?.category_id || cat?.id;
    return products.filter((p) => {
      const pid = p.category_id || p.categoryId || p.category;
      return String(pid) === String(catId);
    });
  };

  return (
    <div>
      <Carousel
        interval={4000}
        controls
        indicators
        fade={false}
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          maxWidth: "140vw",
          maxHeight: "500px",
          imageFit: "cover",
          margin: "0 auto",
        }}
      >
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption
            style={{
              color: "gray",
              fontWeight: "bold",
              bottom: "50%",
              transform: "translateX(-35%) translateY(10%)",
            }}
          >
            <h3>Organic Food Is Good For Health</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption
            style={{
              color: "gray",
              fontWeight: "bold",
              bottom: "50%",
              transform: "translateX(-35%) translateY(10%)",
            }}
          >
            <h3>Natural Food Is Always Healthy</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption
            style={{
              color: "gray",
              fontWeight: "bold",
              bottom: "50%",
              transform: "translateX(35%) translateY(10%)",
            }}
          >
            <h3>Choose healthy. Be strong. Live long.</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* ✅ Added two buttons below the carousel */}
      <Container className="text-center my-4">
        <Button
          variant="success"
          className="mx-2 px-4 py-2 rounded-pill"
          onClick={() => navigate("/create")}
        >
          Buy Your Groceries Now
        </Button>
        <Button
          variant="outline-success"
          className="mx-2 px-4 py-2 rounded-pill"
          onClick={() => navigate("/about")}
        >
          Know More
        </Button>
      </Container>

      <Container className="py-5">
        <Row className="align-items-end mb-4">
          <Col lg={6}>
            <div>
              <h1 className="display-5 mb-3">Our Products</h1>
              <p>
                Check out our products which include various varieties and price
                ranges.
              </p>
            </div>
          </Col>
          <Col lg={6} className="text-lg-end text-start">
            <Nav
              variant="pills"
              activeKey={activeCategory}
              className="justify-content-end flex-wrap"
            >
              {categories && categories.length > 0 ? (
                categories.map((cat) => {
                  const cid = cat.category_id || cat.id;
                  return (
                    <Nav.Item key={cid}>
                      <Nav.Link
                        eventKey={cid}
                        onClick={() => setActiveCategory(cid)}
                        style={{
                          border: "2px solid #198754",
                          borderRadius: "50px",
                          color:
                            String(activeCategory) === String(cid)
                              ? "white"
                              : "#198754",
                          backgroundColor:
                            String(activeCategory) === String(cid)
                              ? "#198754"
                              : "transparent",
                          margin: "0 6px",
                        }}
                      >
                        {cat.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })
              ) : (
                <Nav.Item>
                  <Nav.Link disabled>No Categories</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Col>
        </Row>

        <Row className="g-4">
          {categories && categories.length > 0 ? (
            productsForCategory(
              categories.find(
                (c) => String(c.category_id || c.id) === String(activeCategory)
              )
            ).map((product) => (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={12}
                key={product.product_id || product.id || product._id}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={
                        product.image
                          ? `http://localhost:3000/uploads/${product.image}`
                          : "../assets/asparagus.jpg"
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "../assets/asparagus.jpg";
                      }}
                    />
                    {product.isNew && (
                      <Badge
                        bg="secondary"
                        text="light"
                        className="position-absolute top-0 start-0 m-3"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title>{product.name}</Card.Title>
                    <div className="mb-2">
                      <span className="text-success">Qty. 1 KG</span>
                    </div>
                    <div>
                      <span className="text-primary fw-bold">
                        ₹{product.price}
                      </span>
                      {product.original_price && (
                        <span className="text-muted text-decoration-line-through ms-2">
                          ₹{product.original_price}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0">
                    <Row className="g-0 text-center">
                      <Col xs={6} className="border-end">
                        <Button
                          variant="link"
                          className="text-decoration-none text-success"
                          onClick={() =>
                            navigate(
                              `/products/${
                                product.product_id || product.id || product._id
                              }`
                            )
                          }
                        >
                          <i className="bi bi-eye me-1"></i> View
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <Button
                          variant="link"
                          className="text-decoration-none text-success"
                        >
                          <i className=" me-1"></i> Add
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">No products available</Col>
          )}
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <Button
              variant="outline-success"
              className="rounded-pill px-4 py-2"
              href="/product"
            >
              <b>Browse More Products</b>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
