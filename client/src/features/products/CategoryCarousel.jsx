import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "../../components/ecommerce/ProductCard";

const CategoryCarousel = ({ category, products }) => {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        renderMode: "performance",
        slides: {
            perView: 5,
            spacing: 20,
        },
    });

    return (
        <section>
            {/* Header with category title and navigation */}
            <div className="flex justify-between items-center mb-2 bg-[var(--color-bg-light)] px-3 py-1">
                <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => slider.current?.prev()}
                        className="p-2 rounded-md hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => slider.current?.next()}
                        className="p-2 rounded-md hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider">
                {products.map((product) => (
                    <div className="keen-slider__slide mb-6" key={product._id}>
                        <div className="w-full">
                            <ProductCard product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryCarousel;
