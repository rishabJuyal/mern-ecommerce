import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, createCheckoutSession, clearOrderState } from "../store/orderSlice";
import { fetchCart } from "../store/cartSlice";
import { fetchProductById } from "../store/productSlice"; // Make sure this action exists
import { useParams } from "react-router-dom";

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
  const { productId, quantity } = useParams();
  console.log(productId, quantity);
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { currentOrder, status } = useSelector((state) => state.orders);

  // Local state for storing the single product
  const [singleProduct, setSingleProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    // If productId and quantity are provided, fetch the product details
    if (productId && quantity) {
      setLoadingProduct(true);
      dispatch(fetchProductById(productId)) // Assuming the productId is used to fetch the product
        .then((res) => {
          if (res.payload) {
            setSingleProduct({
              product: res.payload, // Assuming `res.payload` contains the product
              quantity: parseInt(quantity, 10),
            });
          } else {
            alert("Product not found");
          }
        })
        .finally(() => setLoadingProduct(false));
    } else {
      // Otherwise, fetch the cart items
      dispatch(fetchCart());
    }

    return ()=>{
      dispatch(clearOrderState());
    }
  }, [dispatch, productId, quantity]);

  // Handle placing an order
  const handlePlaceOrder = () => {
    const products = singleProduct
      ? [
          {
            productId: singleProduct.product._id,
            quantity: singleProduct.quantity,
          },
        ]
      : cartItems.map((item) => ({
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
    return (singleProduct ? [singleProduct] : cartItems).reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {status === "loading" || loadingProduct ? (
        <LoadingState />
      ) : (
        <>
          {!currentOrder ? (
            <>
              {cartItems.length === 0 && !singleProduct ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <OrderSummary
                  cartItems={singleProduct ? [singleProduct] : cartItems}
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
        </>
      )}
    </div>
  );
};

export default Checkout;
