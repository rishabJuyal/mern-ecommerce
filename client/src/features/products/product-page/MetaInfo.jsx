import React from "react";

const MetaInfo = ({ product }) => (
  <div className="text-sm text-gray-500 mt-4 space-y-1">
    <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
    <p><strong>Categories:</strong> {product.category || "Uncategorized"}</p>
    <p><strong>Tags:</strong> {product.tags?.join(", ") || "None"}</p>
  </div>
);

export default MetaInfo;
