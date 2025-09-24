import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-blue-600 font-bold mb-3">{formatCurrency(product.price)}</p>

        <div className="flex gap-2">
          <Button variant="primary" className="flex-1 flex items-center justify-center gap-1">
            <ShoppingCart size={16} /> Add to Cart
          </Button>
          <Button variant="secondary" className="flex items-center justify-center">
            <Heart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
