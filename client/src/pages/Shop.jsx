import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BrandsStrip from "../components/ecommerce/BrandsStrip";
import Carousel from "../components/ui/Carousel";
import ProductCategories from "../components/ui/ProductCategories";
import CategoriesSidebar from "../components/ecommerce/CategoriesSidebar";
import ProductsList from "../features/products/ProductsList";


import { ByCategoriesList } from "../constants/ByCategoriesList";
import { ByBrandList } from "../constants/ByBrandList";
import PriceFilter from "../components/ecommerce/PriceFliter";

const Shop = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Carousel Section */}
      <Carousel />
      <BrandsStrip />
      <ProductCategories />

      {/* Sidebar + Best Sale Items */}
      <section className="mt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <CategoriesSidebar title="BY CATEGORIES" categories={ByCategoriesList} />
            <CategoriesSidebar title="BY BRANDS" categories={ByBrandList} />
            <PriceFilter />
          </div>

          {/* Products */}
          <div className="w-full lg:w-3/4">
            {/* Products List Component */}
            <ProductsList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
