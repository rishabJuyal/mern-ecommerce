// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import BrandsStrip from "../components/ecommerce/BrandsStrip";
import Carousel from "../components/ui/Carousel";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1611186871348-b7c498d1f9fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1528701800484-7093a6c3ba33?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155228f7b4?auto=format&fit=crop&w=600&q=80",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <BrandsStrip />

      {/* Carousel Section */}
      <Carousel />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-black text-white rounded-3xl overflow-hidden shadow-2xl mt-20 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Elevate Your Shopping Experience
          </h1>
          <p className="mb-8 text-lg opacity-90 max-w-lg mx-auto md:mx-0">
            Discover exclusive deals, top brands, and the best products all in
            one place.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Start Shopping
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1606813905944-dbdc2c8d16ff?auto=format&fit=crop&w=800&q=80"
            alt="Shopping"
            className="rounded-3xl object-cover w-full h-72 md:h-[400px] opacity-80 shadow-lg block"
            loading="lazy"
          />
          {/* Overlay gradient for fade effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black rounded-3xl pointer-events-none"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/shop"
            className="text-red-600 font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-5 block"
                loading="lazy"
              />
              <h3 className="font-semibold text-gray-900 text-lg mb-2 text-center">
                {product.name}
              </h3>
              <p className="text-red-600 font-extrabold text-xl">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
