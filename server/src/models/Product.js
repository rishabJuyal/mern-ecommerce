const mongoose = require("mongoose");
const ProductCategories = require("../../constants/ProductCategories");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ProductCategories },
    stock: { type: Number, default: 0 },
    images: [String],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    codAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Create a text index for full-text search on name and description fields
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
