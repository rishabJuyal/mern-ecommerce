const fs = require('fs'); // Add this line at the top of your file
const path = require('path');

const multer = require('multer');
const cloudinary = require("../../config/cloudinary")

const Product = require("../../models/Product");

// Temp storage folder
const upload = multer({
  dest: path.join(__dirname, '../../../uploads'), // makes sure it's project-relative
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file (optional)
});

exports.createProduct = [
  upload.array("images", 5), // Accept up to 5 images
  async (req, res) => {
    const { name, description, price, category, stock, codAvailable } = req.body

    // Basic Validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
      }
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: "Invalid price." });
      }
      // Upload images to Cloudinary
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "products",
        })
      );
      const uploaded = await Promise.all(uploadPromises);

      const imageUrls = uploaded.map(img => img.secure_url);

      // Delete temp files
      req.files.forEach(file => fs.unlinkSync(file.path));

      // Create and save product
      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        codAvailable,
        images: imageUrls,
      });

      await product.save();
      res.status(201).json(product);

    } catch (error) {
      // Cleanup temp files in case of error
      if (req.files) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
      }

      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  }
];

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = [
  upload.array("images", 5),
  async (req, res) => {
    try {
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        // Upload new images
        const uploaded = await Promise.all(
          req.files.map(file => cloudinary.uploader.upload(file.path, { folder: "products" }))
        );
        imageUrls = uploaded.map(img => img.secure_url);
        // Delete temp files
        req.files.forEach(file => fs.unlinkSync(file.path));
      }

      // Build update object
      const updateData = { ...req.body };
      if (imageUrls.length > 0) {
        updateData.images = imageUrls;
      }

      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);

    } catch (error) {
      if (req.files) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
      }
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products by name or description
exports.searchProducts = async (req, res) => {
  const { query, limit = 10 } = req.query; // Get search term and optional limit

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Full-text search based on name or description
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },  // Case insensitive search
        { description: { $regex: query, $options: 'i' } }
      ]
    }).limit(Number(limit));  // Optional limit to control result size

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

// Fetch search suggestions based on a query prefix (fuzzy matching)
exports.getSearchSuggestions = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const suggestions = await Product.find({
      name: { $regex: query, $options: 'i' } // Match anywhere in name
    }).limit(5).distinct('name');

    res.json(suggestions);
  } catch (error) {
    console.error("Suggestion error:", error);
    res.status(500).json({ error: "Failed to fetch search suggestions" });
  }
};