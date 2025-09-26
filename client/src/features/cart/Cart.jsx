import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "../../store/cartSlice";
import CartItem from "../../components/ecommerce/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity }));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-gray-600">Loading cart...</p>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
  if (!item?.product) return null; // skip broken items

  return (
    <CartItem
      key={item.product._id || index} // fallback to index if _id is missing
      item={item}
      onRemove={handleRemove}
      onQuantityChange={handleQuantityChange}
    />
  );
})}


          <div className="flex justify-between items-center border-t pt-6 mt-8">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-2xl font-bold text-green-700">
              ${getTotal().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/checkout/cart")}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
