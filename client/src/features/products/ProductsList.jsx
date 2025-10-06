import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import CategoryCarousel from "./CategoryCarousel";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const groupedByCategory = React.useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  }, [products]);

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
    <div className="mx-auto">
      {Object.entries(groupedByCategory).map(([category, productsInCategory]) => (
        <CategoryCarousel
          key={category}
          category={category}
          products={productsInCategory}
        />
      ))}
    </div>
  );
};

export default ProductsList;
