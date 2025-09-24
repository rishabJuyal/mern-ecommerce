import React from "react";

const Orders = () => {
  const orders = [
    { id: 101, total: 150, status: "Delivered" },
    { id: 102, total: 90, status: "Processing" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">My Orders</h2>

      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <h3 className="font-medium">Order #{order.id}</h3>
              <p>Total: ${order.total}</p>
              <p>Status: <span className="font-semibold">{order.status}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
