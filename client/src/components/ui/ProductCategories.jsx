import React from "react";
import {
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
} from "../../assets/images/product-categories";

const categories = [
  {
    title: "Clothing & Apparel",
    image: Img1,
    subcategories: ["Accessories", "Bags", "Kid's Fashion", "Mens"],
    highlighted: true,
  },
  {
    title: "Garden & Kitchen",
    image: Img2,
    subcategories: ["Cookware", "Decoration", "Furniture", "Garden Tools"],
  },
  {
    title: "Consumer Electrics",
    image: Img3,
    subcategories: [
      "Air Conditioners",
      "Audios & Theaters",
      "Car Electronics",
      "Office Electronics",
    ],
  },
  {
    title: "Health & Beauty",
    image: Img4,
    subcategories: ["Equipments", "Hair Care", "Perfumer", "Skin Care"],
  },
  {
    title: "Computers & Technologies",
    image: Img5,
    subcategories: ["Desktop PC", "Laptop", "Smartphones"],
  },
  {
    title: "Jewelry & Watches",
    image: Img6,
    subcategories: [
      "Gemstones Jewelry",
      "Men's Watches",
      "Women's Watches",
    ],
  },
  {
    title: "Phone & Accessories",
    image: Img7,
    subcategories: ["Iphone 8", "Iphone X", "Samsung Note 8"],
  },
  {
    title: "Sport & Outdoor",
    image: Img8,
    subcategories: ["Freezer Burn", "Fridge Cooler", "Wine Cabinets"],
  },
];

const ProductCategories = () => {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex items-center border p-4 gap-4 hover:shadow-md transition ${
              cat.highlighted ? "border-yellow-500" : "border-gray-300"
            }`}
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
