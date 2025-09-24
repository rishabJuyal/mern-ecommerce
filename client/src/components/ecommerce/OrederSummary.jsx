import React from "react";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const OrderSummary = ({ subtotal, shipping = 50, taxRate = 0.1 }) => {
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>{formatCurrency(shipping)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Button variant="primary" className="w-full">Proceed to Checkout</Button>
    </div>
  );
};

export default OrderSummary;
