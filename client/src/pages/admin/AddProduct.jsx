import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../services/api";

const categories = [
  'Electronics',
  'Books',
  'Clothing',
  'Home',
  'Toys',
  'Beauty',
  'Food'
];

const MAX_IMAGES = 5;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    codAvailable: true, // default value
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
    setError("");
  };

  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);

    // Combine existing images + new files, slice to max limit
    const combinedFiles = [...imageFiles, ...filesArray].slice(0, MAX_IMAGES);

    if (combinedFiles.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images only.`);
      e.target.value = null;
      return;
    }

    setImageFiles(combinedFiles);
    setImagePreviews(combinedFiles.map((file) => URL.createObjectURL(file)));
    setError("");
    setSuccess(false);
    e.target.value = null; // reset input so same file can be selected again if needed
  };

  const triggerFileInput = () => {
    document.getElementById("images").click();
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
    setImagePreviews(newFiles.map((file) => URL.createObjectURL(file)));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setSuccess(false);

    if (imageFiles.length === 0) {
      setError("Please upload at least one image.");
      setUploading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSend.append(key, formData[key])
      );
      imageFiles.forEach((file) => formDataToSend.append("images", file));

      const res = await api.post("/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setUploading(false);

      // Clear form and images on success
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Failed to upload product. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 font-medium">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* COD Available Toggle */}
          <div className="mb-4">
            <label htmlFor="codAvailable" className="block text-gray-700 font-medium">
              Cash on Delivery Available
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="codAvailable"
                name="codAvailable"
                checked={formData.codAvailable}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    codAvailable: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="codAvailable" className="ml-2 text-gray-700">
                Enable COD for this product
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Product Images <span className="text-gray-500">(Max {MAX_IMAGES})</span>{" "}
              <span className="text-red-500">*</span>
            </label>

            {/* Hidden input */}
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Preview container + add button */}
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((preview, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                  title="Click to remove image"
                  onClick={() => removeImage(idx)}
                >
                  <img
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer">
                    &times;
                  </span>
                </div>
              ))}

              {/* Add image button if less than max */}
              {imageFiles.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-md text-gray-400 hover:text-blue-600 hover:border-blue-600 transition"
                  aria-label="Add more images"
                >
                  <FaPlus size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-400 rounded-md text-center">
            Product added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
