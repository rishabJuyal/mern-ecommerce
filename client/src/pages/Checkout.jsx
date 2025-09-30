import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  clearOrderState,
  placeOrder
} from "../store/orderSlice";
import { fetchCart } from "../store/cartSlice";
import { fetchProductById } from "../store/productSlice";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import AddressCard from "../components/ecommerce/AddressCard";

const LoadingState = () => <p className="text-gray-600">Processing...</p>;

const CartItem = ({ item }) => (
  <li className="py-2 flex justify-between">
    <span>
      {item.product.name} × {item.quantity}
    </span>
    <span className="font-medium">
      ${(item.product.price * item.quantity).toFixed(2)}
    </span>
  </li>
);

const CartItemsList = ({ cartItems }) => (
  <ul className="divide-y divide-gray-200">
    {cartItems.map((item) => (
      <CartItem key={item.product._id} item={item} />
    ))}
  </ul>
);

const OrderSummary = ({ cartItems, getTotal }) => (
  <>
    <CartItemsList cartItems={cartItems} />
    <div className="flex justify-between border-t pt-4 font-semibold">
      <span>Total:</span>
      <span>${getTotal().toFixed(2)}</span>
    </div>
  </>
);

const Checkout = () => {
  const { productId, quantity } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { currentOrder, status } = useSelector((state) => state.orders);

  const [singleProduct, setSingleProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loadingAction, setLoadingAction] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const defaultAddress = user.address.find(a => a.isDefault);
console.log("default",defaultAddress)
  useEffect(() => {
    if (productId && quantity) {
      setLoadingProduct(true);
      dispatch(fetchProductById(productId))
        .then((res) => {
          if (res.payload) {
            setSingleProduct({
              product: res.payload,
              quantity: parseInt(quantity, 10),
            });
          } else {
            alert("Product not found");
          }
        })
        .finally(() => setLoadingProduct(false));
    } else {
      dispatch(fetchCart());
    }

    return () => {
      dispatch(clearOrderState());
    };
  }, [dispatch, productId, quantity]);

  const getAvailablePaymentMethods = () => {
    const items = singleProduct ? [singleProduct] : cartItems;
    const allCODAvailable = items.every((item) => item.product.codAvailable);
    return {
      COD: allCODAvailable,
      ONLINE: true,
    };
  };

  const paymentAvailability = getAvailablePaymentMethods();

  // Auto-correct invalid payment method
  useEffect(() => {
    if (!paymentAvailability[paymentMethod]) {
      const fallback = paymentAvailability.COD ? "COD" : "ONLINE";
      setPaymentMethod(fallback);
    }
  }, [paymentAvailability, paymentMethod]);

  const getTotal = () => {
    return (singleProduct ? [singleProduct] : cartItems).reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  const handleCreateOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const products = singleProduct
      ? [{ productId: singleProduct.product._id, quantity: singleProduct.quantity }]
      : cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

    setLoadingAction(true);
    try {
      await dispatch(createOrder({ products, paymentMethod, address: defaultAddress })).unwrap();
    } catch (err) {
      alert("Failed to create order.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!currentOrder) return;

    setLoadingAction(true);
    try {
      const res = await dispatch(placeOrder({ orderId: currentOrder._id })).unwrap();

      if (res?.url) {
        window.location.href = res.url;
      } else {
        alert("Order placed successfully.");
        navigate("/shop");
      }
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setLoadingAction(false);
    }
  };

  const isCartEmpty = cartItems.length === 0 && !singleProduct;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {status === "loading" || loadingProduct ? (
        <LoadingState />
      ) : (
        <>
          {isCartEmpty ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {/* Address Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                <AddressCard
                  address={defaultAddress}
                  onChangeClick={() => navigate("/change-address")}
                />
              </div>

              <OrderSummary
                cartItems={singleProduct ? [singleProduct] : cartItems}
                getTotal={getTotal}
              />

              {!currentOrder && (
                <div className="mt-6">
                  <label className="block font-medium mb-2">
                    Select Payment Method:
                  </label>
                  <div className="space-y-2">
                    {/* COD Option */}
                    <label
                      className={`flex items-center ${!paymentAvailability.COD ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        disabled={!paymentAvailability.COD}
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="mr-2"
                      />
                      Cash on Delivery (COD)
                    </label>

                    {/* ONLINE Option */}
                    <label
                      className={`flex items-center ${!paymentAvailability.ONLINE ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ONLINE"
                        disabled={!paymentAvailability.ONLINE}
                        checked={paymentMethod === "ONLINE"}
                        onChange={() => setPaymentMethod("ONLINE")}
                        className="mr-2"
                      />
                      Pay Online (Stripe)
                    </label>
                  </div>
                </div>
              )}

              {!currentOrder ? (
                <button
                  onClick={handleCreateOrder}
                  disabled={!paymentMethod || loadingAction}
                  className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loadingAction ? "Creating Order..." : "Create Order"}
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    Order ID: {currentOrder._id}
                  </p>
                  <p className="font-semibold text-lg">
                    Total: ${currentOrder.totalAmount}
                  </p>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loadingAction}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loadingAction ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
