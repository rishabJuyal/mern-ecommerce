import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import ProductsList from "../features/products/ProductsList";
import SearchComponent from "../components/ecommerce/SearchComponent";

const Shop = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductsList />
    </div>
  );
};

export default Shop;
