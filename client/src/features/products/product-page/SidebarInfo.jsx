import React from "react";

const SidebarInfo = () => (
  <aside className="col-span-3 space-y-6 text-sm text-gray-700 bg-gray-50 p-4 rounded shadow">
    <div className="space-y-2">
      <p>📦 Shipping worldwide</p>
      <p>↩️ Free 7-day return if eligible, so easy</p>
      <p>🧾 Supplier gives bills for this product.</p>
      <p>💵 Pay online or when receiving goods</p>
    </div>

    <p className="text-sm text-blue-700">
      Sell on Jshop? <a href="#" className="underline">Register Now !</a>
    </p>

    <div className="bg-white border p-2 rounded">
      <img src="https://via.placeholder.com/200x200?text=iPhone+6+32GB" alt="Ad" className="w-full" />
      <p className="text-xs text-center mt-1">iPhone 6+ 32Gb – 40% OFF</p>
    </div>

    <h4 className="text-gray-800 font-semibold text-base">Same Brand</h4>
    <p className="text-xs text-gray-500">Activate Windows</p>
  </aside>
);

export default SidebarInfo;
