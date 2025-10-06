import React from "react";
import { categories } from "../../constants/categories";

const ProductCategories = () => {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex items-center border p-4 gap-4 transition-all
            border-gray-300
            hover:border-yellow-400`}
          >
            {/* Image on the left */}
            <img
              src={cat.image}
              alt={cat.title}
              className="w-24 h-24 object-contain"
              loading="lazy"
            />

            {/* Text on the right */}
            <div>
              <h3 className="text-base font-semibold mb-1">{cat.title}</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {cat.subcategories.map((sub, subIdx) => (
                  <li key={subIdx} className="hover:underline cursor-pointer">
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
