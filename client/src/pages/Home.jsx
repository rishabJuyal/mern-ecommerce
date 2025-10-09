import React from "react";
import { Link } from "react-router-dom";
import BrandsStrip from "../components/ecommerce/BrandsStrip";
import Carousel from "../components/ui/Carousel";
import ProductCategories from "../components/ui/ProductCategories";
import CategoriesSidebar from "../components/ecommerce/CategoriesSidebar";
import ProductCard from "../components/ecommerce/ProductCard";

import { ByCategoriesList } from "../constants/ByCategoriesList";
import { ByBrandList } from "../constants/ByBrandList";
import PriceFilter from "../components/ecommerce/PriceFliter";
import Services from "../components/ecommerce/services";
import ProductAdvertisement from "../components/ecommerce/ProductAdvertisement";

import promotion from '../assets/home/promotion.png';
import promotion1 from '../assets/home/promotion_1.jpg';
import promotion2 from '../assets/home/promotion_2.jpg';
import TopPicks from "../components/ui/TopPicks";

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
      <ProductAdvertisement mainImage={promotion} smallImage1={promotion1} smallImage2={promotion2} />
      <Services />
      <BrandsStrip />
      <TopPicks />

      {/* Sidebar + Best Sale Items */}
      <section className="mt-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <CategoriesSidebar title="BY CATEGORIES" categories={ByCategoriesList} />
            <CategoriesSidebar title="BY BRANDS" categories={ByBrandList} />
            <PriceFilter />
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
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
