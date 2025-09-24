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
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
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
        ...req.body,
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
