import {
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
} from "../assets/images/product-categories";

export const categories = [
  {
    title: "Clothing & Apparel",
    image: Img1,
    subcategories: ["Accessories", "Bags", "Kid's Fashion", "Mens"],
    highlighted: true,
    top: true,  // Added top key
  },
  {
    title: "Garden & Kitchen",
    image: Img2,
    subcategories: ["Cookware", "Decoration", "Furniture", "Garden Tools"],
    top: true,  // Added top key
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
    top: true,  // Added top key
  },
  {
    title: "Health & Beauty",
    image: Img4,
    subcategories: ["Equipments", "Hair Care", "Perfumer", "Skin Care"],
    top: false,  // Added top key
  },
  {
    title: "Computers & Technologies",
    image: Img5,
    subcategories: ["Desktop PC", "Laptop", "Smartphones"],
    top: true,  // Added top key
  },
  {
    title: "Jewelry & Watches",
    image: Img6,
    subcategories: [
      "Gemstones Jewelry",
      "Men's Watches",
      "Women's Watches",
    ],
    top: true,  // Added top key
  },
  {
    title: "Phone & Accessories",
    image: Img7,
    subcategories: ["Iphone 8", "Iphone X", "Samsung Note 8"],
    top: true,  // Added top key
  },
  {
    title: "Sport & Outdoor",
    image: Img8,
    subcategories: ["Freezer Burn", "Fridge Cooler", "Wine Cabinets"],
    top: true,  // Added top key
  },
];
