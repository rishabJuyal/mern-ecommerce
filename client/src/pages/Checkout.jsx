import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, createCheckoutSession } from "../store/orderSlice";
import { fetchCart } from "../store/cartSlice";

// Reusable Loading State Component
const LoadingState = () => <p className="text-gray-600">Processing...</p>;

// Reusable Cart Item Component
const CartItem = ({ item }) => (
  <li className="py-2 flex justify-between">
    <span>
      {item.product.name} × {item.quantity}
    </span>
    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
  </li>
);

// Reusable Cart Items List Component
const CartItemsList = ({ cartItems }) => (
  <ul className="divide-y divide-gray-200">
    {cartItems.map((item) => (
      <CartItem key={item.product._id} item={item} />
    ))}
  </ul>
);

// Reusable Order Summary Component
const OrderSummary = ({ cartItems, getTotal, onPlaceOrder }) => (
  <div className="space-y-4">
    <CartItemsList cartItems={cartItems} />
    <div className="flex justify-between border-t pt-4 font-semibold">
      <span>Total:</span>
      <span>${getTotal().toFixed(2)}</span>
    </div>
    <button
      onClick={onPlaceOrder}
      className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Place Order
    </button>
  </div>
);

const Checkout = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { currentOrder, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchCart()); // Ensure cart is up to date
  }, [dispatch]);

  // Handle placing an order
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const products = cartItems.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    dispatch(createOrder({ products }));
  };

  // Handle Stripe checkout
  const handleStripeCheckout = async () => {
    if (currentOrder) {
      const res = await dispatch(createCheckoutSession(currentOrder._id));
      if (res.payload?.url) {
        window.location.href = res.payload.url;
      } else {
        alert("Failed to create checkout session.");
      }
    }
  };

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {status === "loading" && <LoadingState />}

      {!currentOrder ? (
        <>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <OrderSummary
              cartItems={cartItems}
              getTotal={getTotal}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </>
      ) : (
        <div className="mt-6">
          <p className="mb-2">Order ID: {currentOrder._id}</p>
          <p className="mb-4">Total: ${currentOrder.totalAmount}</p>
          <button
            onClick={handleStripeCheckout}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Pay with Stripe
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
