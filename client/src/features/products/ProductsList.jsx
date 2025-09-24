import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Group products by category
  const groupedByCategory = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

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
        <p className="text-gray-500">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No products available.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Our Products</h1>

      {Object.entries(groupedByCategory).map(([category, productsInCategory]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
            {category}
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productsInCategory.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {/* Wrap image in Link */}
                {product.images && product.images.length > 0 ? (
                  <Link to={`/products/${product._id}`} className="relative w-full h-48 overflow-hidden">
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

                <div className="p-4 flex flex-col flex-grow">
                  {/* Wrap product name in Link */}
                  <Link to={`/products/${product._id}`} className="font-semibold text-lg mb-1 hover:text-blue-600 transition">
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
        </section>
      ))}
    </div>
  );
};

export default ProductsList;
