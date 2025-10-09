import React from "react";
import { categories } from "../../constants/categories";

const TopPicks = () => {
  // Filter categories that are marked as 'top'
  const topCategories = categories.filter((category) => category.top);

  return (
    <section className="w-full mx-auto">
      <h2 className="text-xl font-semibold mb-6">Top Picks</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
        {topCategories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center border p-4 gap-2 transition-all border-gray-300 hover:border-yellow-400"
          >
            {/* Display image and title */}
            <img
              src={cat.image}
              alt={cat.title}
              className="w-34 h-34 object-cover"
            />
            <h3 className="text-xs text-center text-nowrap">{cat.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPicks;
