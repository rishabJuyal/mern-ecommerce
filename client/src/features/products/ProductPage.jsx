import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProductState } from "../../store/productSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearProductState());
    };
  }, [dispatch, id]);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg font-medium">Loading product details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition"
        >
          Go Back
        </button>
      </div>
    );

  if (!selectedProduct) return null;

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-block text-blue-600 hover:text-blue-800 font-semibold transition"
      >
        &larr; Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <section className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          {selectedProduct.images && selectedProduct.images.length > 0 ? (
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="bg-gray-100 w-full h-96 flex justify-center items-center text-gray-400 text-sm rounded-lg">
              No Images Available
            </div>
          )}

          {/* Thumbnails if multiple images */}
          {selectedProduct.images && selectedProduct.images.length > 1 && (
            <div className="mt-4 flex space-x-3 overflow-x-auto">
              {selectedProduct.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${selectedProduct.name} thumbnail ${i + 1}`}
                  className="h-20 w-20 rounded-md object-cover cursor-pointer hover:ring-2 hover:ring-blue-600 transition"
                  loading="lazy"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // Optional scroll to top on click
                />
              ))}
            </div>
          )}
        </section>

        {/* Product Details */}
        <section className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{selectedProduct.name}</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">{renderStars(selectedProduct.averageRating)}</div>
              <span className="text-gray-600 text-sm font-medium">
                ({selectedProduct.numReviews} reviews)
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
              {selectedProduct.description || "No description available."}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold text-sm shadow-sm">
                Category: {selectedProduct.category}
              </span>
              <span
                className={`px-4 py-1 rounded-full font-semibold text-sm shadow-sm ${
                  selectedProduct.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedProduct.stock > 0
                  ? `In stock: ${selectedProduct.stock}`
                  : "Out of stock"}
              </span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-8">
              ${selectedProduct.price.toFixed(2)}
            </div>
          </div>

          {/* Action Button */}
          <div>
            {selectedProduct.stock > 0 ? (
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-md text-lg font-semibold shadow-lg transition">
                Add to Cart
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-4 rounded-md text-lg font-semibold cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
