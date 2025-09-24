import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white rounded-2xl p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopEase</h1>
        <p className="text-lg mb-6">Your one-stop shop for everything you love</p>
        <Link
          to="/shop"
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Start Shopping
        </Link>
      </div>

      {/* Featured Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-lg shadow hover:shadow-lg p-4 text-center"
            >
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium">Product {i}</h3>
              <p className="text-red-600 font-bold">$99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
