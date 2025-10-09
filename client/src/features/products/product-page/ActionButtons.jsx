import React from "react";
import { Heart, BarChart2 } from "lucide-react";

const ActionButtons = ({ onAddToCart, onBuyNow, disabled, cartLoading }) => (
  <>
    <button
      onClick={onAddToCart}
      disabled={disabled}
      className={`px-5 py-2 rounded text-white font-semibold ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
      }`}
    >
      {cartLoading ? "Adding..." : "Add to cart"}
    </button>

    <button
      onClick={onBuyNow}
      disabled={disabled}
      className={`px-5 py-2 rounded font-semibold ${
        disabled ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
      }`}
    >
      {cartLoading ? "Buying..." : "Buy Now"}
    </button>

    <Heart className="text-gray-500 cursor-pointer" size={24} />
    <BarChart2 className="text-gray-500 cursor-pointer" size={24} />
  </>
);

export default ActionButtons;
