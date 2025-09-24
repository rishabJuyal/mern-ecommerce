import React from "react";

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: "Product C", price: 70 },
    { id: 2, name: "Product D", price: 120 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Wishlist</h2>

      {wishlistItems.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-red-600 font-bold">${item.price}</p>
              <button className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
