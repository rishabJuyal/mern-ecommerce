import React from 'react';

const CategoriesSidebar = () => {
  const categories = [
    "Fruits",
    "Cars & Motorcycles",
    "Books & Office",
    "Babies and Moms",
    "Sport & Outdoor",
    "Phones & Accessories",
    "Jewelry & Watches",
    "Computers & Technologies",
    "Health & Beauty",
    "Garden & Kitchen"
  ];

  return (
    <div className="bg-gray-100 w-64 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">CATEGORIES</h2>
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition duration-200 ease-in-out"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
