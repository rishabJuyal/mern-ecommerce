import React, { useState } from "react";
import PropTypes from "prop-types";

const PriceFilter = ({ min = 0, max = 1000, onChange }) => {
  const [priceRange, setPriceRange] = useState({ min, max });

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max);
    const newRange = { ...priceRange, min: value };
    setPriceRange(newRange);
    onChange && onChange(newRange);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min);
    const newRange = { ...priceRange, max: value };
    setPriceRange(newRange);
    onChange && onChange(newRange);
  };

  return (
    <div className="bg-[var(--color-bg-light)] p-4 rounded-md w-64">
      <h3 className="text-lg mb-4">BY PRICE</h3>

      {/* Inputs */}
      <div className="flex space-x-4 items-center mb-6">
        <div className="flex flex-col">
          <label htmlFor="min-price" className="text-sm mb-1 text-gray-700">
            Min Price
          </label>
          <input
            id="min-price"
            type="number"
            min={min}
            max={priceRange.max}
            value={priceRange.min}
            onChange={handleMinChange}
            className="border border-gray-300 rounded px-2 py-1 w-24"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max-price" className="text-sm mb-1 text-gray-700">
            Max Price
          </label>
          <input
            id="max-price"
            type="number"
            min={priceRange.min}
            max={max}
            value={priceRange.max}
            onChange={handleMaxChange}
            className="border border-gray-300 rounded px-2 py-1 w-24"
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="min-slider" className="text-sm text-gray-700">
            Min Price
          </label>
          <input
            id="min-slider"
            type="range"
            min={min}
            max={max}
            value={priceRange.min}
            onChange={handleMinChange}
            className="w-full accent-yellow-500 cursor-pointer"
          />
        </div>

        <div>
          <label htmlFor="max-slider" className="text-sm text-gray-700">
            Max Price
          </label>
          <input
            id="max-slider"
            type="range"
            min={min}
            max={max}
            value={priceRange.max}
            onChange={handleMaxChange}
            className="w-full accent-yellow-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

export default PriceFilter;
