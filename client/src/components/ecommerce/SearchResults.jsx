// pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../../services/api";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { search } = useLocation();

  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setNoResults(false);

      try {
        const response = await api.get(`/products/search?query=${query}`);
        const result = response.data;
        setProducts(result);
        if (result.length === 0) {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Search Results for: <span className="text-blue-600">"{query}"</span>
      </h2>

      {loading && (
        <div className="text-center text-gray-500 py-20">Loading...</div>
      )}
      {noResults && (
        <div className="text-center text-red-500 py-20">
          No products found matching your search.
        </div>
      )}

      {!loading && !noResults && products.length > 0 && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              {product.images && product.images.length > 0 ? (
                <Link
                  to={`/products/${product._id}`}
                  className="relative w-full h-48 overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full hover:opacity-90 transition"
                    loading="lazy"
                  />
                  {product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
                      +{product.images.length - 1} more
                    </div>
                  )}
                </Link>
              ) : (
                <div className="bg-gray-200 w-full h-48 flex justify-center items-center text-gray-400 text-sm">
                  No Image
                </div>
              )}

              {/* Product Content */}
              <div className="p-4 flex flex-col flex-grow">
                <Link
                  to={`/products/${product._id}`}
                  className="font-semibold text-lg mb-1 hover:text-blue-600 transition"
                >
                  {product.name}
                </Link>

                <p className="text-sm text-gray-600 flex-grow">
                  {product.description
                    ? product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description
                    : "No description"}
                </p>

                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `In stock: ${product.stock}`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.averageRating)}
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.numReviews} reviews)
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
