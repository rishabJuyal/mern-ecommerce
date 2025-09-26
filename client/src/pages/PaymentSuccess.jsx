import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get("session_id");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="mt-4">Thank you for your order!</p>
      <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
    </div>
  );
};

export default PaymentSuccess;
