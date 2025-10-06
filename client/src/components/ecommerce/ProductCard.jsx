import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Function to render the star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-100 flex flex-col w-full">
      {/* Product image */}
      {product.images && product.images.length > 0 ? (
        <Link to={`/products/${product._id}`} className="relative w-full h-40 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-400 ease-in-out transform hover:scale-105"
            loading="lazy"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
              +{product.images.length - 1} more
            </div>
          )}
        </Link>
      ) : (
        <div className="bg-gray-200 w-full h-40 flex justify-center items-center text-gray-400 text-sm">
          No Image
        </div>
      )}

      {/* Product details */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Product name */}
        <Link
          to={`/products/${product._id}`}
          className="font-medium text-xs mb-1 h-9 hover:text-blue-600 transition"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {product.name}
        </Link>


        {/* Category and stock status */}
        <div className="flex items-center space-x-1 mb-1">
          <span className="text-[9px] font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
            {product.category}
          </span>
          <span
            className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
          </span>
        </div>

        {/* Ratings and reviews */}
        <div className="flex items-center space-x-1 mb-1 text-nowrap text-xs">
          {renderStars(product.averageRating)}
          <span className="text-gray-600 ml-1">
            ({product.numReviews} reviews)
          </span>
        </div>

        {/* Product price */}
        <div className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
