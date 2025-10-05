// components/ecommerce/ProductCard.jsx
import React from "react";

const ProductCard = ({ item }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-contain mb-5"
        loading="lazy"
      />
      <h3 className="font-semibold text-gray-900 text-lg mb-2 text-center">
        {item.name}
      </h3>
      <p className="text-red-600 font-extrabold text-xl mb-2">
        ${item.price.toFixed(2)}
      </p>
      {/* Star rating */}
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              index < item.rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.05 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.951-.69l1.286-3.974z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
