import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../store/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {status === "loading" && <p>Loading...</p>}
      {myOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Payment</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">${order.totalAmount}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
