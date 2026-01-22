import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

import { ToastContainer, toast } from "react-toastify";
import AllProducts from "./pages/Products/AllProducts";
import CreateProducts from "./pages/Products/CreateProducts";
import { UpdateProducts } from "./pages/Products/UpdateProducts";
import CreateCategory from "./pages/Categories/CreateCategories";
import AllCategories from "./pages/Categories/AllCategories";
import UpdateCategory from "./pages/Categories/UpdateCategories";
import AllOrders from "./pages/Orders/AllOrders";
import UpdateOrders from "./pages/Orders/UpdateOrders";
import AdminDashboard from "./components/AdminDashboard";
import Services from "./pages/Services";

import UserOrders from "./pages/Orders/UserOrders";
import ProductDetails from "./pages/Products/ProductDetails";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Cart/CheckoutPage";

export default function App() {
  return (
    <div>
      <Header />
      <Container className="mt-4 mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route>
            <Route path="admin" element={<AdminDashboard />}>
              <Route index element={<AllProducts />} />

              {/* product */}
              <Route path="all-products" element={<AllProducts />} />
              <Route path="create-product" element={<CreateProducts />} />
              <Route path="update-product/:id" element={<UpdateProducts />} />

              {/* categories */}
              <Route path="create-category" element={<CreateCategory />} />
              <Route path="all-category" element={<AllCategories />} />
              <Route path="edit-category/:id" element={<UpdateCategory />} />

              {/* //orders */}
              <Route path="orders" element={<AllOrders />} />
              <Route path="edit-order/:id" element={<UpdateOrders />} />
            </Route>
          </Route>
        </Routes>
      </Container>
      <Footer />

      <ToastContainer />
    </div>
  );
}
