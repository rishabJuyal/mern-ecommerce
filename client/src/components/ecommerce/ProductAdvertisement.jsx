import React from "react";

const ProductAdvertisement = ({ mainImage, smallImage1, smallImage2 }) => {
  return (
    <div className="flex mb-8">
      {/* Main Poster Image */}
      <div className="relative flex-grow">
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Small Images */}
      <div className="flex flex-col justify-between ml-6">
        <div className="mb-6">
          <img
            src={smallImage1}
            alt="Small Product 1"
            className="w-128 h-full object-cover"
          />
        </div>
        <div>
          <img
            src={smallImage2}
            alt="Small Product 2"
            className="w-128 h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAdvertisement;
