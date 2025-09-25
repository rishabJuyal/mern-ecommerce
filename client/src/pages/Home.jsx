import React from "react";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-black text-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-12 md:p-20 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to ShopEase
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your one-stop shop for everything you love.
          </p>
          <Link
            to="/shop"
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            Start Shopping
          </Link>
        </div>

        {/* Background image fade on the right */}
        <img
          src="https://images.unsplash.com/photo-1606813905944-dbdc2c8d16ff?auto=format&fit=crop&w=1000&q=80"
          alt="Shopping"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30 hidden md:block"
        />
      </section>

      {/* Featured Products */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            to="/shop"
            className="text-red-600 font-medium hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-red-600 font-bold text-lg">
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
