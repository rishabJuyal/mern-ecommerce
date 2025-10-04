import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearProductState,
} from "../../store/productSlice";
import { addToCart, clearCartState } from "../../store/cartSlice";
import {
  Star,
  StarHalf,
  StarOff,
  Heart,
  BarChart2,
  Facebook,
  Twitter,
  Globe,
  Linkedin,
} from "lucide-react";
import ProductTabs from "./ProductTabs";
import ExpandableDescriptionList from "./ExpandableDescriptionList";
import RelatedProducts from "./RelatedProducts";

const DEFAULT_PRODUCT = {
  name: "Sample Product",
  images: [
    "https://via.placeholder.com/400x400?text=No+Image",
    "https://via.placeholder.com/400x400?text=No+Image+2",
    "https://via.placeholder.com/400x400?text=No+Image+3",
    "https://via.placeholder.com/400x400?text=No+Image+4",
    "https://via.placeholder.com/400x400?text=No+Image+5",
  ],
  description: "This is a sample product used as a fallback.",
  averageRating: 4.5,
  numReviews: 87,
  price: 99.99,
  stock: 15,
  category: "General",
  brand: "No Brand",
  sku: "SF1133569600-1",
  tags: ["sofa", "technologies", "wireless"],
  soldBy: "NO VENDOR",
};

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { loading: cartLoading } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await dispatch(fetchProductById(id));
        if (!res.payload || Object.keys(res.payload).length === 0) {
          dispatch(clearProductState());
        }
      } catch {
        dispatch(clearProductState());
      }
    };

    loadProduct();
    dispatch(clearCartState());

    return () => {
      dispatch(clearProductState());
      dispatch(clearCartState());
    };
  }, [dispatch, id]);

  const product =
    selectedProduct && Object.keys(selectedProduct).length
      ? selectedProduct
      : DEFAULT_PRODUCT;

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} color="#ffb400" size={20} />);
      } else if (rating >= i - 0.5) {
        stars.push(<StarHalf key={i} color="#ffb400" size={20} />);
      } else {
        stars.push(<StarOff key={i} color="#ffb400" size={20} />);
      }
    }
    return stars;
  };

  const imgToShow =
    mainImage ||
    (product.images.length > 0
      ? product.images[0]
      : DEFAULT_PRODUCT.images[0]);

  const handleQuantityChange = (val) => {
    if (val < 1) val = 1;
    if (val > product.stock) val = product.stock;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (quantity >= 1 && product.stock > 0) {
      dispatch(addToCart({ productId: id, quantity }));
    }
  };

  const handleBuyNow = () => {
    if (quantity >= 1 && product.stock > 0) {
      dispatch(addToCart({ productId: id, quantity }));
      navigate(`/checkout/product/${id}/${quantity}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg font-medium">
          Loading product details…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Main product content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* Thumbnails */}
        <aside className="col-span-1 space-y-4 text-center">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx}`}
              className="w-14 h-14 border p-1 cursor-pointer"
              onClick={() => setMainImage(img)}
            />
          ))}
        </aside>

        {/* Main image */}
        <section className="col-span-4">
          <img
            src={imgToShow}
            alt={product.name}
            className="w-full max-w-md object-contain mx-auto"
          />
        </section>

        {/* Product Info */}
        <section className="col-span-5 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500">
            Brand:{" "}
            <span className="text-blue-600">{product.brand || "No Brand"}</span>
          </p>

          <div className="flex items-center text-sm text-gray-700 space-x-2">
            {renderStars(product.averageRating)}
            <span>
              ({product.numReviews} review
              {product.numReviews !== 1 ? "s" : ""})
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-sm text-gray-700">
            Sold By:{" "}
            <span className="text-blue-700 font-bold">
              {product.soldBy || "NO VENDOR"}
            </span>
          </p>

          <ExpandableDescriptionList description={product.description} maxVisible={3} />


          {/* Quantity & Actions */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center border px-2 py-1">
              <button
                className="px-2"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) =>
                  handleQuantityChange(Number(e.target.value))
                }
                className="w-12 text-center border-x"
              />
              <button
                className="px-2"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartLoading || product.stock === 0}
              className={`px-5 py-2 rounded text-white font-semibold ${
                cartLoading || product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {cartLoading ? "Adding..." : "Add to cart"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={cartLoading || product.stock === 0}
              className={`px-5 py-2 rounded font-semibold ${
                cartLoading || product.stock === 0
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {cartLoading ? "Buying..." : "Buy Now"}
            </button>

            <Heart className="text-gray-500 cursor-pointer" size={24} />
            <BarChart2 className="text-gray-500 cursor-pointer" size={24} />
          </div>

          {/* Meta info */}
          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>
              <strong>SKU:</strong> {product.sku || "N/A"}
            </p>
            <p>
              <strong>Categories:</strong> {product.category || "Uncategorized"}
            </p>
            <p>
              <strong>Tags:</strong> {product.tags?.join(", ") || "None"}
            </p>
          </div>

          {/* Social */}
          <div className="flex space-x-3 mt-4 text-white text-sm">
            <a href="#" className="bg-blue-700 p-2 rounded">
              <Facebook size={16} />
            </a>
            <a href="#" className="bg-sky-500 p-2 rounded">
              <Twitter size={16} />
            </a>
            <a href="#" className="bg-red-600 p-2 rounded">
              <Globe size={16} />
            </a>
            <a href="#" className="bg-blue-900 p-2 rounded">
              <Linkedin size={16} />
            </a>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-2 space-y-6 text-sm text-gray-700 bg-gray-50 p-4 rounded shadow">
          <div className="space-y-2">
            <p>📦 Shipping worldwide</p>
            <p>↩️ Free 7-day return if eligible, so easy</p>
            <p>🧾 Supplier gives bills for this product.</p>
            <p>💵 Pay online or when receiving goods</p>
          </div>

          <p className="text-sm text-blue-700">
            Sell on Martfury?{" "}
            <a href="#" className="underline">
              Register Now !
            </a>
          </p>

          <div className="bg-white border p-2 rounded">
            <img
              src="https://via.placeholder.com/200x200?text=iPhone+6+32GB"
              alt="iPhone"
              className="w-full"
            />
            <p className="text-xs text-center mt-1">
              iPhone 6+ 32Gb – 40% OFF
            </p>
          </div>

          <h4 className="text-gray-800 font-semibold text-base">
            Same Brand
          </h4>
          <p className="text-xs text-gray-500">Activate Windows</p>
        </aside>
      </div>

      {/* Full Width Tabs Section */}
      <div className="w-full bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <ProductTabs />
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
