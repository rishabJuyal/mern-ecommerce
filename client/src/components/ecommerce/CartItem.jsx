import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { product, quantity } = item;

  if (!product) return null; // just in case

  const imageUrl =
    product.images?.[0] ||
    "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 border p-4 rounded shadow-sm">
      <img
        src={imageUrl}
        alt={product.name || "Product"}
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="font-bold text-green-700 mb-2">
          ${product.price?.toFixed(2) || "0.00"}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            className="bg-gray-200 px-2 py-1 rounded text-lg"
            onClick={() => onQuantityChange(product._id, quantity - 1)}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            className="bg-gray-200 px-2 py-1 rounded text-lg"
            onClick={() => onQuantityChange(product._id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 md:mt-0">
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
