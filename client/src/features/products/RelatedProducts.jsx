import React from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://via.placeholder.com/300x300?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 129.99,
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.99,
    image: "https://via.placeholder.com/300x300?text=Speaker",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 25.0,
    image: "https://via.placeholder.com/300x300?text=Charger",
  },
];

const RelatedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow hover:shadow-md transition rounded-lg overflow-hidden border border-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
              <p className="text-lg font-bold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full text-center text-sm font-medium bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
