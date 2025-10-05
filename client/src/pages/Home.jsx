import React from "react";
import { Link } from "react-router-dom";
import BrandsStrip from "../components/ecommerce/BrandsStrip";
import Carousel from "../components/ui/Carousel";
import ProductCategories from "../components/ui/ProductCategories";
import CategoriesSidebar from "../components/ecommerce/CategoriesSidebar";
import ProductCard from "../components/ecommerce/ProductCard";

const bestSaleItems = [
  {
    id: 1,
    name: "Package 2 iClever",
    price: 79.99,
    image: "https://example.com/product1.jpg",
    rating: 4,
  },
  {
    id: 2,
    name: "Xbox One Wireless",
    price: 59.99,
    image: "https://example.com/product2.jpg",
    rating: 3,
  },
  {
    id: 3,
    name: "Korea Long Sofa",
    price: 30.99,
    image: "https://example.com/product3.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Aroma Rice Cooker",
    price: 11.99,
    image: "https://example.com/product4.jpg",
    rating: 4,
  },
  {
    id: 5,
    name: "Marshall Kilburn Portable",
    price: 12.99,
    image: "https://example.com/product5.jpg",
    rating: 4,
  },
];

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Carousel Section */}
      <Carousel />
      <BrandsStrip />
      <ProductCategories />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-black text-white rounded-3xl overflow-hidden shadow-2xl mt-20 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Elevate Your Shopping Experience
          </h1>
          <p className="mb-8 text-lg opacity-90 max-w-lg mx-auto md:mx-0">
            Discover exclusive deals, top brands, and the best products all in
            one place.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Start Shopping
          </Link>
        </div>

        <div className="md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1606813905944-dbdc2c8d16ff?auto=format&fit=crop&w=800&q=80"
            alt="Shopping"
            className="rounded-3xl object-cover w-full h-72 md:h-[400px] opacity-80 shadow-lg block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black rounded-3xl pointer-events-none"></div>
        </div>
      </section>

      {/* Sidebar + Best Sale Items */}
      <section className="mt-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <CategoriesSidebar />
          </div>

          {/* Products */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Best Sale Items</h2>
              <Link
                to="/shop"
                className="text-red-600 font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {bestSaleItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
