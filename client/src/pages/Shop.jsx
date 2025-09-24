import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const dummyProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Stylish Shirt ${i + 1}`,
  price: (29.99 + i * 2).toFixed(2),
  image: `https://picsum.photos/300/300?random=${i + 1}`,
  rating: Math.floor(Math.random() * 5) + 1,
}));

const renderStars = (rating) => {
  return Array.from({ length: 5 }).map((_, index) => {
    if (index < rating) return <FaStar key={index} className="text-yellow-400" />;
    return <FaRegStar key={index} className="text-yellow-300" />;
  });
};

const Shop = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Discover Our New Arrivals</h1>
        <p className="text-lg">Shop the latest trends with unbeatable prices</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">All</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Men</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Women</button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Accessories</button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-700">Sort by:</label>
            <select id="sort" className="border rounded px-3 py-1 text-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  {renderStars(product.rating)}
                  <span className="ml-2">({product.rating})</span>
                </div>
                <p className="text-red-600 font-bold text-lg">${product.price}</p>
                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2">
                  <FiShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
