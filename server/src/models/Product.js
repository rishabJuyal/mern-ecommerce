// models/Product.js
const mongoose = require("mongoose");
const ProductCategories = require("../../constants/ProductCategories");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true , enum :ProductCategories},
  stock: { type: Number, default: 0 },
  images: [String],
  averageRating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
