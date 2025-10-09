import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearProductState,
} from "../../../store/productSlice";
import { addToCart, clearCartState } from "../../../store/cartSlice";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ExpandableDescriptionList from "./ExpandableDescriptionList";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import MetaInfo from "./MetaInfo";
import SocialShare from "./SocialShare";
import SidebarInfo from "./SidebarInfo";
import ProductTabs from "../ProductTabs";
import RelatedProducts from "../RelatedProducts";


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

  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearProductState());
      dispatch(clearCartState());
    };
  }, [dispatch, id]);

  const product = selectedProduct && Object.keys(selectedProduct).length
    ? selectedProduct
    : DEFAULT_PRODUCT;

  const imgToShow = mainImage || product.images[0];

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ productId: id, quantity }));
    navigate(`/checkout/product/${id}/${quantity}`);
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-14 gap-8">
        <ImageGallery images={product.images} mainImage={imgToShow} setMainImage={setMainImage} />
        <section className="col-span-6">
          <ProductInfo product={product} />
          <ExpandableDescriptionList description={product.description} maxVisible={3} />
          <div className="flex items-center space-x-4 mt-4">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={product.stock} />
            <ActionButtons
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              disabled={cartLoading || product.stock === 0}
              cartLoading={cartLoading}
            />
          </div>
          <MetaInfo product={product} />
          <SocialShare />
        </section>
        <SidebarInfo />
      </div>

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
