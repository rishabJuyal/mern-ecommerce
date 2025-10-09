import React from "react";
import { FaRocket, FaRedo, FaCreditCard, FaHeadset, FaGift } from "react-icons/fa";

const Services = () => {
  return (
    <div className="flex justify-between items-center bg-white py-4 px-6 border border-gray-200">
      {/* Feature 1 - Free Delivery */}
      <div className="flex items-center gap-2">
        <FaRocket size={24} className="text-yellow-500" />
        <div>
          <h3 className="font-semibold text-sm text-black">Free Delivery</h3>
          <p className="text-xs text-gray-600">For all orders over $99</p>
        </div>
      </div>

      {/* Divider */}
      <span className="border-l-2 border-gray-300 h-8 mx-4"></span>

      {/* Feature 2 - 90 Days Return */}
      <div className="flex items-center gap-2">
        <FaRedo size={24} className="text-yellow-500" />
        <div>
          <h3 className="font-semibold text-sm text-black">90 Days Return</h3>
          <p className="text-xs text-gray-600">If goods have problems</p>
        </div>
      </div>

      {/* Divider */}
      <span className="border-l-2 border-gray-300 h-8 mx-4"></span>

      {/* Feature 3 - Secure Payment */}
      <div className="flex items-center gap-2">
        <FaCreditCard size={24} className="text-yellow-500" />
        <div>
          <h3 className="font-semibold text-sm text-black">Secure Payment</h3>
          <p className="text-xs text-gray-600">100% secure payment</p>
        </div>
      </div>

      {/* Divider */}
      <span className="border-l-2 border-gray-300 h-8 mx-4"></span>

      {/* Feature 4 - 24/7 Support */}
      <div className="flex items-center gap-2">
        <FaHeadset size={24} className="text-yellow-500" />
        <div>
          <h3 className="font-semibold text-sm text-black">24/7 Support</h3>
          <p className="text-xs text-gray-600">Dedicated support</p>
        </div>
      </div>

      {/* Divider */}
      <span className="border-l-2 border-gray-300 h-8 mx-4"></span>

      {/* Feature 5 - Gift Service */}
      <div className="flex items-center gap-2">
        <FaGift size={24} className="text-yellow-500" />
        <div>
          <h3 className="font-semibold text-sm text-black">Gift Service</h3>
          <p className="text-xs text-gray-600">Support gift service</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
