import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { product, quantity } = item;

  if (!product) return null;

  const imageUrl =
    product.images?.[0] ||
    "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={product.name || "Product"}
        className="w-28 h-28 object-cover rounded-md border"
      />

      {/* Product Info */}
      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <p className="text-green-700 font-bold text-base">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => onQuantityChange(product._id, quantity - 1)}
              className="bg-gray-100 text-lg px-3 py-1 rounded hover:bg-gray-200"
            >
              −
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => onQuantityChange(product._id, quantity + 1)}
              className="bg-gray-100 text-lg px-3 py-1 rounded hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Delete Icon */}
      <div className="mt-4 md:mt-0 self-start md:self-center">
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-600 hover:text-red-800 transition"
          title="Remove from cart"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
