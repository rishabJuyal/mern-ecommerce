import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../features/cart/Cart";
import Wishlist from "../features/wishlist/Wishlist";
// import Orders from "../features/orders/Orders";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute"; // import it
import AddProduct from "../pages/admin/AddProduct";
import RegisterPage from "../pages/Register";
import ProductPage from "../features/products/ProductPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import Checkout from "../features/checkout/Checkout";
import AddressPage from "../features/address/AddressPage";
import SearchResults from "../components/ecommerce/SearchResults";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products/:id" element={<ProductPage />} />

      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/change-address" element={<AddressPage />} />

      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout/cart" element={<Checkout />} />
        <Route path="/checkout/product/:productId/:quantity" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
