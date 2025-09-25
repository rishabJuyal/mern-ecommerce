import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../features/cart/Cart";
import Wishlist from "../features/wishlist/Wishlist";
import Orders from "../features/orders/Orders";
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute"; // import it
import AddProduct from "../pages/admin/AddProduct";
import RegisterPage from "../pages/Register";
import ProductPage from "../features/products/ProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products/:id" element={<ProductPage />} />

      <Route path="/add-product" element={<AddProduct />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/add-product" element={<AddProduct />} /> */}

      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
