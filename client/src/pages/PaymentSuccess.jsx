import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const res = await api.get(`/orders/payment-success?session_id=${sessionId}`, {
          withCredentials: true, // if using cookies/auth
        });
        setOrder(res.data.order || {});
      } catch (err) {
        console.error("Failed to confirm payment", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId]);

  if (loading) return <p>Verifying payment...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      {order ? (
        <>
          <p className="mb-2">Order ID: {order._id}</p>
          <p className="mb-2">Total Paid: ₹{order.totalAmount}</p>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </>
      ) : (
        <p className="text-red-500">Order not found.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
