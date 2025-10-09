import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

const ProductInfo = ({ product }) => {
  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<Star key={i} color="#ffb400" size={20} />);
      else if (rating >= i - 0.5) stars.push(<StarHalf key={i} color="#ffb400" size={20} />);
      else stars.push(<StarOff key={i} color="#ffb400" size={20} />);
    }
    return stars;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">{product.name}</h1>
      <p className="text-sm text-gray-500">
        Brand: <span className="text-blue-600">{product.brand}</span>
      </p>
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        {renderStars(product.averageRating)}
        <span>({product.numReviews} review{product.numReviews !== 1 ? "s" : ""})</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
      <p className="text-sm text-gray-700">
        Sold By: <span className="text-blue-700 font-bold">{product.soldBy}</span>
      </p>
    </div>
  );
};

export default ProductInfo;
