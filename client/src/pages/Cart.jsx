import React from "react";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Product A", price: 50, qty: 2 },
    { id: 2, name: "Product B", price: 30, qty: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

      {cartItems.length ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p>${item.price} x {item.qty}</p>
              </div>
              <p className="font-bold">${item.price * item.qty}</p>
            </div>
          ))}

          <div className="flex justify-between items-center font-semibold text-xl mt-6">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button className="mt-6 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
